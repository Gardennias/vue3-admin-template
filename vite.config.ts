import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import {ElementPlusResolver} from "unplugin-vue-components/resolvers"
import ElementPlus from "unplugin-element-plus/vite"
import DefineOptions from "unplugin-vue-define-options/vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/vue3-admin-template/' : '/', // 服务器二级目录 写法
  // base: process.env.NODE_ENV === 'production' ? './' : '/', // 服务器一级目录 写法
  server: { // 后台接口服务器配置
    proxy: {
      "/dev-api": {
        target: "http://localhost:3000",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev-api/,"api")
      }
    }
  },
  resolve: {
    alias: [
      {
        find: "@",
        replacement: path.resolve(__dirname,"src"),
      }
    ]
  },
  plugins: [
    vue(),
    DefineOptions(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")], // icon存放的目录
      symbolId: "icon-[name]",
      inject: "body-last", // 插入位置
      customDomId: "__svg__icons__dom__" //svg id
    }),
    // 自动导入
    AutoImport({
      imports: ["vue", "vue-router"],
      resolvers: [ElementPlusResolver()],
      eslintrc: { enabled: false }, // 改成true生成一次后禁用即可
      dts: "src/auto-import.d.ts"
    }),
    Components({
      // 默认只针对src/components目录实现自动导入
      dirs: ["src/components", "src/layout/components"], // 后面布局组件也有相关的组件期望自动导入
      dts: "src/components.d.ts",
      resolvers: [ElementPlusResolver()] // 生成的组件的类型放到这里
    }),
    ElementPlus()
  ]
})
