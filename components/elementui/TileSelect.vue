<template>
  <div class="tile-select">
    <div v-if="label" class="tile-select-label" :style="{ width: labelWidth }">{{ label }}：</div>
    <div class="tile-select-options">
      <div
        class="tile-select-options-item"
        :class="{ active: bindValue === '' }"
        @click="handleAll"
      >
        全部
      </div>
      <div
        v-for="item in options"
        :key="item.value"
        class="tile-select-options-item"
        :class="{ active: bindValue !== '' && bindValue == item.value }"
        @click="handleChange(item)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
/**
 * 平铺选择器，即将选择器所有选项平铺展示出来而非下拉选择，用于做快速筛选检索用
 */
import type { PropType } from 'vue'
import { computed, defineComponent, unref } from 'vue'
import type { SelectOption } from './types'

export default defineComponent({
  name: 'TileSelect',
  components: {},
  props: {
    modelValue: {
      type: [Number, String] as PropType<number | string>,
      default: '',
    },
    options: {
      type: Array as PropType<SelectOption[]>,
      default: () => [],
    },
    label: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: String,
      default: 'auto',
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const bindValue = computed({
      get: () => {
        return isUnDef(unref(props).modelValue) ? '' : unref(props).modelValue
      },
      set: (val) => {
        emit('update:modelValue', val)
      },
    })

    function handleChange(item: SelectOption) {
      bindValue.value = item.value
    }

    function handleAll() {
      bindValue.value = ''
    }

    return {
      bindValue,
      handleChange,
      handleAll,
    }
  },
})
</script>
<style lang="less" scoped>
.tile-select {
  display: flex;
  align-items: center;
  font-size: 16px;

  &-label {
    flex-shrink: 0;
  }

  &-options {
    flex: 1;
    display: flex;

    &-item {
      padding: 6px 12px;
      margin: 0 4px;
      cursor: pointer;

      &.active {
        background-color: #1989fa;
        color: #fff;
        &:hover {
          background-color: #1989fa;
        }
      }

      &:hover {
        background-color: #1989fae0;
        color: #fff;
      }
    }
  }
}
</style>
