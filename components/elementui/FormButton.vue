<template>
  <el-button @click="handleClick">
    <slot></slot>
  </el-button>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  nativeType?: 'submit' | 'default' | 'reset';
}>(), {
  nativeType: 'default',
})

const form = inject('form') as any
const emit = defineEmits(['click'])

function handleClick() {
  if (props.nativeType === 'submit') {
    form.submit()
  } else if (props.nativeType === 'reset') {
    form.instance.resetFields()
  }
  emit('click')
}
</script>

<style lang="less" scoped></style>
