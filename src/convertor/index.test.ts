import { parseHex, parseRGB, praseHSL } from '../parser'
import { rgbToHsl } from './hsl'
import { hslToRgb } from './rbg'

const pair = {
  hex: [
    '#000000',
    '#FFFFFF',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#00FFFF',
    '#FF00FF',
    '#BFBFBF',
    '#808080',
    '#800000',
    '#808000',
    '#008000',
    '#800080',
    '#008080',
    '#000080',
  ],
  hsl: [
    '(0,0%,0%)',
    '(0,0%,100%)',
    '(0,100%,50%)',
    '(120,100%,50%)',
    '(240,100%,50%)',
    '(60,100%,50%)',
    '(180,100%,50%)',
    '(300,100%,50%)',
    '(0,0%,75%)',
    '(0,0%,50%)',
    '(0,100%,25%)',
    '(60,100%,25%)',
    '(120,100%,25%)',
    '(300,100%,25%)',
    '(180,100%,25%)',
    '(240,100%,25%)',
  ].map((n) => `hsl${n}`),
  rgb: [
    '(0,0,0)',
    '(255,255,255)',
    '(255,0,0)',
    '(0,255,0)',
    '(0,0,255)',
    '(255,255,0)',
    '(0,255,255)',
    '(255,0,255)',
    '(191,191,191)',
    '(128,128,128)',
    '(128,0,0)',
    '(128,128,0)',
    '(0,128,0)',
    '(128,0,128)',
    '(0,128,128)',
    '(0,0,128)',
  ].map((n) => `rgb${n}`),
}

describe('color convertor', () => {
  it('should convert rgb to hsl', () => {
    for (let idx = 0; idx < pair.hex.length; idx++) {
      const hex = pair.hex[idx]
      const rgb = pair.rgb[idx]
      const hsl = pair.hsl[idx]

      expect(rgbToHsl(parseHex(hex)!), `${hex} not match ${hsl}`).eql(praseHSL(hsl))
      expect(rgbToHsl(parseRGB(rgb)!), `${rgb} not match ${hsl}`).eql(praseHSL(hsl))
    }
  })

  it('should convert hsl to rgb', () => {
    for (let idx = 0; idx < pair.hex.length; idx++) {
      const rgb = pair.rgb[idx]
      const hsl = pair.hsl[idx]

      const r = hslToRgb(praseHSL(hsl)!)!

      // normalize
      r.r = Math.round(r.r)
      r.g = Math.round(r.g)
      r.b = Math.round(r.b)

      expect(r, `${hsl} not match ${rgb}`).eql(parseRGB(rgb))
    }
  })
})
