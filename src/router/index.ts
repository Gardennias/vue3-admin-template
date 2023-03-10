import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"
import Layout from "@/layout/index.vue"

// 看做是异步路由
export const asyncRoutes: Array<RouteRecordRaw> = [
  {
    path: "/documentation",
    component: Layout, // 布局组件作为一级路由
    redirect: "/documentation/index",
    children: [
      {
        path: "index",
        name: "Documentation",
        component: () =>
          import(
            /* webpackChunkName: "documentation" */ "@/views/documentation/index.vue"
          ),
        meta: {
          title: "Documentation",
          icon: "documentation"
        }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        name: "Guide",
        component: () =>
          import(/* webpackChunkName: "guide" */ "@/views/guide/index.vue"),
        meta: {
          title: "Guide",
          icon: "guide"
          // 默认加载Guide时，/documentation/index高亮显示
          // activeMenu: "/documentation/index"
        }
      }
    ]
  },
  {
    path: "/system",
    component: Layout,
    redirect: "/system/user",
    meta: { title: "System", icon: "lock", alwaysShow: true },
    children: [
      {
        path: "menu",
        name: "Menu Management",
        component: () => import("@/views/system/menu.vue"),
        meta: { title: "Menu Management", icon: "list" }
      },
      {
        path: "role",
        name: "Role Management",
        component: () => import("@/views/system/role.vue"),
        meta: { title: "Role Management", icon: "list" }
      },
      {
        path: "user",
        name: "User Management",
        component: () =>
          import(/* webpackChunkName: "user" */ "@/views/system/user.vue"),
        meta: {
          title: "User Management",
          icon: "list"
        }
      }
    ]
  },
  {
    // 外链路由
    path: "/external-link",
    component: Layout,
    children: [
      {
        path: "http://www.baidu.com/",
        redirect: "/",
        meta: {
          title: "External Link",
          icon: "link"
        }
      }
    ]
  }
]

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        meta: {
          title: "Dashboard",
          icon: "dashboard",
          affix: true,
          noCache: true
        }
      }
    ]
  },
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        // 带参数的动态路由正则匹配 文档说明
        // https://next.router.vuejs.org/zh/guide/essentials/route-matching-syntax.html#%E5%8F%AF%E9%87%8D%E5%A4%8D%E7%9A%84%E5%8F%82%E6%95%B0
        path: "/redirect/:path(.*)", // 要匹配多级路由 应该加*号
        component: () => import("@/views/redirect/index.vue")
      }
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    meta: { hidden: true },
    redirect: "/404"
  },
  {
    path: "/404",
    meta: { hidden: true },
    component: () => import("@/views/error-page/404.vue")
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/login/index.vue")
  }
]

export const routes = [...constantRoutes, ...asyncRoutes]

export default createRouter({
  history: createWebHashHistory(), // 发布到服务器 使用hash模式
  routes
})
