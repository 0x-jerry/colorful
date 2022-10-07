import { praseHSL } from '../parser'
import { rgbToHsl } from './rbg'

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
  ],
}

describe('color convertor', () => {
  it('should convert rgb to hsl', () => {
    pair.hex.forEach((color, idx) => {
      const hslColor = 'hsl' + pair.hsl[idx]

      expect(rgbToHsl(color), `${color} not match ${hslColor}`).eql(praseHSL(hslColor))
    })
  })
})
