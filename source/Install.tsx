import React, { FC } from 'react';
import { Text } from 'ink';
import helpText from './helpText';

const Install: FC<{ input?: string[] }> = ({ input }) => {
  const inputUrl = input?.[0];
  if (!inputUrl) {
    return <Text>{helpText}</Text>;
  }

  return (
    <>
      <Text>Install {inputUrl}</Text>
    </>
  );
};

export default Install;
