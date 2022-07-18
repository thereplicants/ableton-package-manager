// @ts-nocheck
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { homedir } from 'node:os';
import xml2js from 'xml2js';
import { compare } from 'semver';

// TODO: Add Windows support
// Preferences:
// - Windows: Users\[username]\AppData\Roaming\Ableton\Live x.x\Preferences
// - Mac: Users/[username]/Library/Preferences/Ableton/Live x.x
// User Library:
// - Windows: \Users\[username]\Documents\Ableton\User Library
// - Mac: Macintosh HD/Users/[username]/Music/Ableton/User Library
const getUserLibraryPath = async () => {
  const abletonPath = `${homedir()}/Library/Preferences/Ableton/`;
  const files = await readdir(abletonPath, { withFileTypes: true });
  const folder = files
    .filter((file) => file.isDirectory() && file.name.includes('Live'))
    .map((file) => file.name)
    .sort((a, b) => compare(b.slice(4), a.slice(4)))?.[0];
  if (!folder) throw new Error('No Ableton Live folder found');
  const fileName = join(abletonPath, folder, 'Library.cfg');

  const configXml = await readFile(fileName);
  const config = await xml2js.parseStringPromise(configXml);
  const path = `${config.Ableton.ContentLibrary[0].UserLibrary[0].LibraryProject[0].ProjectPath[0].$.Value}/${config.Ableton.ContentLibrary[0].UserLibrary[0].LibraryProject[0].ProjectName[0].$.Value}`;

  return path;
};

// eslint-disable-next-line import/prefer-default-export
export { getUserLibraryPath };
