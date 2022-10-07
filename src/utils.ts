import { toFixed } from '@0x-jerry/utils'

export function round(num: number, fractionDigits: number): number {
  const u = Math.pow(10, fractionDigits)

  return toFixed(Math.round(num * u) / u, fractionDigits)
}
