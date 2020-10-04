/**
 * Returns random integer in range
 * @param max — Maximum allowed number
 */
const random = (max: number) =>
  Math.floor(Math.random() * Math.floor(max))

/**
 * Returns random item from array
 * @param arr — Source array
 */
export const selectRandom = <T>(arr: T[]): T =>
  arr[random(arr.length)]

/**
 * Returns last item from array
 * @param arr — Source array
 */
export const selectLast = <T>(arr: T[]): T =>
  arr.slice(-1)[0]

/**
 * Creates array
 * @param len — Array length
 * @param callbackfn — Function that will generate data
 */
export const fill = <T>(len: number, callbackfn: () => T): T[] =>
  Array.from(Array(len)).map(callbackfn)
