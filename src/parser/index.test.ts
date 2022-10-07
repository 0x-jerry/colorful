import { parseColor } from './index'

describe('parse color', () => {
  it('should parse rgba format', () => {
    expect(parseColor('rgba(1,2,3, .1)')).eql({
      r: 1,
      g: 2,
      b: 3,
      a: 0.1,
    })

    expect(parseColor('rgb(1% , 2%, 3%, 10%)')).eql({
      r: 2.55,
      g: 5.1,
      b: 7.65,
      a: 0.1,
    })

    expect(parseColor('rgba(1 2 3% / .01)')).eql({
      r: 1,
      g: 2,
      b: 7.65,
      a: 0.01,
    })
  })

  it('should parse rgb format', () => {
    expect(parseColor('rgb(1,2,3)')).eql({
      r: 1,
      g: 2,
      b: 3,
      a: 1,
    })

    expect(parseColor('rgb(10% , 60%, 3%)')).eql({
      r: 25.5,
      g: 153,
      b: 7.65,
      a: 1,
    })

    expect(parseColor('rgba(1 2 3%)')).eql({
      r: 1,
      g: 2,
      b: 7.65,
      a: 1,
    })
  })

  it('should parse hex format', () => {
    expect(parseColor('#333')).eql({
      r: 0x33,
      g: 0x33,
      b: 0x33,
      a: 1,
    })

    expect(parseColor('#3334')).eql({
      r: 0x33,
      g: 0x33,
      b: 0x33,
      a: 0x44,
    })

    expect(parseColor('#eeffee')).eql({
      r: 0xee,
      g: 0xff,
      b: 0xee,
      a: 1,
    })

    expect(parseColor('#eeffee02')).eql({
      r: 0xee,
      g: 0xff,
      b: 0xee,
      a: 0x02,
    })
  })

  it('should parse hsl', () => {
    expect(parseColor('hsl(105, 24%, 70%)')).eql({
      h: 105,
      s: 0.24,
      l: 0.7,
      a: 1,
    })

    expect(parseColor('hsla(105, 24%, 70%, .4)')).eql({
      h: 105,
      s: 0.24,
      l: 0.7,
      a: 0.4,
    })

    expect(parseColor('hsla(105 24% 75% / 40%)')).eql({
      h: 105,
      s: 0.24,
      l: 0.75,
      a: 0.4,
    })

    expect(parseColor('hsla(105deg 24% 70% / 40%)')).eql({
      h: 105,
      s: 0.24,
      l: 0.7,
      a: 0.4,
    })

    expect(parseColor('hsla(-105deg 24% 70% / 40%)')).eql({
      h: 360 - 105,
      s: 0.24,
      l: 0.7,
      a: 0.4,
    })

    expect(parseColor('hsla(-.5turn 24% 70% / 40%)')).eql({
      h: 180,
      s: 0.24,
      l: 0.7,
      a: 0.4,
    })

    expect(parseColor('hsla(3.1415926rad 24% 70% / 40%)')).eql({
      h: 180,
      s: 0.24,
      l: 0.7,
      a: 0.4,
    })
  })

  it('should return null', () => {
    expect(parseColor('#eeffee1')).eql(null)
    expect(parseColor('#eeffe')).eql(null)
    expect(parseColor('#ee')).eql(null)
  })
})
