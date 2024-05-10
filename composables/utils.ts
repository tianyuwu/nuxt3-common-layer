export function getUserAgent(){
  let ua = ''
  const nuxtApp = useNuxtApp()
  if(process.server) {
    ua = nuxtApp.ssrContext?.event.headers.get('user-agent') || ''
  }
  else {
    ua = navigator.userAgent
  }
  return ua
}