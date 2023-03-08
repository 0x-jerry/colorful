import { parseHex } from './hex'
import { praseHSL } from './hsl'
import { parseRGB } from './rgb'

export { parseHex, parseRGB, praseHSL }

export function parseColor(color: string) {
  if (color.startsWith('#')) {
    return parseHex(color)
  }

  if (color.startsWith('rgb')) {
    return parseRGB(color)
  }

  if (color.startsWith('hsl')) {
    return praseHSL(color)
  }

  return null
}
