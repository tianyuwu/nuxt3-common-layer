<template>
  <div class="pic-upload-container">
    <div v-if="imageUrls.length && showPreview" ref="previewBox" class="preview-container flex flex-center">
      <div v-for="(img, index) in imageUrls" :key="img" class="preview-pic flex flex-center">
        <el-image :src="img" crossorigin="" class="w-full h-full" :preview-src-list="imageUrls" fit="cover" :z-index="20000" />
        <div class="close-btn flex-center" @click="closePic(index)">
          <Icon name="ep:close"></Icon>
        </div>
      </div>
    </div>
    <el-progress type="circle" v-show="showPercentage" :percentage="percentage" />
    <div class="flex w-full gap-10px">
      <div class="flex-grow" v-if="multiple === 1">
        <el-input ref="imageUploadInput" :model-value="imageUrls[0]" placeholder="支持粘贴图片或者复制图片链接到该输入框"
          @input="onUploadInput">
        </el-input>
      </div>
      <el-upload ref="upload" action="" :auto-upload="true" :on-success="uploadSuccess"
        :multiple="multiple > 1 ? true : false" :http-request="handleUploadRequest" :before-upload="imageCheck"
        v-bind="$attrs" accept="image/png,image/jpg,image/jpeg,image/gif">
        <el-button type="primary" :disabled="multiple > 1 && imageUrls.length >= multiple">
          {{ buttonText }}
        </el-button>
      </el-upload>
    </div>

    <!-- <image-cropper ref="imageCropper" v-bind="crop" @upload="afterCrop" /> -->
  </div>
</template>

<script setup lang="ts">
import Sortable from 'sortablejs'
import { imageCheck } from './useUpload';

const props = defineProps({
  /**
   * v-model绑定值
   */
  modelValue: {
    type: [String, Array],
    default: '',
  },
  /** 是否支持传多张 */
  multiple: {
    type: Number,
    default: 1,
  },
  /** 按钮名称 */
  buttonText: {
    type: String,
    default: '点击上传',
  },
  /** 是否显示预览 */
  showPreview: {
    type: Boolean,
    default: true,
  },
  /** 成功回调 */
  onSuccess: {
    type: Function,
    default: null,
  },
  /** 上传进度回调 */
  progressEvent: {
    type: Function,
    default: null,
  },
  uploadRequest: {
    type: Function,
    required: true
  }
}
)
const emit = defineEmits(['update:modelValue'])

// const inputEnable = ref(false)
const imageUrls = ref<string[]>([])
const newImgArr = ref<string[]>([])
const previewBox = ref(null)
const imageUploadInput = ref<any>(null)
const imageCropper = ref(null)
const percentage = ref(0)
const showPercentage = ref(false)

watch(
  () => props.modelValue,
  (value) => {
    if (!(value && value.length)) {
      percentage.value = 0
    }
    newImgArr.value = []
    if (props.multiple > 1) {
      // 多选
      // 不能超过限制的最大上传
      if (isArray(value)) {
        value.forEach((el, index) => {
          if (index < props.multiple) {
            newImgArr.value.push(el)
          }
        })
      }
      imageUrls.value = newImgArr.value
    } else {
      if (value) {
        //@ts-ignore
        imageUrls.value = Array.isArray(value) ? value : [value]
      } else {
        imageUrls.value = []
      }
    }
  },
  { immediate: true, deep: true },
)

onMounted(() => {
  const inputDom = imageUploadInput.value?.$el
  if (inputDom) {
    inputDom.addEventListener('paste', (e: any) => {
      if (!(e.clipboardData && e.clipboardData.items)) {
        return
      }
      const item = e.clipboardData.items[0]

      if (item.kind === 'file') {
        const file = item.getAsFile()
        const options = {
          file,
          onError: () => { },
          onSuccess: uploadSuccess,
        }
        showPercentage.value = true
        percentage.value = 0
        props.uploadRequest(options)
      } else {
        console.log(item)
      }
    })
  }

  if (!props.showPreview || props.multiple === 1) {
    return
  }
  const el = previewBox.value
  if (el) {
    Sortable.create(el, {
      animation: 500,
      delay: 400,
      delayOnTouchOnly: true,
      handle: '.preview-pic',
      onEnd: (evt) => {
        // console.log(evt)
        const { oldIndex, newIndex } = evt
        console.log(oldIndex, newIndex)
        if (oldIndex === newIndex) {
          return
        }
        const _options = _CloneDeep(imageUrls.value)
        const currRow = _options.splice(oldIndex, 1)[0]
        _options.splice(newIndex, 0, currRow)
        nextTick(() => {
          emit('update:modelValue', _options)
        })
      },
    })
  }
})

function uploadSuccess(response: any) {
  const url = response.url
  let newValue
  if (props.multiple > 1) {
    imageUrls.value.push(url)
    newValue = imageUrls.value
  } else {
    newValue = url
    imageUrls.value = [newValue]
  }
  props.onSuccess && props.onSuccess(newValue)
  showPercentage.value = false
  emit('update:modelValue', newValue)
}

const handleUploadRequest = (option: Recordable) => {
  showPercentage.value = true
  percentage.value = 0

  const mergeOption = {
    ...option,
    onProgress: (percentageNumber: number) => {
      props.progressEvent && props.progressEvent(percentageNumber)
      percentage.value = percentageNumber
    },
  }

  if (props.multiple === 1) {
    imageUrls.value = []
  }
  props.uploadRequest(mergeOption)
}

function closePic(i: number) {
  imageUrls.value.splice(i, 1)
  if (props.multiple > 1) {
    emit('update:modelValue', imageUrls.value)
  } else {
    emit('update:modelValue', '')
  }
}

function onUploadInput(v) {
  emit('update:modelValue', v)
}

</script>

<style lang="less">
.pic-upload-container {
  flex: 1;

  .el-upload-list {
    display: none;
  }

  .preview-container {
    flex-wrap: wrap;
    width: 100%;
    margin-bottom: 10px;
    justify-content: flex-start;
  }

  .preview-pic {
    // max-width: 100%;
    width: 150px;
    height: 150px;
    border: 1px solid #ddd;
    margin-right: 10px;
    position: relative;
    cursor: pointer;

    :deep(.el-image) {
      max-width: 100%;
      max-height: 100%;
    }

    >img {
      max-width: 100%;
      max-height: 100%;
    }

    .close-btn {
      position: absolute;
      width: 20px;
      height: 20px;
      font-size: 16px;
      text-align: center;
      border-radius: 50%;
      background: rgba(0, 0, 0, 0.6);
      color: #fff;
      right: 10px;
      top: 10px;
    }
  }
}
</style>
