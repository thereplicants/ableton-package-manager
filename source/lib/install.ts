import { access, mkdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';
import { execSync } from 'node:child_process';
import hostedGitInfo from 'hosted-git-info';
import { simpleGit } from 'simple-git';
import replaceHomedir from 'replace-homedir';
import { getPackagesPath, getUserLibraryPath } from './folders';

// TODO: Add support for `apm install <package> in an Live Set, which could
// save dependencies to an `apm.yml` file in that Live Set, and enable
// an `apm install` command in the Live Set to install it's dependencies.
export default async function install({ inputUrl }: { inputUrl: string }) {
  const gitInfo = hostedGitInfo.fromUrl(inputUrl);
  const { project } = gitInfo || {};
  // TODO: add flag for gitProtocol
  let gitProtocol: 'https' | 'ssh' = 'https';

  // Use protocol from `gh` config if present
  try {
    const ghGitProtocol =
      execSync('gh config list')
        .toString()
        .split('\n')
        .map((config) => config.toString().trim())
        .find((config) => config.startsWith('git_protocol='))
        ?.replace('git_protocol=', '') ?? gitProtocol;
    gitProtocol = ghGitProtocol === 'ssh' ? 'ssh' : gitProtocol;
  } catch (e) {
    // gh not installed
  }

  const gitUrl = gitInfo?.[gitProtocol]().replace(/^git\+/, '');
  if (!gitUrl || !project) {
    throw new Error(`Could not find git repo ${inputUrl}`);
  }

  const userLibraryPath = await getUserLibraryPath();
  const packagesPath = await getPackagesPath(userLibraryPath);
  const shortPackagesPath = replaceHomedir(packagesPath, '~');

  try {
    await access(userLibraryPath, constants.R_OK);
    try {
      await access(
        packagesPath,
        constants.R_OK | constants.W_OK, // eslint-disable-line no-bitwise
      );
    } catch (e) {
      await mkdir(packagesPath);
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '';
    throw new Error(
      `Could not create directory ${shortPackagesPath}. ${errorMessage}`,
    );
  }

  let projectFolderExists = true;
  const projectFolder = join(packagesPath, project);
  try {
    projectFolderExists = (await access(projectFolder)) === undefined;
  } catch (e) {
    projectFolderExists = false;
  }
  if (projectFolderExists) {
    throw new Error(`${project} already exists in ${shortPackagesPath}`);
  }

  try {
    // TODO: Consider using a blobless clone to improve initial clone speed
    await simpleGit({ baseDir: packagesPath }).clone(gitUrl);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '';
    throw new Error(
      `Could not install ${gitUrl} to ${shortPackagesPath}. ${errorMessage}`,
    );
  }

  // TODO: Run `npm install` if package.json exists

  const successMessage = `Installed ${gitUrl} in ${shortPackagesPath}`;

  return successMessage;
}
