import { access, mkdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { join } from 'node:path';
import hostedGitInfo from 'hosted-git-info';
import { simpleGit } from 'simple-git';
import { getPackagesPath, getUserLibraryPath } from './folders';

export default async function install({ inputUrl }: { inputUrl: string }) {
  const gitInfo = hostedGitInfo.fromUrl(inputUrl);
  const { project } = gitInfo as any;
  const gitUrl = gitInfo?.ssh().replace(/^git\+/, '');
  if (!gitUrl) {
    throw new Error(`Could not find git repo '${inputUrl}'`);
  }

  const userLibraryPath = await getUserLibraryPath();
  const packagesPath = await getPackagesPath(userLibraryPath);

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
      `Could not create directory '${packagesPath}'. ${errorMessage}`,
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
    throw new Error(`'${project}' already exists in '${packagesPath}'`);
  }

  try {
    await simpleGit({ baseDir: packagesPath }).clone(gitUrl);
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : '';
    throw new Error(
      `Could not install '${gitUrl}' to '${packagesPath}'. ${errorMessage}`,
    );
  }

  const successMessage = `Installed '${gitUrl}' in '${packagesPath}'`;

  return successMessage;
}
