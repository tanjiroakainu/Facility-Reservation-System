<template>
  <div class="particles-wrap" aria-hidden="true">
    <span
      v-for="i in count"
      :key="i"
      class="particle"
      :style="style(i)"
    />
  </div>
</template>

<script setup lang="ts">
const count = 28

function style(i: number) {
  const left = (i * 7 + 13) % 100
  const top = (i * 11 + 31) % 100
  const delay = (i * 0.7) % 4
  const size = 3 + (i % 4)
  return {
    left: `${left}%`,
    top: `${top}%`,
    animationDelay: `${delay}s`,
    width: `${size}px`,
    height: `${size}px`,
  }
}
</script>
