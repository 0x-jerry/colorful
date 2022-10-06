import { is, clamp, toFixed } from '@0x-jerry/utils'
import type { Color, HSL, RGB } from './type'

/**
 * https://regexr.com/6vikf
 */
const rgbaReg =
  /^rgba?\(\s*(?<r>\d+%?)\s*,\s*(?<g>\d+%?)\s*,\s*(?<b>\d+%?)\s*(,\s*(?<a>[.\d]+%?))?\)$/

/**
 * https://regexr.com/6vil1
 */
const rgbaLevel4Reg =
  /^rgba?\(\s*(?<r>\d+%?)\s+(?<g>\d+%?)\s+(?<b>\d+%?)\s*(\/\s*(?<a>[.\d]+%?))?\)$/

/**
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgba#values
 * @param color
 * @returns
 */
export function parseRGBA(color: string): RGB | null {
  color = color.trim()

  const matched = rgbaReg.exec(color) || rgbaLevel4Reg.exec(color)

  if (!matched) {
    return null
  }

  const g = matched.groups!

  const c: RGB = {
    r: parseRGBValue(g.r),
    g: parseRGBValue(g.g),
    b: parseRGBValue(g.b),
    a: parseAValue(g.a),
  }

  return c
}

/**
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/hsla#values
 *
 * @param color
 */
export function praseHSLA(color: string | HSL) {}

export function praseColor(color: Color) {}

/**
 * parse 0 - 255, or 0% - 100%
 * @param v
 * @param defaultValue
 * @returns
 */
function parseRGBValue(v: number | string, defaultValue = 0) {
  if (is.string(v) && v.endsWith('%')) {
    v = (parseInt(v) / 100) * 0xff
  }

  const n = +v

  if (isNaN(n)) {
    return defaultValue
  }

  return clamp(toFixed(n, 2), 0, 0xff)
}

/**
 * parse 0% - 100%, or 0 - 1
 * @param v
 * @param defaultValue
 * @returns
 */
function parseAValue(v: string, defaultValue = 0xff) {
  let vv = parseFloat(v)
  if (isNaN(vv)) {
    return defaultValue
  }

  if (v.endsWith('%')) {
    vv /= 100
  }

  return toFixed(clamp(vv, 0, 1) * 0xff, 2)
}
