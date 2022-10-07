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
  /^(rgba?)\(\s*(?<r>\d+%?)\s+(?<g>\d+%?)\s+(?<b>\d+%?)\s*(\/\s*(?<a>[.\d]+%?))?\)$/

/**
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/rgba#values
 * @param color
 * @returns
 */
export function parseRGB(color: string): RGB | null {
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
export function praseHSL(color: string | HSL) {}

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

export function parseColor(color: string) {
  if (color.startsWith('#')) {
    return parseHex(color)
  }

  return null
}

const hexToNumber = (v: string) => parseInt(v, 16) || 0

function parseHex(color: string): RGB | null {
  color = color.slice(1)
  const len = color.length

  const parse = (v: string) => hexToNumber(v) / 0xff

  if (len === 3 || len === 4) {
    return {
      r: parse(color[0].repeat(2)),
      g: parse(color[1].repeat(2)),
      b: parse(color[2].repeat(2)),
      a: color[3] ? parse(color[3].repeat(2)) : 1,
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
