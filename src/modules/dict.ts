import { Dict, Pair } from './types'

/**
 * Splits text by words
 * @param s - Input string
 */
const getWords = (s: string) => s
  .replace(/\n/gi, ' ')
  .replace(/,/gi, ' ,')
  .replace(/\s\s\s/gi, '  ')
  .replace(/\s\s/gi, ' ')
  .replace(/"/gi, ' ')
  .split(' ')
  .map(i => i.trim())
  .filter(Boolean)

/**
 * Generates dict from text
 * @param s - Input string
 */
export const parseText = (s: string) =>
  generateDict(
    createPairs(
      getWords(s)))

/**
 * Merges dicts
 */
export const merge = (dicts: Dict[]): Dict => {
  const result = { ...dicts[0] } as Dict
  for (let i = 1; i < dicts.length; i++) {
    const words = Object.keys(dicts[i].chain)
    result.first.push(...dicts[i].first)
    for (let j = 0; j < words.length; j++) {
      if (result.chain[words[j]]) {
        result.chain[words[j]].push(...dicts[i].chain[words[j]])
      } else {
        result.chain[words[j]] = dicts[i].chain[words[j]]
      }
    }
  }
  return result
}

/**
 * Generates dict from pairs
 * @param it - Pairs generator
 */
const generateDict = (it: Generator<Pair>): Dict => {
  const dict = {
    first: [],
    chain: {}
  } as Dict
  for (const [x, y] of it) {
    if (x.substr(-1) === '.' && y !== '-') {
      dict.first.push(y)
      continue
    }
    if (dict.chain[x]) {
      dict.chain[x].push(y)
    } else {
      dict.chain[x] = [y]
    }
  }
  return dict
}

/**
 * Returns pairs generator
 * @param words - Words array
 */
function * createPairs (words: string[]): Generator<Pair> {
  let i = 0
  while (i < words.length - 1) {
    yield [words[i], words[++i]]
  }
}
