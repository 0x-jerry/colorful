import { Color, HSL, HWB, RGB } from './type'

export * from './convertor'
export * from './parser'
export * from './contrast'
export * from './type.d'

export function toString(color: Color) {
  if ('w' in color) {
    return hwbToString(color)
  }

  if ('l' in color) {
    return hslToString(color)
  }

  return rgbToString(color)
}

export function rgbToString(rgb: RGB) {
  return `rgb(${rgb.r} ${rgb.g} ${rgb.b} / ${rgb.a ?? 1})`
}

export function hwbToString(hwb: HWB) {
  return `hwb(${hwb.h} ${Math.round(hwb.w * 100)}% ${Math.round(hwb.b * 100)}% / ${hwb.a ?? 1})`
}

export function hslToString(hsl: HSL) {
  return `hsl(${hsl.h} ${Math.round(hsl.l * 100)}% ${Math.round(hsl.l * 100)}% / ${hsl.a ?? 1})`
}
