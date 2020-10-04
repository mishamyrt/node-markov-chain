import { promises } from 'fs'
import { join } from 'path'
const { readFile, readdir } = promises

/**
 * Reads single UTF-8 encoded file
 * @param dir - Source directory
 */
const readTextFile = (path: string) =>
  readFile(path, { encoding: 'utf-8' })

/**
 * Reads all files from directory
 * @param dir - Source directory
 */
export const readFiles = (dir: string) =>
  readdir(dir)
    .then(p => p.map(i => join(dir, i)))
    .then(p => p.map(readTextFile))
    .then(r => Promise.all(r))
