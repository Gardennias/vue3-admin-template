<template>
  <div>
    <el-menu
      mode="vertical"
      class="sidebar-container-menu"
      :default-active="activeMenu"
      :text-color="scssVariables.menuText"
      :active-text-color="scssVariables.menuActiveText"
      :background-color="scssVariables.menuBg"
      :collapse="sidebar.opened"
      :collapse-transition="true"
    >
      <sidebar-item
        v-for="route in menuRoutes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      ></sidebar-item>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import scssVariables from "@/styles/variables.module.scss"
import { routes } from "@/router"

import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
const store = useAppStore()
const { sidebar } = storeToRefs(store)

const menuRoutes = computed(() => routes)
const route = useRoute()
const activeMenu = computed(() => {
  const { path, meta } = route
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
})
</script>
