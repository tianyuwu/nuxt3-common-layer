<template>
  <div class="inline-flex gap-4px">
    <div v-for="(data, i) in formatCellData" :key="i">
      <template v-if="render === 'Image'">
        <ElImage
:src="data" :preview-src-list="formatCellData" v-bind="renderProps" class="w-40px h-40px"
          :preview-teleported="true"/>
      </template>
      <template v-else-if="render === 'Boolean'">
        {{ data ? '是' : '否' }}
      </template>
      <a v-else-if="render === 'Link'" :href="data" target="_blank" v-bind="renderProps">{{ data }}</a>
      <template v-else-if="render === 'Tag'">
        <ElTag effect="plain" size="small" v-bind="renderProps">
          {{ data }}
        </ElTag>
      </template>
      <template v-else-if="render === 'Json'">
        {{ JSON.stringify(data) }}
      </template>
      <pre v-else-if="render === 'Pre'" v-bind="renderProps">{{ data }}</pre>
      <div v-else-if="render === 'RichText'" v-bind="renderProps" v-html="data"/>
      <template v-else-if="render==='DateTime'">
        {{ dayjs(data).format('YYYY-MM-DD HH:mm') }}
      </template>
      <template v-else>{{ data }}</template>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from 'dayjs'
import type { TableColumn, RenderProps } from './types';

const props = defineProps({
  cellData: {
    type: [String, Number, Object, Array, Boolean] as PropType<any>,
    default: '',
  },
  row: {
    type: Object as PropType<Recordable>,
    default: () => ({}),
  },
  render: {
    type: String as PropType<TableColumn>,
    default: 'Text',
  },
  renderProps: {
    type: Object as PropType<RenderProps>,
    default: () => ({}),
  }
})

const formatCellData = computed(() => {
  if (isArray(props.cellData)) {
    return props.cellData.map(item => checkMapData(item))
  }
  return [checkMapData(props.cellData)]
})

function checkMapData(data: any) {
  if (props.render === 'Map') {
    const mapData = unref(props.renderProps?.mapData) as Recordable
    return mapData ? (mapData[data] || data): data
  }
  return data
}
</script>

<style lang="less" scoped></style>
