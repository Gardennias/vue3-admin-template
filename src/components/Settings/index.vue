<template>
  <div class="drawer-container">
    <div class="drawer-item">
      <span>主题色</span>
      <theme-picker/>
    </div>
    <div class="drawer-container">
      <span>Open Tag-View</span>
      <el-switch v-model="tagsView" class="drawer-switch"></el-switch>
    </div>
    <div class="drawer-item">
      <span>Sidebar Logo</span>
      <el-switch v-model="showSidebarLogo" class="drawer-switch"></el-switch>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '@/stores/setting';

const settingsStore = useSettingsStore()
const tagsView = computed({
  get() {
    return settingsStore.settings.tagsView
  },
  set(val){
    settingsStore.changeSetting({
      key: "tagsView",
      value: val
    })
  }
})

const showSidebarLogo = computed({
  get() {
    return settingsStore.settings.sidebarLogo
  },
  set(val) {
    settingsStore.changeSetting({
      key: "sidebarLogo",
      value: val
    })
  }
})
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;
  .drawer-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    font-size: 16px;
    color: rgba(0, 0, 0, 0.65);
  }
}
</style>