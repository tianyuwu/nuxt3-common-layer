export function useFormDialog(formData: Recordable) {
  const [dialogVisible, setDialogVisible] = useToggle(false)
  
  function showDialog(data: Recordable) {
    formData.value = {
      ...formData.value,
      ..._CloneDeep(data)
    }
    setDialogVisible(true)
  }
  
  return {
    dialogVisible,
    setDialogVisible,
    showDialog
  }
}