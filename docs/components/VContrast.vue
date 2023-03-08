<script lang="ts" setup>
import { computed } from 'vue'
import { parseHex, RGB, toString, getContrastRatio } from '../../src'

const props = defineProps<{
  background: RGB
}>()

const style = computed(() => {
  const black = parseHex('#000')
  const white = parseHex('#fff')

  const text = getContrastRatio(props.background, black) > 4.5 ? black : white

  console.log(text)
  return {
    color: toString(text),
    background: toString(props.background),
  }
})
</script>

<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>

<style lang="less"></style>
