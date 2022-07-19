export const helpText = `
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
`;

export const installSuccessInstructions = `
You can find the installed package in the "Packages" folder in your Ableton User Library.`;
