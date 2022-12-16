<template>
  <div class="">
    dashboard page
    <svg-icon icon-class="bug"></svg-icon>
    <svg-icon
      icon-class="404"
      @click="sayHi"
      class-name="custom-class"
    ></svg-icon>
    缓存测试 <input type="text" />
    <el-button>按钮</el-button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({ name: "Dashboard" })
const { proxy } = getCurrentInstance()!
const sayHi = () => {
  proxy?.$message.success("恭喜你，这是一条成功消息")
}
</script>

<style lang="scss">
.custom-class {
  font-size: 200px;
  color: green;
}
</style>
