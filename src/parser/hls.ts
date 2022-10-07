import { toFixed } from '@0x-jerry/utils'
import { HSL } from '../type'
import { parsePercentageValue } from './utils'

const hslReg =
  /^hsla?\(\s*(?<h>-?[.\d]+(grad|deg|rad|turn)?)[\s,]+(?<s>\d+%)[\s,]+(?<l>\d+%?)\s*([,/]\s*(?<a>[.\d]+%?))?\)$/

/**
 *
 * https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#hsl_color_model
 *
 * @param color
 */
export function praseHSL(color: string): HSL | null {
  const matched = hslReg.exec(color)

  if (!matched) {
    return null
  }

  const g = matched.groups!

  const c: HSL = {
    h: parseHue(g.h),
    s: parsePercentageValue(g.s, 0),
    l: parsePercentageValue(g.l, 0),
    a: parsePercentageValue(g.a),
  }

  return c
}

const hueReg = /(?<value>-?[.\d]+(?<unit>(turn|grad|deg|rad)?))/

function parseHue(s = '', defaultValue = 0) {
  const matched = hueReg.exec(s)

  const { value = '0', unit } = matched?.groups || {}

  let v = parseFloat(value)

  if (isNaN(v)) {
    return defaultValue
  }

  switch (unit) {
    case 'grad':
      v = (v / 400) * 360
      break
    case 'turn':
      v = v * 360
      break
    case 'rad':
      v = (v / Math.PI) * 180
      break

    default:
      break
  }

  while (v < 0) {
    v += 360
  }

  while (v > 360) {
    v -= 360
  }

  return toFixed(v, 2)
}
