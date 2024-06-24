<template>
  <div>
    <ClientOnly>
      <el-form v-if="filterColumns.length" :inline="true">
        <el-row :gutter="10" class="w-full">
          <el-col v-for="item in filterColumns" :key="item.prop" :xs="24" :sm="8" :md="6" :lg="4">
            <el-form-item class="w-full mb-10px!">
              <component
:is="item.filter" v-model="filterData[item.prop]" :placeholder="item.label"
                v-bind="item.filterProps" clearable />
            </el-form-item>
          </el-col>
          <el-col :xs="24" :sm="8" :md="6" :lg="6">
            <div class="mb-10px">
              <el-button type="primary" @click="handleSearch">搜索</el-button>
              <el-button @click=handleReset>重置</el-button>
            </div>
          </el-col>
        </el-row>
      </el-form>
      <div v-if="$slots.header" class="flex-between mb-10px">
        <div class="flex items-center">
          <slot name="header" />
        </div>
        <el-button type="primary" circle @click="handleSearch">
          <Icon name="ep:refresh" />
        </el-button>
      </div>
      <el-table class="page-table" :data="tableData">
        <slot />
        <el-table-column
v-for="item in columns" :key="item.prop" :prop="item.prop" :label="item.label"
          v-bind="item.columnProps">
          <template #default="scope">
            <ElementuiPageTableColumn
v-if="item.render !== 'CustomRender'" :render-props="item.renderProps"
              :render="item.render" :cell-data="scope.row[item.prop]" :row="scope.row" />
            <slot v-else :name="item.prop" :text="scope.row[item.prop]" :scope="scope" :row="scope.row" />
          </template>
        </el-table-column>
        <el-table-column v-if="$slots.action" label="操作" :width="actionWidth">
          <template #default="scope">
            <el-space spacer="|">
              <slot name="action" :row="scope.row" />
              <ClientOnly v-if="$slots.moreAction">
                <el-popover popper-class="min-w-3em! w-auto!" placement="bottom" trigger="hover">
                  <template #reference>
                    <el-button link type="primary">
                      更多
                      <Icon name="ep:arrow-down" />
                    </el-button>
                  </template>
                  <el-space direction="vertical" class="w-full">
                    <slot name="moreAction" :row="scope.row" />
                  </el-space>
                </el-popover>
              </ClientOnly>
            </el-space>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="paginationProps.total" class="flex-center mt-20px">
        <el-pagination
v-model:page-size="paginationProps.pageSize" v-model:current-page="pagination.currentPage"
          background :page-sizes="pageSizes" layout="total, sizes, prev, pager, next, jumper"
          :total="paginationProps.total" />
      </div>
    </ClientOnly>

  </div>

</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { PageTableSetting } from './types';

const props = defineProps({
  tableData: {
    type: Array,
    default: () => []
  },
  setting: {
    type: Array as PropType<PageTableSetting[]>,
    default: () => []
  },
  pagination: {
    type: Object,
    default: () => {
      return {
        pageSize: 10,
        total: 0,
        currentPage: 1,
      }
    }
  },
  pageSizes: {
    type: Array as PropType<number[]>,
    default: () => [10, 20, 50, 100]
  },
  actionWidth: {
    type: String,
    default: 'auto'
  }
})

const columns = computed(() => {
  return props.setting.filter(item => !item.hidden)
})

const filterColumns = computed(() => {
  return props.setting.filter(item => item.filter)
})


const emit = defineEmits<{
  (e: 'update:pagination'): void,
  (e: 'search', data: Recordable): void
}>()

const paginationProps = useVModel(props, 'pagination', emit)

const filterData = reactive<Recordable>({})

function handleSearch() {
  emit('search', filterData)
}

function handleReset() {
  Object.keys(filterData).forEach(key => {
    filterData[key] = null
  })
  emit('search', filterData)
}
</script>

<style lang="less" scoped>
.page-table {
  :deep(.el-table__header-wrapper) {
    tr {
      th {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;

        background: #fafafa;
      }
    }
  }

  :deep(.el-table__fixed-header-wrapper) {
    tr {
      th {
        color: rgba(0, 0, 0, 0.85);
        font-weight: 500;

        background: #fafafa;

        &.is-leaf {
          text-align: center;
        }
      }
    }
  }

  :deep(.el-table__body) {
    color: #606280;
    font-size: 14px;
  }
}
</style>
