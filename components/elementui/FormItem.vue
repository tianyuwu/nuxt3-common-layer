<template>
  <el-form-item :rules="getRules">
    <slot />
  </el-form-item>
</template>

<script lang="ts" setup>
const attrs = useAttrs()
const getRules = computed(() => {
  const { required, rules, label } = attrs
  const mergedRules: Recordable[] = rules as Recordable[] || []
  if (required) {
    mergedRules.push({
      required,
      message: '请填写' + label,
    })
  }
  return mergedRules
})
</script>
<style lang="less" scoped></style>
