/**
 * Returns global case insensitive regular expression
 */
const regi = (re: string | RegExp) => RegExp(re, 'gi')

/* eslint-disable no-useless-escape */
const removeRe = regi(`${[
    '\n',
    '\s+',
    '-|–|—',
    '«|»|„|”|"'
  ].join('|')}`)

const spaceDotRe = regi('\s\.')
/* eslint-enable no-useless-escape */

/**
 * Normalizes text before parsing
 */
export const normalize = (t: string) => t
  // NOTE: Remove characters that will make it harder to chain words.
  .replace(removeRe, '')
  // NOTE: Remove the space before the dot.
  .replace(spaceDotRe, '.')

/**
 * Removes the leading and trailing space and line terminator characters from a strings.
 */
const trimAll = (w: string[]) => w.map(i => i.trim())

/**
 * Splits string to words
 * @param s - Source string
 */
export const splitWords = (s: string): string[] =>
  trimAll(s.split(' '))
