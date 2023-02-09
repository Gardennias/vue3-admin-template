<template>
  <div class="sidebar-wrapper">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <scroll-panel>
      <el-menu
        mode="vertical"
        class="sidebar-container-menu"
        :default-active="activeMenu"
        :text-color="scssVariables.menuText"
        :active-text-color="themeColor"
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
    </scroll-panel>
  </div>
</template>

<script setup lang="ts">
import scssVariables from "@/styles/variables.module.scss"
import { routes } from "@/router"
import { useAppStore } from "@/stores/app"
import { storeToRefs } from "pinia"
import { useSettingsStore } from "@/stores/setting"

// 是否显示logo
const showLogo = computed(() => settingStore.settings.sidebarLogo)
// 展开收起状态 稍后放store 当前是展开就让它收起
const isCollapse = computed(() => store.sidebar.opened)

const logoHeight = computed(() => (showLogo.value ? 50 : 0) + "px")

// 获取主题色
const settingStore = useSettingsStore()
const themeColor = computed(() => settingStore.settings.theme)

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

<style lang="scss" scoped>
.sidebar-wrapper {
  .sidebar-container-menu {
    height: calc(100vh - v-bind(logoHeight));
  }
}
</style>
