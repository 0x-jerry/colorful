<script setup lang="ts">
import { Color, mmcq } from 'mmcq.js'
import { computed, ref } from 'vue'
import { chooseFiles, getImageData } from './utils'
import { rgbToHsl } from '../../src/convertor'

const colors = ref<Color[]>([])

const img = ref<string>()

async function extractColors(e: Event) {
  const el = e.target as HTMLImageElement
  const data = getImageData(el, 1)

  const cc = await mmcq(data, {
    count: 6,
    algorithm: 8,
  })

  colors.value = cc
}

async function choose() {
  const [file] = await chooseFiles({ accept: '.jpg,.png,.webp' })
  if (!file) return

  img.value = URL.createObjectURL(file)
}

const { round } = Math

function toHsl(hex: string) {
  const c = rgbToHsl(hex)
  if (!c) return ''
  const cc = [c.h, c.s, c.l, c.a].map((n) => round(n)).join(',')

  return `hsla(${cc})`
}

const bgStyle = computed(() => {
  const color = colors.value.at(0)
  if (!color) return {}

  return {
    background: `rgba(${color.r}, ${color.g}, ${color.b}, 0.4)`,
  }
})

const gradientStyle = computed(() => {
  const color = colors.value.map((n) => n.hex).join(',')

  return {
    background: `linear-gradient(to right, ${color})`,
  }
})
</script>

<template>
  <div class="h-screen text-gray-7 font-mono" :style="bgStyle">
    <div class="h-10 border-b border-gray-200 bg-white"></div>
    <div class="text-xl text-center my-4">Color Utils</div>

    <div class="px-10 flex gap-4">
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
        <div class="gradient w-full h-6 rounded-full" :style="gradientStyle"></div>
        <div class="flex flex-1 w-full text-xs">
          <div class="flex-1 flex flex-col gap-2 items-center" v-for="color in colors">
            <div
              class="color w-10 flex-1 rounded-full border border-gray-2"
              :style="{ background: color.hex }"
            ></div>
            <div class="hex">
              {{ color.hex }}
            </div>
            <div class="rgb">
              {{ color.rgb }}
            </div>
            <div class="hsl">
              {{ toHsl(color.rgb) }}
            </div>
          </div>
        </div>
        <!--  -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
