import type { Component, Ref } from 'vue'

export type FormComponentType =
  | 'Text'
  | 'Input' // 输入
  | 'NumberInput'
  | 'ArrayInput'
  | 'InputNumber'
  | 'Select' // 下拉
  | 'RadioSelect'
  | 'Checkbox'
  | 'DateTimePicker' // 时间、日期
  | 'DatePicker'
  | 'DateRangePicker'
  | 'TimePicker'
  | 'Switch' // 其他
  | 'Code'
  | 'Custom'
  | 'ImageUpload'
  | 'Cascader'
  | 'CascaderPanel'
  | 'FullText'
  | 'SimpleFullText'
  | 'FileUpload'
  | 'JsonEditor'
  | 'JsonEditorPop'

interface Grid {
  span?: number
  xs?: number
  sm?: number
  md?: number
  lg?: number
  xl?: number
}

interface FormRule {
  required?: boolean
  message?: string
  validator?: Fn
  trigger?: 'blur' | 'change'
}

export interface FormSchema {
  prop: string
  label?: string
  rules?: FormRule[]
  required?: boolean
  component: FormComponentType
  labelWidth?: string
  /** 删格 */
  grid?: Grid
  componentProps?: Recordable
  tips?: string
}

export type FormComponentMap = {
  [key in FormComponentType]?: Component
}

export interface FormProps {
  width?: string
  labelWidth?: string
  schemas: FormSchema[] | FormSchema[][] | SubsectionSchema[] | Ref
  formData?: Recordable | Ref<Recordable>
  okMethod?: PromiseFn
  okText?: string
  cancelText?: string
  cancelMethod?: Fn
  openType?: 'dialog' | 'drawer'
  beforeSubmit?: Fn
  grid?: Grid
  // cancel时是否开启校验
  cancelValidate?: Boolean
}

export interface SubsectionSchema {
  title?: string
  schemas: FormSchema[] | FormSchema[][]
}

export type SelectOption = { label: string; value: any }
