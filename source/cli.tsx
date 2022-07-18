#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './App';
import helpText from './helpText';

const cli = meow(helpText, {
  flags: {},
});

render(<App input={cli.input} /* flags={cli.flags} */ />);
