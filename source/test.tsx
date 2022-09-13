import React from 'react';
import chalk from 'chalk';
import test from 'ava';
import { render } from 'ink-testing-library';
import App from './App';

test('show help when called with no arguments', (t) => {
  const { lastFrame } = render(<App />);

  const lastLine = lastFrame()?.split('\n').slice(-2, -1)[0];

  t.is(lastLine, chalk`      apm version x.y.z`);
});
