import { selectLast, selectRandom } from './array'
import { Dict } from './types'

const sentenceEnds = ['.', '?', '!']

/**
 * Checks if word can be last
 * @param w - Word
 */
const isLast = (w: string) =>
  sentenceEnds.includes(w.substring(-1))

/**
 * Checks if chain can be continued
 * @param w - Word
 */
const isEnd = (d: Dict, w: string) =>
  !d.chain[w] || isLast(w)

/**
 * Recursively generates a Markov chain
 * @param dict
 */
export function generateChain (dict: Dict, chain = [] as string[]): string[] {
  if (chain.length === 0) {
    chain.push(selectRandom(dict.first))
  }
  const lastWord = selectLast(chain)

  if (isEnd(dict, lastWord)) {
    return chain
  }
  return generateChain(dict, [...chain, selectRandom(dict.chain[lastWord])])
}
