import { normalize, splitWords } from './string'
import { Dict, Pair } from './types'

/**
 * Splits text by words
 * @param s - Input string
 */
const getWords = (s: string) =>
  splitWords(
    normalize(s)
  ).filter(Boolean)

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
  const result = {
    first: [],
    chain: {}
  } as Dict

  for (const dict of dicts) {
    result.first.push(...dict.first)
    const words = Object.keys(dict.chain)
    for (const word of words) {
      if (result.chain[word]) {
        result.chain[word].push(...dict.chain[word])
      } else {
        result.chain[word] = dict.chain[word]
      }
    }
  }
  return result
}

/**
 * Defines if word can be first
 * @param w — Word
 */
const canBeFirst = (w: string) =>
  RegExp(/А-Я/).test(w.substr(0, 1))

/**
 * Defines if second word comes after dot sign
 */
const sentenceEnd = ([x, y]: Pair) =>
  x.substr(-1) === '.' && y !== '-'

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
    if (sentenceEnd([x, y]) || canBeFirst(y)) {
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
