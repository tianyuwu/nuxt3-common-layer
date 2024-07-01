export function useCrudRequest(baseUrl: string, callback: Function) {
  function onCreate(data: Recordable) {
    $fetch(baseUrl, {
      method: 'POST',
      body: data,
    }).then(res => {
      ElMessage.success({ message: '添加成功' })
      callback();
    }).catch((err) => {
      ElMessage.warning({ message: err.msg || '发生了未知错误，请稍后再试' })
    })
  }

  function onEdit(data: Recordable) {
    $fetch(`${baseUrl}/${data.id}`, {
      method: 'PUT',
      body: data,
    }).then(res => {
      ElMessage.success({ message: '修改成功' })
      callback();
    }).catch((err) => {
      ElMessage.warning({ message: err.msg || '发生了未知错误，请稍后再试' })
    })
  }

  function onSubmit(data: Recordable, uniqueId: string = 'id') {
    if (data[uniqueId]) {
      onEdit(data)
    } else {
      onCreate(data)
    }
  }

  function onDelete(data: any) {
    ElMessageBox.confirm('确定要删除该记录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(() => {
      $fetch(`${baseUrl}/${data.id}`, { method: 'DELETE' }).then(() => {
        callback();
        ElMessage({
          type: 'success',
          message: '删除成功!',
        })
      }).catch(err => {
        ElMessage.warning({ message: err.msg || '发生了未知错误，请稍后再试' })
      })
    })
  }

  return {
    onCreate,
    onDelete,
    onSubmit,
    onEdit
  }
}