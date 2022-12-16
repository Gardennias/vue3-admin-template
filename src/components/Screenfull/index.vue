<template>
  <svg-icon
    @click="handleClick"
    :icon-class="isFullscreen ? 'exist-fullscreen' : 'fullscreen'"
  />
</template>

<script setup lang="ts">
import screenfull from "screenfull"
const { proxy } = getCurrentInstance()!
const isFullscreen = ref(false)
const handleClick = () => {
  if (screenfull.isEnabled) {
    screenfull.toggle()
    return
  }
  return proxy?.$message({
    message: "your browser can not work",
    type: "warning"
  })
}

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

onMounted(() => {
  if (screenfull.isEnabled) {
    screenfull.on("change", change)
  }
})
</script>
