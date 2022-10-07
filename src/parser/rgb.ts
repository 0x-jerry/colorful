import { clamp } from '@0x-jerry/utils'
import type { RGB } from '../type'
import { round } from '../utils'
import { parsePercentageValue } from './utils'

const rgbaReg =
  /^rgba?\(\s*(?<r>\d+%?)[\s,]+(?<g>\d+%?)[\s,]+(?<b>\d+%?)\s*([,/]\s*(?<a>[.\d]+%?))?\)$/

/**
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb_color_model
 * @param color
 * @returns
 */
export function parseRGB(color: string): RGB | null {
  const matched = rgbaReg.exec(color)

  if (!matched) {
    return null
  }

  const g = matched.groups!

  const c: RGB = {
    r: parseRGBValue(g.r),
    g: parseRGBValue(g.g),
    b: parseRGBValue(g.b),
    a: parsePercentageValue(g.a),
  }

  return c
}

/**
 * parse 0 - 255, or 0% - 100%
 *
 * @param v
 * @param defaultValue
 * @returns 0 - 1
 */
function parseRGBValue(v: string = '', defaultValue = 0) {
  if (v.endsWith('%')) {
    return round((parseInt(v) / 100) * 0xff, 2)
  }

  const n = +v

  if (isNaN(n)) {
    return defaultValue
  }

  return round(clamp(n, 0, 0xff), 2)
}
