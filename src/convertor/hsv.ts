import { HSV, HSL } from '../type'

/**
 * https://www.wikiwand.com/en/HSL_and_HSV#HSL_to_HSV
 */
export function hslToHsv(hsl: HSL) {
  const hsv: HSV = {
    h: hsl.h,
    s: 0,
    v: 0,
    a: hsl.a,
  }

  hsv.v = hsl.l + hsl.s * Math.min(hsl.l, 1 - hsl.l)

  hsv.s = hsv.v === 0 ? 0 : 2 * (1 - hsl.l / hsv.v)

  return hsv
}
