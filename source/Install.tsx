import React, { useEffect } from 'react';
import { Text } from 'ink';
import helpText from './helpText';
import install from './lib/install';

function Install({ input = [] }: { input?: string[] }) {
  const inputUrl = input?.[0];
  if (!inputUrl) {
    return <Text>{helpText}</Text>;
  }

  const [installMessage, setInstallMessage] = React.useState('');
  const [error, setError] = React.useState('');
  useEffect(() => {
    (async () => {
      try {
        setInstallMessage(await install({ inputUrl }));
      } catch (e) {
        if (e instanceof Error) {
          setError(e?.message);
        }
      }
    })();
  }, []);

  if (error) {
    return <Text color="red">Error: {error}</Text>;
  }

  return (
    <>
      <Text color="blue">Installing {inputUrl}...</Text>
      {!!installMessage && <Text color="green">{installMessage}</Text>}
    </>
  );
}

export default Install;
