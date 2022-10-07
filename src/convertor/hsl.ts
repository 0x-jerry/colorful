import { is } from '@0x-jerry/utils'
import { praseHSL } from '../parser'
import { HSL, RGB } from '../type'
import { round } from '../utils'

function parse(color: HSL | string) {
  return is.string(color) ? praseHSL(color) : color
}

/**
 * convert hsl to rgb
 *
 * https://www.wikiwand.com/en/HSL_and_HSV#/To_RGB
 *
 * @param color
 * @returns
 */
export function hslToRgb(color: string | HSL): RGB | null {
  const cc = parse(color)

  if (!cc) return null

  const c = (1 - Math.abs(2 * cc.l - 1)) * cc.s
  const h = cc.h / 60
  const x = c * (1 - Math.abs((h % 2) - 1))

  const [r, g, b] = getRGB()!

  function getRGB() {
    if (h < 1) {
      return [c, x, 0]
    } else if (h < 2) {
      return [x, c, 0]
    } else if (h < 3) {
      return [0, c, x]
    } else if (h < 4) {
      return [0, x, c]
    } else if (h < 5) {
      return [x, 0, c]
    } else if (h < 6) {
      return [c, 0, x]
    }
  }

  const m = cc.l - c / 2

  const rgb: RGB = {
    r: r + m,
    g: g + m,
    b: b + m,
    a: cc.a,
  }

  // normalize
  rgb.r = round(rgb.r * 0xff, 2)
  rgb.g = round(rgb.g * 0xff, 2)
  rgb.b = round(rgb.b * 0xff, 2)

  return rgb
}
