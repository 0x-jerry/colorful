import { is } from '@0x-jerry/utils'
import { parseHex, parseRGB } from '../parser'
import { normalizeHue } from '../parser/hls'
import { HSL, RGB } from '../type'
import { round } from '../utils'

function parse(color: RGB | string) {
  return is.string(color) ? parseRGB(color) || parseHex(color) : color
}

export function rgbToHsl(color: string | RGB): HSL | null {
  const cc = parse(color)

  if (!cc) return null

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
