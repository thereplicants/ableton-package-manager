# Ableton Package Manager

`apm` is a package manager for Ableton Live to manage Max for Live dependencies and Node for Max patches

## Install

```sh
npm install -g ableton-package-manager
```

## CLI

```
$ apm --help

  Usage
    $ apm install <[github-org/project] or [git-repository]>
    $ apm update <[project] or [github-org/project] or [git-repository]>
    $ apm list

  Examples
    $ apm install thereplicants/max-node
      Installed git@github.com:thereplicants/max-node.git in ~/Dropbox/Music/Live User Library/Packages

    $ apm update thereplicants/max-node
      Updated max-node to version 43615fc in ~/Dropbox/Music/Live User Library/Packages

    $ apm list
      Ableton packages in ~/Dropbox/Music/Live User Library/Packages
      Name      URL                                        Path
      max-node  https://github.com/thereplicants/max-node  ~/Dropbox/Music/Live User Library/Packages/max-node
```

## Contributing

> Note: This tool is built with [ink](https://github.com/vadimdemedes/ink) for a React-based CLI

Clone this repo, then install dependencies:

```sh
npm install
```

Install a global link to it (so `apm` commands refer to the development version):

```sh
npm install -g
```

Build and watch for changes:

```sh
npm run watch
```

## Future ideas

- Add Windows support.
- Add support for an `apm.yml` file in an Ableton Set, so you can run `apm install` there and get all the dependencies (so collaborators can ensure they have the right dependencies).
- Create a Max for Live .amxd device that allows collaborators to install without the CLI.
- A fun long-term idea would be to allow installing Max for Live devices from maxforlive.com. See also: https://github.com/hems/lpm.
