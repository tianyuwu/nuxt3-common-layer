import html2canvas from 'html2canvas'

export default {
  convert({
    element, scale=1, type='jpeg', quality=1, domScale=1,
    options={}
  }: {
    element: HTMLElement, scale?: number, type?: 'jpeg' | 'png', quality?: number, domScale?: number, options?: Object
  }): Promise<string>{
    return new Promise((resolve, reject) => {
      console.log(element)
      const width = element.offsetWidth // 获取dom 宽度
      const height = element.offsetHeight // 获取dom 高度

      const canvas = document.createElement('canvas') // 创建一个canvas节点
      canvas.width = width * scale // 定义canvas 宽度 * 缩放
      canvas.height = height * scale // 定义canvas高度 * 缩放
      const opts = {
        scale: scale, // 添加的scale 参数
        canvas: canvas, // 自定义 canvas
        width: width,
        height: height,
        dpi: 72,
        useCORS: true, // 【重要】开启跨域配置
        ...options,
      }
      html2canvas(element, opts).then((result: any)=>{
        const context = result.getContext('2d')
        context.mozImageSmoothingEnabled = false
        context.webkitImageSmoothingEnabled = false
        context.msImageSmoothingEnabled = false
        context.imageSmoothingEnabled = false
        const url = canvas.toDataURL(`image/${type}`, quality)
        resolve(url)
      })
    })
  }
}