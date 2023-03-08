import { RGB } from './type'
import { normalizeRGB } from './utils'

/**
 * https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
 *
 * @param c1
 * @param c2
 */
export function getContrastRatio(c1: RGB, c2: RGB) {
  const _l1 = getLuminance(c1)
  const _l2 = getLuminance(c2)

  const [l1, l2] = _l1 > _l2 ? [_l1, _l2] : [_l2, _l1]

  return (l1 + 0.05) / (l2 + 0.05)
}

/**
 * https://www.w3.org/TR/WCAG21/#dfn-relative-luminance
 *
 * @param c
 * @returns [0, 1]
 */
function getLuminance(c: RGB) {
  let { r, g, b } = normalizeRGB(c)

  r = luminance(r)
  g = luminance(g)
  b = luminance(b)

  // L = 0.2126 * R + 0.7152 * G + 0.0722 * B
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

/**
 *
 * if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
 *
 * @param x
 */
function luminance(x: number) {
  return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4)
}

/**
 *
 * https://www.w3.org/TR/WCAG21/#contrast-enhanced > 7
 *
 * https://www.w3.org/TR/WCAG21/#contrast-minimum > 4.5
 *
 * https://www.w3.org/TR/WCAG21/#non-text-contrast > 3
 * @param contrast
 */
export const getContrastLevel = (contrast: number) => {
  const level = { AALarge: false, AA: false, AAALarge: false, AAA: false }

  if (contrast > 7) {
    // https://www.w3.org/TR/WCAG21/#contrast-enhanced
    level.AA = true
    level.AAA = true
    level.AALarge = true
    level.AAALarge = true
  } else if (contrast > 4.5) {
    // https://www.w3.org/TR/WCAG21/#contrast-minimum
    level.AA = true
    level.AALarge = true
    level.AAALarge = true
  } else if (contrast > 3) {
    // https://www.w3.org/TR/WCAG21/#non-text-contrast
    level.AALarge = true
  }

  return level
}
