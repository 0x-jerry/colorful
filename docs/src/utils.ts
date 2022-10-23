export function getImageData(
  image: HTMLImageElement,
  /**
   * 0.1 - 1
   **/
  imageQuality: number
): Uint8ClampedArray {
  const sharedCanvasId = 'xxxxxxx'

  const canvas = (document.getElementById(sharedCanvasId) ||
    document.createElement('canvas')) as HTMLCanvasElement

  canvas.id = sharedCanvasId
  canvas.style.display = 'none'

  document.body.append(canvas)

  canvas.width = image.naturalWidth * imageQuality
  canvas.height = image.naturalHeight * imageQuality
  canvas.style.width = canvas.width + 'px'
  canvas.style.height = canvas.height + 'px'

  const ctx = canvas.getContext('2d')

  if (!ctx) {
    return [] as any
  }

  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height)

  return data.data
}

interface ChooseFilesOption {
  /**
   * @default ''
   */
  accept?: string

  /**
   * @default false
   */
  multiple?: boolean
}

export function chooseFiles(opt: ChooseFilesOption = {}): Promise<File[]> {
  return new Promise((resolve, reject) => {
    const input = createInputElement()

    input.accept = opt.accept ?? ''
    input.multiple = opt.multiple ?? false

    input.onchange = () => {
      const files = [...(input?.files || [])]

      resolve(files)
      input.remove()
    }

    input.onerror = (e) => {
      reject(e)
      input.remove()
    }

    input.click()
  })
}

function createInputElement() {
  const input = document.createElement('input')

  input.type = 'file'
  input.style.display = 'none'
  input.setAttribute('data-choose-file', '')

  document.body.appendChild(input)

  return input
}
