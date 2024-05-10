<template>
  <el-select v-bind="$attrs" filterable @change="handleChange">
    <el-option
      v-for="option in optionsRef"
      :key="option.value"
      :value="option.value"
      :label="option.label"
    />
  </el-select>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref, watch, unref } from 'vue'
import { ElSelect, ElOption } from 'element-plus'

type OptionsItem = { label: string; value: string; disabled?: boolean }

export default defineComponent({
  name: 'BasicSelect',
  components: {
    ElSelect,
    ElOption,
  },
  props: {
    options: {
      type: [Array, Object] as PropType<any[] | any>,
      default: () => [
        {
          label: '是',
          value: 1,
        },
        {
          label: '否',
          value: 0,
        },
      ],
    },
  },
  emits: ['change'],
  setup(props, { emit }) {
    function getFormatOptions(options: any[]): OptionsItem[] {
      if (!options) {
        return []
      }
      const _options = options.map((item) => {
        return isObject(item)
          ? (item as OptionsItem)
          : {
              label: item,
              value: item,
            }
      })
      return _options
    }

    const optionsRef = ref<any[]>([])

    watch(
      () => unref(props.options),
      (v) => {
        const formatOptions = getFormatOptions(v)
        optionsRef.value = formatOptions
      },
      { immediate: true },
    )

    function handleChange(value: any) {
      const options = optionsRef.value
      const selected = options.find((item) => item.value === value)
      emit('change', selected)
    }

    return {
      optionsRef,
      handleChange,
    }
  },
})
</script>
