import React from 'react';
import { Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import Install from './Install';
import { helpText } from './lib/messages';

const isDev = false;
const log = (string: string) => {
  // eslint-disable-next-line no-console
  if (isDev) console.info(string);
};

function App({
  input = [],
}: // flags = {},
{
  input?: string[];
  // flags?: AppFlags;
}) {
  log(`input: ${JSON.stringify(input)}`);
  // log(`flags: ${JSON.stringify(flags)}`);

  const availableCommands = ['install', 'update'];
  const commandMatch = !!input?.find((command) =>
    availableCommands.includes(command),
  );
  const showHelp = !input?.length || !commandMatch;

  return (
    <>
      {showHelp && (
        <>
          <Gradient name="summer">
            <BigText
              text="Ableton Package Manager"
              align="center"
              font="chrome"
            />
          </Gradient>
          <Text>{helpText}</Text>
        </>
      )}
      {input?.[0] === 'install' && <Install input={input.splice(1)} />}
    </>
  );
}

export default App;
