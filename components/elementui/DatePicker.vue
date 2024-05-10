<template>
  <el-date-picker v-model="valueRef" type="date" v-bind="$attrs" />
</template>

<script lang="ts">
import { defineComponent, computed, unref } from 'vue'
import dayjs from 'dayjs'

export default defineComponent({
  name: 'DatePicker',
  components: {},
  props: {
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD',
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
        const formatTime =
          val && !Array.isArray(val)
            ? dayjs(val).format(unref(props).valueFormat)
            : Array.isArray(val)
            ? [dayjs(val[0]).format('YYYY-MM-DD'), dayjs(val[1]).format('YYYY-MM-DD')]
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
