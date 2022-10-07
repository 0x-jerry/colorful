import { parseColor, parseRGB } from './parse'

describe('parse rgba', () => {
  it('should parse rgba format', () => {
    expect(parseRGB('rgba(1,2,3, .1)')).eql({
      r: 1,
      g: 2,
      b: 3,
      a: 25.5,
    })

    expect(parseRGB('rgb(1% , 2%, 3%, 10%)')).eql({
      r: 2.55,
      g: 5.1,
      b: 7.65,
      a: 25.5,
    })

    expect(parseRGB('rgba(1 2 3% / .01)')).eql({
      r: 1,
      g: 2,
      b: 7.65,
      a: 2.55,
    })
  })

  it('should parse rgb format', () => {
    expect(parseRGB('rgb(1,2,3)')).eql({
      r: 1,
      g: 2,
      b: 3,
      a: 0xff,
    })

    expect(parseRGB('rgb(1% , 2%, 3%)')).eql({
      r: 2.55,
      g: 5.1,
      b: 7.65,
      a: 0xff,
    })

    expect(parseRGB('rgba(1 2 3%)')).eql({
      r: 1,
      g: 2,
      b: 7.65,
      a: 0xff,
    })
  })

  it('should parse failed', () => {
    expect(parseRGB('rgba(1 2 3 , .1)')).eql(null)
    expect(parseRGB('rgba(1, 2, 3 / .1)')).eql(null)
  })
})

describe('parse hex', () => {
  it('should parse #333 or #3334', () => {
    expect(parseColor('#333')).eql({
      r: 0x33 / 0xff,
      g: 0x33 / 0xff,
      b: 0x33 / 0xff,
      a: 1,
    })

    expect(parseColor('#3334')).eql({
      r: 0x33 / 0xff,
      g: 0x33 / 0xff,
      b: 0x33 / 0xff,
      a: 0x44 / 0xff,
    })
  })

  it('should parse #eeffee or #eeffee02', () => {
    expect(parseColor('#eeffee')).eql({
      r: 0xee / 0xff,
      g: 0xff / 0xff,
      b: 0xee / 0xff,
      a: 1,
    })

    expect(parseColor('#eeffee02')).eql({
      r: 0xee / 0xff,
      g: 0xff / 0xff,
      b: 0xee / 0xff,
      a: 0x02 / 0xff,
    })
  })

  it('should return null', () => {
    expect(parseColor('#eeffee1')).eql(null)
    expect(parseColor('#eeffe')).eql(null)
    expect(parseColor('#ee')).eql(null)
  })
})
