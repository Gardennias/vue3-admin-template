<template>
  <el-config-provider :size="size" :locale="zhCn">
    <router-view></router-view>
  </el-config-provider>
</template>

<script setup lang="ts">
import { zhCn } from "element-plus/dist/locale/zh-cn.min.js"
import { storeToRefs } from "pinia"
import { useAppStore } from "./stores/app"
import { useGenerateTheme } from "@/hook/useGenerateTheme"

const store = useAppStore()
const { size } = storeToRefs(store)

useGenerateTheme()
</script>

<style>
</style>
