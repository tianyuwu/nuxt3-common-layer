<template>
  <el-form ref="formRef">
    <slot />
  </el-form>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const emit = defineEmits<{
  (e: 'submit'): void
}>()

function onSubmit() {
  if (!formRef.value) {
    return
  }
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      emit('submit')
    }
  })
}

provide(
  'form',
  reactive({
    instance: formRef,
    submit: onSubmit
  }),
)
</script>

<style lang="less" scoped></style>
