import { clamp } from '@0x-jerry/utils'

/**
 * parse 0% - 100%, or 0 - 1
 * @param v
 * @param defaultValue
 * @returns
 */
export function parsePercentageValue(v: string, defaultValue = 1) {
  let vv = parseFloat(v)
  if (isNaN(vv)) {
    return defaultValue
  }

  if (v.endsWith('%')) {
    vv /= 100
  }

  return clamp(vv, 0, 1)
}
