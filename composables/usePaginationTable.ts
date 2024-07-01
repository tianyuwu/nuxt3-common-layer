export async function usePaginationTable(url: string, queryParams: Recordable) {
  const pageState = reactive({
    currentPage: 1,
    pageSize: 10,
    total: 0,
  })
  
  const params = reactive({
    page: pageState.currentPage,
    size: pageState.pageSize,
    query: JSON.stringify(unref(queryParams))
  })

  function onSearch(data: Recordable) {
    params.query = JSON.stringify({
      ...data,
      ...unref(queryParams)
    })
    refresh()
  }

  const { data, pending, refresh } = await useFetch<any>(url, {
    params
  })
  
  const tableData = ref([])

  watchEffect(()=>{
    pageState.total = data.value?.data.total || 0
    tableData.value = data.value?.data.items || []
  })

  return {
    tableData,
    pageState,
    loading: pending,
    refresh,
    onSearch
  }
}