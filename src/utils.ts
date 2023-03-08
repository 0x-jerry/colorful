import { toFixed } from '@0x-jerry/utils'
import { RGB } from './type'

export function round(num: number, fractionDigits: number): number {
  const u = Math.pow(10, fractionDigits)

  return toFixed(Math.round(num * u) / u, fractionDigits)
}

export function normalizeRGB(c: RGB): RGB {
  return {
    r: c.r / 0xff,
    g: c.g / 0xff,
    b: c.b / 0xff,
    a: c.a,
  }
}
