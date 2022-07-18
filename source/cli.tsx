#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './App';
import { helpText } from './lib/messages';

const cli = meow(helpText, {
  flags: {},
});

render(<App input={cli.input} /* flags={cli.flags} */ />);
