<template>
  <div class="bg-#fff p-20px">
    <ElementuiPageTable
v-model:pagination="pageState" v-loading="loading" :table-data="tableData"
      :setting="tableSetting" v-bind="$attrs" @search="onSearch">
      <template #header>
        <slot name="header" :show-dialog="showNewdialog" />
      </template>
      <template #action="{ row }">
        <slot name="action" :row="row" :show-dialog="showDialog" :on-delete="onDelete">
          <el-button type="primary" link @click="showDialog(row)">编辑</el-button>
          <el-button type="danger" link @click="onDelete(row)">删除</el-button>
        </slot>
      </template>
      <template
v-for="name in Object.keys($slots).filter(item => !['action', 'header'].includes(item))"
        #[name]="slotData">
        <slot :name="name" v-bind="slotData || {}" />
      </template>
    </ElementuiPageTable>

    <FormDialog
v-model="dialogVisible" v-model:form-data="formDataInner" :form-setting="formSetting"
      @submit="onSubmit">
      <template #default>
        <slot name="formItem" />
      </template>
    </FormDialog>
    <slot name="footer" :refresh-table="refresh" />
  </div>
</template>

<script setup lang="ts">
import type { PageTableSetting } from './elementui/types';

const props = defineProps({
  tableSetting: {
    type: Array as PropType<PageTableSetting[]>,
    default: () => []
  },
  formSetting: {
    type: Array,
    default: () => []
  },
  apiPath: {
    type: String,
    required: true
  },
  queryParams: {
    type: Object,
    default: () => ({})
  },
  formData: {
    type: Object,
    default: () => ({})
  }
})

const { pageState, tableData, loading, refresh, onSearch } = await usePaginationTable(props.apiPath, props.queryParams)

const formDataInner = useVModel(props, 'formData')

const { dialogVisible, setDialogVisible, showDialog } = useFormDialog(formDataInner)

function showNewdialog() {
  showDialog({})
}

const { onSubmit, onDelete } = useCrudRequest(props.apiPath, () => {
  setDialogVisible(false)
  refresh();
})
</script>

<style lang="less" scoped></style>
