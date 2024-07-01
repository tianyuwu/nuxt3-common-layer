<template>
  <el-dialog v-model="dialogVisible" width="500" :title="title" :destroy-on-close="true" @closed="onClose">
    <ElementuiForm :model="formDataState" label-position="top" @submit="$emit('submit', formDataState)">
      <slot/>
      <ElementuiFormItem v-for="item in formSetting" :key="item.prop" :required="item.required" :label="item.label" :prop="item.prop">
        <component :is="item.component" v-model="formDataState[item.prop]" v-bind="item.componentProps"/>
      </ElementuiFormItem>
      <div class="w-full flex flex-row-reverse gap-10px">
        <ElementuiFormButton type="primary" native-type="submit">提交</ElementuiFormButton>
        <ElementuiFormButton @click="closeDialog">取消</ElementuiFormButton>
      </div>
    </ElementuiForm>
  </el-dialog>
</template>

<script setup lang="ts">
const props = defineProps({
  formData: {
    type: Object,
    default: () => ({})
  },
  formSetting: {
    type: Object,
    default: () => {
      return {}
    }
  },
  modelValue: {
    type: Boolean,
    defalut: false
  }
})
const emit = defineEmits(['update:modelValue', 'submit', 'update:formData'])

const dialogVisible = useVModel(props, 'modelValue', emit)

const formDataState = useVModel(props, 'formData', emit)

const defaultFormData: Recordable = _CloneDeep(unref(props.formData))
console.log(defaultFormData)

function closeDialog() {
  dialogVisible.value = false
}

function onClose() {
  formDataState.value = defaultFormData
}

const title = computed(() => {
  return formDataState.value.id ? '编辑' : '创建'
})
</script>

<style lang="less" scoped></style>
