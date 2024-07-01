<template>
  <div class="array-input">
    <template
      v-for="(item, index) in bindValue"
      :key="index"
    >
      <el-input
        v-model="bindValue[index]"
        class="array-item"
        @change="onChange"
      >
        <template #suffix>
          <Icon
            class="pointer"
            :size="16"
            name="ep:delete"
            @click="onDelete(index)"
          />
          <!-- <i class="el-icon-close el-input__icon pointer" @click="onDelete(index)"></i> -->
        </template>
      </el-input>
    </template>
    <el-button
      type="primary"
      @click="addItem"
    >
      添加
    </el-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'
export default defineComponent({
  name: 'ArrayInput',
  props: {
    modelValue: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    const bindValue = computed(() => {
      const modelValue = isArray(props.modelValue)
        ? props.modelValue.length
          ? props.modelValue
          : ['']
        : [props.modelValue || '']
      return reactive(modelValue)
    })

    function onDelete(index: number) {
      if (bindValue.value.length === 1) {
        bindValue.value[index] = ''
      } else {
        bindValue.value.splice(index, 1)
      }
    }

    function onChange() {
      emit('update:modelValue', bindValue.value)
    }

    function addItem() {
      bindValue.value.push('')
      onChange()
    }

    return {
      bindValue,
      addItem,
      onDelete,
      onChange,
    }
  },
})
</script>
<style lang="less" scoped>
.array-item {
  margin-bottom: 10px;
  .pointer {
    cursor: pointer;
  }
  :deep(.el-input__suffix) {
    .el-input__suffix-inner {
      align-items: center;
    }
  }
}
</style>
