<script setup lang="ts">
import { Color, mmcq } from 'mmcq.js'
import { computed, reactive, ref } from 'vue'
import { chooseFiles, getImageData } from './utils'
import { Optional } from '@0x-jerry/utils'
import { parseRGB } from '../../src/parser'
import { rgbToHsl, hslToHwb } from '../../src/convertor'
import VContrast from '../components/VContrast.vue'

const colors = ref<Color[]>([])

const img = ref<string>()

const data = reactive({
  bgColor: null as Optional<Color>,
})

async function extractColors(e: Event) {
  const el = e.target as HTMLImageElement
  const imgData = getImageData(el, 0.1)

  const cc = await mmcq(imgData, {
    count: 8,
    algorithm: 8,
  })

  colors.value = cc

  data.bgColor = colors.value.at(0)
}

async function choose() {
  const [file] = await chooseFiles({ accept: '.jpg,.png,.webp' })
  if (!file) return

  img.value = URL.createObjectURL(file)
}

const bgStyle = computed(() => {
  const color = data.bgColor
  if (!color) return {}

  return {
    background: `rgba(${color.r}, ${color.g}, ${color.b}, 1)`,
  }
})

function toHSL(color: Color) {
  const hsl = rgbToHsl(parseRGB(color.rgb)!)

  return `hsl(${hsl.h}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`
}

function toHWB(color: Color) {
  const hsl = rgbToHsl(parseRGB(color.rgb)!)

  const hwb = hslToHwb(hsl)

  return `hwb(${hwb.h}, ${Math.round(hwb.w * 100)}%, ${Math.round(hwb.b * 100)}%)`
}
</script>

<template>
  <div class="h-screen text-gray-7 font-mono flex flex-col">
    <div class="text-4xl text-center py-2xl text-shadow shadow-white">Color Utils</div>

    <div class="px-10 flex gap-lg">
      <div
        class="img w-300px aspect-3/4 border border-gray-2 shadow-xl rounded-xl overflow-hidden cursor-pointer"
        @click="choose"
      >
        <img
          v-if="img"
          :src="img"
          class="w-full h-full block object-contain"
          @load="extractColors"
        />
        <div v-else class="flex items-center justify-center h-full">
          <div>Click me to select image</div>
        </div>
      </div>
      <div class="colors flex flex-col flex-1 gap-4">
        <!-- <div class="gradient w-full h-6 rounded-full" :style="gradientStyle"></div> -->
        <div class="flex flex-1 w-full text-xs">
          <div class="flex-1 flex flex-col gap-2 items-center" v-for="color in colors">
            <div
              class="color w-10 flex-1 rounded-full flex items-center justify-center cursor-pointer shadow shadow-current hover:shadow-lg transition transition-shadow"
              @click="data.bgColor = color"
              :style="{
                color: color.hex,
                background: color.hex,
                writingMode: 'vertical-rl',
              }"
            >
              <VContrast :background="color" class="text-xl">
                {{ color.hex.toUpperCase() }}
              </VContrast>
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
    <div
      class="flex-1 mt-lg text-2xl flex justify-center items-center"
      :style="bgStyle"
      v-if="data.bgColor"
    >
      <VContrast :background="data.bgColor" class="flex flex-col gap-lg text-shadow shadow-white">
        <div class="hex">HEX: {{ data.bgColor.hex.toUpperCase() }}</div>
        <div class="rgb">RGB: {{ data.bgColor.rgb }}</div>
        <div class="hsl">HSL: {{ toHSL(data.bgColor) }}</div>
        <div class="hsl">HWB: {{ toHWB(data.bgColor) }}</div>
      </VContrast>
    </div>
  </div>
</template>
