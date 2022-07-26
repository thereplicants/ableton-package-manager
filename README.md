# Ableton Package Manager

`apm` is a package manager for Ableton Live to manage Max for Live dependencies and Node for Max patches

> This CLI uses [ink](https://github.com/vadimdemedes/ink)

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

Clone this repo, then install dependencies:

```sh
npm install
```

Install a global link to it (so `apm` commands refer to the development version):

```sh
npm run build # Run the build at least once first so there is something to link
npm install -g
```

Build and watch for changes:

```sh
npm run watch
```

## Roadmap

The next idea is to have an `apm.yml` file in an Ableton Set, so you can run apm install there and get all the dependencies. This would allow collaborators to ensure they have the right dependencies. There should also be a Max for Live .amxd device that allows collaborators to install without the CLI.
