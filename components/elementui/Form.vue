<template>
  <el-form ref="formRef" class="free-form">
    <slot></slot>
  </el-form>
</template>

<script setup lang="ts">
const props = defineProps({
  onSubmit: {
    type: Function,
    default: () => { },
  },
})
const formRef = ref<Nullable<any>>(null)
provide(
  'form',
  reactive({
    instance: formRef,
    onSubmit: props.onSubmit,
  }),
)
</script>

<style lang="less" scoped></style>
