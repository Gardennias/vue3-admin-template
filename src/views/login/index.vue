<template>
  <div class="login-container">
    <el-form :model="loginForm" :rules="loginRules" ref="loginFormRef" class="login-form">
      <div class="admin-logo">
        <img class="logo" src="../../assets/vue.svg" alt="logo" />
        <h1>Vue3 Admin</h1>
      </div>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" placeholder="请输入用户名">
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-class="user"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password" tabindex="2" placeholder="请输入密码" autocomplete="off" show-password>
          <template #prepend>
            <span class="svg-container">
              <svg-icon icon-class="password"></svg-icon>
            </span>
          </template>
        </el-input>
      </el-form-item>
      <el-button type="primary" style="width:100%;margin-bottom: 30px;" :loading="loading" @click="handleLogin">LOGIN</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance } from 'element-plus';
import { useUserStore } from "@/stores/user";

const loading = ref(false)
const loginFormRef = ref<FormInstance | null>(null);
const usernameRef = ref<HTMLInputElement | null>(null);
const passwordRef = ref<HTMLInputElement | null>(null);

const loginState = reactive({
  loginForm: {
    username: "",
    password: "",
  },
  loginRules: {
    username: [
      {
        required: true,
        trigger: "blur",
        message: "请输入用户名！"
      }
    ],
    password: [
      {
        required: true,
        trigger: "blur",
        message: "请输入密码"
      }
    ]
  }
})

// 处理登录逻辑
const userStore = useUserStore()
const router = useRouter()

const handleLogin = () => {
  loginFormRef.value?.validate(async (valid) => {
    if(valid) {
      loading.value = true
      try {
        // await userStore.login(loginState.loginForm)
        router.push({path: "/"})
      } finally {
        loading.value = false
      }
    } else {
      console.error("error submit")
    }
  })
}

// 解构
const { loginForm, loginRules } = toRefs(loginState);

// 自动获取焦点
onMounted(() => {
  if (loginState.loginForm.username === "") {
    usernameRef.value?.focus();
  } else if (loginState) {
    passwordRef.value?.focus();
  }
})

</script>

<style lang="scss">
$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

.login-container {
  .el-form-item {
    .el-input {
      height: 40px;
    }
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  background-repeat: no-repeat;
  background-position: 50%;
  background-size: 100%;

  .login-form {
    position: relative;
    width: 500px;
    max-width: 100%;
    margin: 0 auto;
    padding: 140px 35px 0;
    overflow: hidden;
    box-sizing: border-box;

    .admin-logo {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 20px;

      .logo {
        width: 60px;
        height: 60px;
      }

      .name {
        font-weight: normal;
        margin-left: 10px;
      }
    }
  }
}
</style>
