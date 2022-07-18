import React from 'react';
import { Text } from 'ink';
import hostedGitInfo from 'hosted-git-info';
import helpText from './helpText';

function Install({ input = [] }: { input?: string[] }) {
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

  return <Text>Install {gitUrl}</Text>;
}

export default Install;
