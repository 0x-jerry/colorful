import { is } from '@0x-jerry/utils'
import { RGB } from '../type'

const hexToNumber = (v: string) => parseInt(v, 16) || 0

export function parseHex(color: string): RGB | null {
  color = color.slice(1)
  const len = color.length

  const parse = (v: string) => hexToNumber(v)

  if (len === 3 || len === 4) {
    return {
      r: parse(color[0].repeat(2)),
      g: parse(color[1].repeat(2)),
      b: parse(color[2].repeat(2)),
      a: !is.nullish(color[3]) ? parse(color[3].repeat(2)) : 1,
    }
  }

  if (len === 6 || len === 8) {
    const a = color.slice(6, 8)

    return {
      r: parse(color.slice(0, 2)),
      g: parse(color.slice(2, 4)),
      b: parse(color.slice(4, 6)),
      a: a ? parse(a) : 1,
    }
  }

  return null
}
