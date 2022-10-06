export interface RGB {
  /**
   * 0 - 255
   */
  r: number
  /**
   * 0 - 255
   */
  g: number
  /**
   * 0 - 255
   */
  b: number
  /**
   * 0 - 255
   */
  a: number
}

export interface HSL {
  /**
   * 0 - 360
   */
  h: number
  /**
   * 0 - 1
   */
  s: number
  /**
   * 0 - 1
   */
  l: number
  /**
   * 0 - 1
   */
  a: number
}

export type Color = string | RGB | HSL
