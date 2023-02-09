<template>
  <div class="app-wrapper">
    <div class="sidebar-container">
      <sidebar></sidebar>
    </div>
    <div class="main-container">
      <div class="header">
        <navbar @show-setting="openSetting" class="navbar"></navbar>
        <tags-view v-if="showTagsView" class="tags-view"></tags-view>
      </div>
      <app-main></app-main>
    </div>
    <right-panel
      v-model="showSetting"
      title="样式风格设置"
      :size="settingsPanelWidth"
    >
      <settings />
    </right-panel>
  </div>
</template>

<script lang="ts" setup>
import varibles from "@/styles/variables.module.scss"
import { useSettingsStore } from "@/stores/setting"

const settingsStore = useSettingsStore()
const showTagsView = computed(() => settingsStore.settings.tagsView)

const showSetting = ref(false)
const openSetting = () => {
  showSetting.value = true
}

const otherHeight = computed(() => (showSetting.value ? 84 : "") + "px")

const settingsPanelWidth = computed(() => varibles.settingPanelWidth)
</script>

<style lang="scss" scoped>
.app-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  .main-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    .header {
      .navbar {
        height: 50px;
      }
      .tags-view {
        height: 34px;
      }
    }
    .app-main {
      /* main = 100% - navbar + tagsview */
      min-height: calc(100vh - v-bind(otherHeight));
      background: #fff;
    }
  }
}
</style>
