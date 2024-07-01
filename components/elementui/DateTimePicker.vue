<template>
  <el-date-picker v-model="valueRef" type="datetime" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'DateTimePicker',
  components: {},
  props: {
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD HH:mm:ss',
    },
    modelValue: {
      type: String,
      default: '',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const valueRef = computed({
      set: (val) => {
        const formatTime = val
          ? Array.isArray(val)
            ? [
                dayjs(val[0]).format(unref(props).valueFormat),
                dayjs(val[1]).format(unref(props).valueFormat),
              ]
            : dayjs(val).format(unref(props).valueFormat)
          : ''
        emit('update:modelValue', formatTime)
      },
      get: () => {
        return unref(props).modelValue
      },
    })
    return {
      valueRef,
    }
  },
})
</script>
