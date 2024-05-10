<template>
  <div>
    <el-checkbox-group v-bind="$attrs" class="checkbox-select">
      <el-checkbox v-for="option in computedOptions" :key="option.value" :label="option.label" />
      <slot></slot>
    </el-checkbox-group>
    <div v-if="$attrs.tips" class="error-text">{{ $attrs.tips }}</div>
  </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import { ElCheckboxGroup, ElCheckbox } from 'element-plus'
import type { SelectOption } from './types'
export default defineComponent({
  name: 'CheckboxSelect',
  components: {
    ElCheckboxGroup,
    ElCheckbox,
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
.checkbox-select {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  :deep(.el-checkbox:last-of-type) {
    margin-right: 20px;
  }
}
</style>
