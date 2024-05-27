<template>
  <el-form-item>
    <slot :placeholder="getPlaceholder" />
  </el-form-item>
</template>

<script lang="ts" setup>
const props = defineProps<{
  label?: string
}>()

const getPlaceholder = computed(() => {
  const { label } = props
  return '请输入' + label
})
</script>
<style lang="less" scoped></style>
