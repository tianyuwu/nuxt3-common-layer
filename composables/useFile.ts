export function fileTypeCheck(file: File, accepts = ['.png', '.jpg', '.jpeg']) {
  const fileName = file.name.toLowerCase()
  const pos = fileName.lastIndexOf('.')
  const lastName = fileName.substring(pos, fileName.length)
  if (!accepts.includes(lastName))
    return false

  return true
}
