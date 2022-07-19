// import { access } from 'node:fs/promises';
// import { constants } from 'node:fs';
// import { join } from 'node:path';
// import { simpleGit } from 'simple-git';
import replaceHomedir from 'replace-homedir';
import {
  getPackagesFolders,
  getPackagesPath,
  getUserLibraryPath,
} from './folders';

export default async function list() {
  const userLibraryPath = await getUserLibraryPath();
  const packagesPath = replaceHomedir(
    await getPackagesPath(userLibraryPath),
    '~',
  );
  const packages = (await getPackagesFolders(userLibraryPath)).map((p) => ({
    name: p.name,
    path: replaceHomedir(p.path, '~'),
  }));

  return {
    userLibraryPath,
    packagesPath,
    packages,
  };

  // try {
  //   // await simpleGit({ baseDir: packagesPath }).clone(gitUrl);
  // } catch (e) {
  //   const errorMessage = e instanceof Error ? e.message : '';
  //   throw new Error(
  //     `Could not install '${gitUrl}' to '${packagesPath}'. ${errorMessage}`,
  //   );
  // }

  // const successMessage = `Installed '${gitUrl}' in '${packagesPath}'`;

  // return successMessage;
}
