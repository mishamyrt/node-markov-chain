export type Pair = [string, string]

export interface Dict {
  first: string[]
  chain: { [key: string]: string[] }
}
