import React, { FC } from 'react';
import { Text } from 'ink';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { TypedFlags } from 'meow';
import Install from './Install';
import helpText from './helpText';

const isDev = false;
const log = (string: string) => {
  if (isDev) console.info(string);
};

const App: FC<{
  input?: string[];
  flags?: TypedFlags<{ name: { type: 'string' } }>;
}> = ({ input, flags }) => {
  log(`input: ${JSON.stringify(input)}`);
  log(`flags: ${JSON.stringify(flags)}`);

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
};

module.exports = App;
export default App;
