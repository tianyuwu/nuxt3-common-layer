<template>
  <div>
    <el-radio-group v-bind="$attrs" class="radio-select">
      <el-radio v-for="option in computedOptions" :key="option.value" :label="option.value">
        {{ option.label }}
      </el-radio>
      <slot></slot>
    </el-radio-group>
    <div v-if="$attrs.tips" class="error-text">{{ $attrs.tips }}</div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { ElRadio, ElRadioGroup } from 'element-plus'
import type { SelectOption } from './types'
export default defineComponent({
  name: 'RadioSelect',
  components: {
    ElRadio,
    ElRadioGroup,
  },
  props: {
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
  },
  computed: {
    computedOptions() {
      const _options = this.options.map((item) => {
        if (isObject(item)) {
          return item
        } else {
          return {
            label: item,
            value: item,
          }
        }
      })
      return _options
    },
  },
})
</script>
<style lang="less" scoped>
.radio-select {
  display: flex;
  align-items: center;
}
</style>
