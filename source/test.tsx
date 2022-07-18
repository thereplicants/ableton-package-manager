import React from 'react';
import chalk from 'chalk';
import test from 'ava';
import { render } from 'ink-testing-library';
import { TypedFlags } from 'meow';
import App from './App';

test('show help test with no arguments', (t) => {
  const { lastFrame } = render(<App />);

  t.is(
    lastFrame(),
    chalk`Installed \`thereplicants/max-node\` in \`User Library/Packages/\``,
  );
});

test('show help test with no arguments', (t) => {
  const { lastFrame } = render(
    <App
      flags={
        { help: true } as unknown as TypedFlags<{ name: { type: 'string' } }>
      }
    />,
  );

  t.is(
    lastFrame(),
    chalk`Installed \`thereplicants/max-node\` in \`User Library/Packages/\``,
  );
});
