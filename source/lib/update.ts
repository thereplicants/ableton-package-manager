import { access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';
import hostedGitInfo from 'hosted-git-info';
import { simpleGit } from 'simple-git';
import replaceHomedir from 'replace-homedir';
import { getPackagesPath, getUserLibraryPath } from './folders';

export default async function install({ inputUrl }: { inputUrl: string }) {
  const userLibraryPath = await getUserLibraryPath();
  const packagesPath = await getPackagesPath(userLibraryPath);
  const shortPackagesPath = replaceHomedir(packagesPath, '~');

  try {
    await access(userLibraryPath, constants.R_OK);
    await access(
      packagesPath,
      constants.R_OK | constants.W_OK, // eslint-disable-line no-bitwise
    );
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '';
    throw new Error(
      `Could not access packages folder '${shortPackagesPath}. ${errorMessage}'`,
    );
  }

  const gitInfo = hostedGitInfo.fromUrl(inputUrl);
  // If the user supplied an npm-style git URL, get the project name from it
  let { project } = gitInfo || {};
  // Otherwise, use the input as the project name
  if (!project) project = inputUrl;
  const projectFolder = join(packagesPath, project);

  try {
    // eslint-disable-next-line no-bitwise
    await access(projectFolder, constants.R_OK | constants.W_OK);
  } catch (e) {
    throw new Error(`Could not find a package '${inputUrl}' to update`);
  }

  let git;
  try {
    git = await simpleGit({ baseDir: projectFolder }).pull();
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '';
    throw new Error(
      `Could not update '${project}' in '${shortPackagesPath}'. ${errorMessage}`,
    );
  }

  const version = (
    await simpleGit({ baseDir: projectFolder }).revparse(['HEAD'])
  ).substring(0, 7);

  if (
    git.summary.changes === 0 &&
    git.summary.deletions === 0 &&
    git.summary.insertions === 0
  ) {
    return `No updates available for ${project}, which is already at version ${version}, in ${shortPackagesPath}`;
  }

  return `Updated ${project} to version ${version} in ${shortPackagesPath}`;
}
