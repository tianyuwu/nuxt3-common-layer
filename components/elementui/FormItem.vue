<template>
  <el-form-item :label="label" :prop="prop" :rules="getRules" :label-width="labelWidth">
    <slot>
      <component
        :is="component"
        v-model="bindValue"
        clearable
        :placeholder="getPlaceholder"
        v-bind="componentProps"
      />
      <div v-if="tips" class="error-text">{{ tips }}</div>
    </slot>
  </el-form-item>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, computed } from 'vue'
import { formComponentMap } from './FormComponentMap'
import type { FormComponentType } from './form/types'

export default defineComponent({
  name: 'FreeFormItem',
  components: {
    ...formComponentMap,
  },
  props: {
    prop: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number, Object, Array],
      default: '',
    },
    component: {
      type: String as PropType<FormComponentType>,
      default: 'Input',
    },
    componentProps: {
      type: Object,
      default: () => ({}),
    },
    required: {
      type: Boolean,
      default: false,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    labelWidth: {
      type: String,
      default: '',
    },
    tips: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const bindValue = computed({
      set: (v) => {
        emit('update:modelValue', v)
      },
      get: (v) => {
        return props.modelValue
      },
    })

    const getPlaceholder = computed(() => {
      const { label, componentProps } = props
      if (componentProps?.placeholder) {
        return componentProps.placeholder
      } else {
        return '请输入' + label
      }
    })

    const getRules = computed(() => {
      const { rules, label, required, component } = props
      if (required) {
        const action = component.includes('Select') ? '请选择' : '请填写'

        rules.push({
          required,
          message: action + label,
          trigger: 'change',
        })
      }
      return rules
    })

    return {
      bindValue,
      getPlaceholder,
      getRules,
    }
  },
})
</script>
<style lang="less" scoped></style>
