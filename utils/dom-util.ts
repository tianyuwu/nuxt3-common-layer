/**
 * copy
 * @param options
 */
export function copyToClipboard(options: { text: string; origin?: boolean }) {
  return new Promise((resolve) => {
    const props = { origin: true, ...options };

    let input: HTMLInputElement | HTMLTextAreaElement;

    if (props.origin) {
      input = document.createElement('textarea');
    } else {
      input = document.createElement('input');
    }

    input.setAttribute('readonly', 'readonly');
    input.value = props.text;
    document.body.appendChild(input);
    input.select();
    if (document.execCommand('copy')) { document.execCommand('copy'); }
    document.body.removeChild(input);
    resolve(true)
  })
}

export function createImageNode(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve) => {
    const image = new window.Image();
    image.src = src
    image.onload = () => {
      // set image only when it is loaded
      resolve(image)
    };
  })
}

export function downloadImage(url: string, fileName: string = '') {
  const a = document.createElement('a')          // 创建一个a节点插入的document
  const event = new MouseEvent('click')           // 模拟鼠标click点击事件
  a.download = fileName      // 设置a节点的download属性值
  a.href = url                                // 将图片的src赋值给a节点的href
  a.dispatchEvent(event)
  a.remove()
}