/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module "element-plus/dist/locale/zh-cn.min.js"

declare module "css-color-function" {
  export function convert(color: string): string
}