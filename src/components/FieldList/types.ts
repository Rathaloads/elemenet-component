
import { VNode, CreateElement } from 'vue'

interface RenderFunction<T = any> {
  (h: CreateElement, params: T): VNode
}

export interface IField {
  prop: string,
  label: string,
  render?: RenderFunction,
  solt?: Boolean
}

export type tFieldListData<T> = {
  [P in keyof T]: T[P]
}