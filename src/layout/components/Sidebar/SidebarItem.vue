<template>
  <div class="sidebar-item-container" v-if="!item.meta || !item.meta.hidden">
    <!-- 如果有一个孩子，或者没孩子，或者有一个孩子但是被hidden了 -->
    <template v-if="!alwaysShowRootMenu && theOnlyOneChildRoute">
      <!-- 如果没有meta属性意味着不必渲染了 -->
      <sidebar-item-link
        :to="resolvePath(theOnlyOneChildRoute.path)"
        v-if="theOnlyOneChildRoute.meta"
      >
        <el-menu-item :index="resolvePath(theOnlyOneChildRoute.path)">
          <el-icon v-if="icon">
            <svg-icon class="menu-icon" :icon-class="icon"></svg-icon>
          </el-icon>
          <template #title>
            <span>{{ theOnlyOneChildRoute.meta?.title }}</span>
          </template>
        </el-menu-item>
      </sidebar-item-link>
    </template>
    <!-- 多个子路由时 -->
    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <el-icon v-if="item.meta?.icon">
          <svg-icon class="menu-icon" :icon-class="item.meta.icon"> </svg-icon>
        </el-icon>
        <span class="submenu-title">{{ item.meta?.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
      >
      </sidebar-item>
    </el-sub-menu>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue"
import type { RouteRecordRaw } from "vue-router"
import path from "path-browserify"
import { isExternal } from "@/utils/validate"
const props = defineProps({
  item: {
    type: Object as PropType<RouteRecordRaw>,
    required: true
  },
  basePath: {
    type: String,
    required: true
  }
})

const showingChildNumber = computed(() => {
  const children = (props.item.children || []).filter((child) => {
    if (child.meta && child.meta.hidden) return false
    return true
  })
  return children.length
})

const { item } = toRefs(props)
const theOnlyOneChildRoute = computed(() => {
  // 多个children时 直接return null 多children需要用el-submenu来渲染并递归
  if (showingChildNumber.value > 1) {
    return null
  }
  // 只有一个子路由 还要筛选路由meta里有无hidden属性 hidden：true则过滤出去 不用管
  // 路由meta里我们会配置hidden属性表示不渲染成菜单，比如login 401 404页面是不渲染成菜单的
  if (item.value.children) {
    for (const child of item.value.children) {
      if (!child.meta || !child.meta.hidden) {
        return child
      }
    }
  }
  // showingChildNumber === 0 无可渲染的子路由 （可能有子路由 hidden属性为true）
  // 无可渲染chiildren时 把当前路由item作为仅有的子路由渲染
  return {
    ...props.item,
    path: "", // resolvePath避免resolve拼接时 拼接重复
    noShowingChildren: true // 无可渲染的children
  }
})

const icon = computed(() => {
  return (
    theOnlyOneChildRoute.value?.meta?.icon ||
    (props.item.meta && props.item.meta.icon)
  )
})

// 利用path.resolve 根据父路径+子路径 解析成正确路径 子路径可能是相对的
// resolvePath在模板中使用
const resolvePath = (childPath: string) => {
  if (isExternal(childPath)) {
    return childPath
  }
  return path.resolve(props.basePath, childPath)
}

const alwaysShowRootMenu = computed(
  () => props.item.meta && props.item.meta.alwaysShow
)
</script>
