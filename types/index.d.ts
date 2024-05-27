declare type Fn<T = any, R = T> = (...arg: T[]) => R

declare type PromiseFn<T = any, R = T> = (...arg: T[]) => Promise<R>

declare type Nullable<T> = T | null
declare type Recordable<T = any> = Record<string, T>
declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
declare type TimeoutHandle = ReturnType<typeof setTimeout>
declare type IntervalHandle = ReturnType<typeof setInterval>

declare interface ChangeEvent extends Event {
  target: HTMLInputElement
}

declare interface WheelEvent {
  path?: EventTarget[]
}

declare function parseInt(s: string | number, radix?: number): number

declare function parseFloat(string: string | number): number

declare type RefType<T> = T | null

declare type LabelValueOptions = {
  label: string
  value: any
}[]

declare type EmitType = (event: string, ...args: any[]) => void

declare type TargetContext = '_self' | '_blank'

declare interface ComponentElRef<T extends HTMLElement = HTMLDivElement> {
  $el: T
}

declare type ComponentRef<T extends HTMLElement = HTMLDivElement> = ComponentElRef<T> | null

declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
