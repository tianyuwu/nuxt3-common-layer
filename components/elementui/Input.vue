<template>
  <el-input v-bind="$attrs">
    <template v-if="prepend" #prepend>{{ prepend }}</template>
    <template v-if="append" #append>{{ append }}</template>
  </el-input>
</template>

<script lang="ts">
import { ElInput } from 'element-plus'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { ElInput },
  props: {
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
  setup() {},
})
</script>
