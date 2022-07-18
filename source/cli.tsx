#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import meow from 'meow';
import App from './App';

const cli = meow(
  `
  Usage
    $ apm

  Options
    --name  Your name

  Examples
    $ apm --name=Jane
    Hello, Jane
`,
  {
    flags: {
      name: {
        type: 'string',
      },
    },
  },
);

render(<App name={cli.flags.name} />);
