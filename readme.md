# Colorful

Some util functions for color.

```sh
pnpm i @0x-jerry/colorful
```

```ts
import { getContrastRatio, parseHex } from '@0x-jerry/colorful'
const c1 = parseHex('#000')
const c2 = parseHex('#ff00ff')
const ratio = getContrastRatio(c1, c2) // => 6.696
```

## Parser

Support:

- hex format, eg. #000, #010101
- rgb format, eg. rgb(24, 22, 66), rgba(2, 24, 244, 0.4), rgba(2, 24, 244 / 0.4)
- hsl format, eg. hsl(66, 40%, 30%), hsl(66 30% 40% / 0.5)

## Convertor

Support:

- rgbToHsl
- hslToRgb
- hslToHsv
- hsvToHwb

## Contrast

Support:

- getContrastRatio
