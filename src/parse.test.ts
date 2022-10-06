import { parseRGBA } from './parse'

describe('parse rgba', () => {
  it('should parse rgba format', () => {
    expect(parseRGBA('rgba(1,2,3, .1)')).eql({
      r: 1,
      g: 2,
      b: 3,
      a: 25.5,
    })

    expect(parseRGBA('rgb(1% , 2%, 3%, 10%)')).eql({
      r: 2.55,
      g: 5.1,
      b: 7.65,
      a: 25.5,
    })

    expect(parseRGBA('rgba(1 2 3% / .01)')).eql({
      r: 1,
      g: 2,
      b: 7.65,
      a: 2.55,
    })
  })

  it('should parse rgb format', () => {
    expect(parseRGBA('rgb(1,2,3)')).eql({
      r: 1,
      g: 2,
      b: 3,
      a: 0xff,
    })

    expect(parseRGBA('rgb(1% , 2%, 3%)')).eql({
      r: 2.55,
      g: 5.1,
      b: 7.65,
      a: 0xff,
    })

    expect(parseRGBA('rgba(1 2 3%)')).eql({
      r: 1,
      g: 2,
      b: 7.65,
      a: 0xff,
    })
  })

  it('should parse failed', () => {
    expect(parseRGBA('rgba(1 2 3 , .1)')).eql(null)
    expect(parseRGBA('rgba(1, 2, 3 / .1)')).eql(null)
  })
})
