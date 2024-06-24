<template>
  <el-scrollbar ref="scrollContainerRef" :height="height" @scroll="onScroll">
    <div ref="scrollInnerRef" class="scroll-inner-container">
      <slot></slot>
    </div>
  </el-scrollbar>
</template>
<script setup lang="ts">
defineProps({
  height: {
    type: String,
    default: '100%'
  }
})
const emit = defineEmits(['register'])

const scrollInnerRef = ref<HTMLDivElement>()
const scrollContainerRef = ref<InstanceType<any>>()
const scrollTop = ref(0)
const shouldAutoScroll = ref(true)

function scrollToBottom(force = false) {
  if (!shouldAutoScroll.value && !force) {
    return
  }
  const scrollHeight = getScrollHeight()
  scrollContainerRef.value!.setScrollTop(scrollHeight)
}

function getScrollHeight() {
  const scrollNode = scrollContainerRef.value!.$el.querySelector('.el-scrollbar__wrap')
  return scrollNode.scrollHeight - scrollNode.clientHeight
}

onMounted(() => {
  scrollContainerRef.value?.$el.addEventListener('wheel', () => {
    const scrollHeight = getScrollHeight()
    // 手动滚动到底部
    if (scrollHeight <= scrollTop.value + 20) {
      shouldAutoScroll.value = true
    } else {
      shouldAutoScroll.value = false
    }
  })
})

function onScroll({ scrollTop: _scrollTop }: any) {
  scrollTop.value = _scrollTop
}

emit('register', {
  scrollToBottom
})

defineExpose({
  scrollToBottom
})
</script>
