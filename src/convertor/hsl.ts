import { HSL, RGB } from '../type'
import { round } from '../utils'
import { normalizeHue } from '../parser/hls'

/**
 * convert rgb or hex to hsl
 *
 * https://www.wikiwand.com/en/HSL_and_HSV#/From_RGB
 *
 * @param color
 * @returns
 */
export function rgbToHsl(color: RGB): HSL | null {
  const cc = color

  // normalize
  cc.r /= 0xff
  cc.g /= 0xff
  cc.b /= 0xff

  const xMax = Math.max(cc.r, cc.g, cc.b)
  const xMin = Math.min(cc.r, cc.g, cc.b)
  const v = xMax
  const c = xMax - xMin
  const l = (xMax + xMin) / 2

  const hsl: HSL = {
    h: 0,
    s: 0,
    l: round(l, 2),
    a: cc.a,
  }

  if (c === 0) {
    hsl.h = 0
  } else if (v === cc.r) {
    hsl.h = ((cc.g - cc.b) / c) * 60
  } else if (v === cc.g) {
    hsl.h = (2 + (cc.b - cc.r) / c) * 60
  } else if (v === cc.b) {
    hsl.h = (4 + (cc.r - cc.g) / c) * 60
  }

  hsl.h = normalizeHue(hsl.h)

  if (l === 0 || l === 1) {
    hsl.s = 0
  } else {
    hsl.s = (v - l) / Math.min(l, 1 - l)
  }

  return hsl
}
