import { ElMessage } from 'element-plus'

export interface RequestOption {
  action: string
  data: Recordable
  file: File
  onError: (...args: any) => void
  onProgress: (...args: any) => void
  onSuccess: (...args: any) => void
}
/**
 * 图片格式检查
 * @param file
 */
export function imageCheck(file: File, size: number = 10) {
  const fileName = file.name.toLowerCase()
  const pos = fileName.lastIndexOf('.')
  const lastName = fileName.substring(pos, fileName.length)
  if (!['.png', '.jpg', '.jpeg', '.gif'].includes(lastName)) {
    return false
  }
  // 设置最大值，则判断
  if (file.size / 1024 / 1024 >= size) {
    ElMessage.error(`只能上传不超过10MB的文件!`)
    return false
  }

  return true
}