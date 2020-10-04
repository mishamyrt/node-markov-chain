import { merge, parseText } from './modules/dict'
import { readFiles } from './modules/fs'
import { fill } from './modules/array'
import { generateChain } from './modules/chain'

const chainsCount = 20
const inputDir = './inputs'

readFiles(inputDir)
  .then(r => r.map(parseText))
  .then(merge)
  .then(d => fill(chainsCount, () => generateChain(d)))
  .then(c => c.map(i => i.join(' ')))
  .then(console.log)
