import React, { useEffect } from 'react';
import { Text } from 'ink';
import hostedGitInfo from 'hosted-git-info';
// import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';
import helpText from './helpText';
import { getUserLibraryPath } from './abletonConfig';

function Install({ input = [] }: { input?: string[] }) {
  // async function Install({ input = [] }: { input?: string[] }) {
  const inputUrl = input?.[0];
  if (!inputUrl) {
    return <Text>{helpText}</Text>;
  }

  const gitUrl = hostedGitInfo
    .fromUrl(inputUrl)
    ?.https()
    .replace(/^git\+/, '');
  if (!gitUrl) {
    const error = 'Error: Could not find git repo to clone';
    return <Text color="red">{error}</Text>;
  }

  const [userLibraryPath, setUserLibraryPath] = React.useState('');
  useEffect(() => {
    (async () => {
      setUserLibraryPath(await getUserLibraryPath());
    })();
  }, []);
  // const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);

  return (
    <>
      <Text>Install {gitUrl}</Text>
      <Text>userLibraryPath: {userLibraryPath}</Text>
    </>
  );
}

export default Install;
