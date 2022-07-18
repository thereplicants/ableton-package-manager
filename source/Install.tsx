import React, { useEffect } from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';
import { helpText, installSuccessInstructions } from './lib/messages';
import install from './lib/install';

function Install({ input = [] }: { input?: string[] }) {
  const [inProgress, setInProgress] = React.useState(true);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [error, setError] = React.useState('');

  const inputUrl = input?.[0];
  if (!inputUrl) {
    return <Text>{helpText}</Text>;
  }

  useEffect(() => {
    (async () => {
      try {
        const message = await install({ inputUrl });
        setSuccessMessage(message);
      } catch (e) {
        if (e instanceof Error) {
          setError(e?.message);
        }
      }
      setInProgress(false);
    })();
  }, []);

  if (error) {
    return <Text color="red">Error: {error}</Text>;
  }

  return (
    <>
      {inProgress && (
        <Text>
          <Text color="green">
            <Spinner type="mindblown" />
          </Text>
          {` Installing ${inputUrl}...`}
        </Text>
      )}

      {!inProgress && (
        <>
          <Text color="green">{successMessage}</Text>
          <Text>{installSuccessInstructions}</Text>
        </>
      )}
    </>
  );
}

export default Install;
