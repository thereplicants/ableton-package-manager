import { simpleGit } from 'simple-git';
import replaceHomedir from 'replace-homedir';
import hostedGitInfo from 'hosted-git-info';
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
  const packagesFolders = await getPackagesFolders(userLibraryPath);
  const packages = await Promise.all(
    packagesFolders.map(async (p) => {
      const remotes = await simpleGit(p.path).getRemotes(true);
      const origin = remotes.find((r) => r.name === 'origin');
      const gitUrl = origin?.refs.fetch;
      const url = gitUrl && hostedGitInfo.fromUrl(gitUrl)?.browse();
      return { ...p, url, path: replaceHomedir(p.path, '~') };
    }),
  );

  return {
    userLibraryPath,
    packagesPath,
    packages,
  };
}
