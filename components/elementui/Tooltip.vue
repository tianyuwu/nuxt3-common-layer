<template>
  <el-tooltip :disabled="disabledTooltip">
    <span cursor-pointer class="leading-none flex-center">
      <slot></slot>
    </span>
  </el-tooltip>
</template>
<script setup lang="ts">
const disabledTooltip = ref(false)

onMounted(() => {
  if (isMobile()) {
    disabledTooltip.value = true
  }
})
</script>
