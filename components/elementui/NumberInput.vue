<template>
  <el-input v-model.number="bindValue" type="number" v-bind="$attrs">
    <template v-if="prepend" #prepend>{{ prepend }}</template>
    <template v-if="append" #append>{{ append }}</template>
  </el-input>
</template>

<script lang="ts">
import { ElInput } from 'element-plus'
import { computed, defineComponent } from 'vue'
export default defineComponent({
  name: 'NumberInput',
  components: { ElInput },
  props: {
    modelValue: {
      type: [Number, String],
      default: null,
    },
    /**
     * input前缀
     */
    prepend: {
      type: String,
      default: '',
    },
    /**
     * input后缀
     */
    append: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const bindValue = computed({
      get: () => {
        return props.modelValue
      },
      set: (v) => {
        emit('update:modelValue', isNumber(v) ? v : null)
      },
    })
    // function handleInput(val: any) {
    //   const pattern = /^[1-9][0-9]*$/
    //   if (!pattern.test(val)) {
    //     bindValue.value = ''
    //   }
    // }
    return {
      bindValue,
      // isnumber,
      // handleInput,
    }
  },
})
</script>
