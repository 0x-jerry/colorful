import { HSL, HSV, HWB } from '../type'
import { hslToHsv } from './hsv'

/**
 * Convert hsv to hwb
 *
 * https://www.wikiwand.com/en/HWB_color_model#Conversion
 *
 */
export function hsvToHwb(hsv: HSV): HWB {
  const hwb = {
    h: hsv.h,
    w: (1 - hsv.s) * hsv.v,
    b: 1 - hsv.v,
    a: hsv.a,
  }

  return hwb
}

export function hslToHwb(hsl: HSL): HWB {
  return hsvToHwb(hslToHsv(hsl))
}
