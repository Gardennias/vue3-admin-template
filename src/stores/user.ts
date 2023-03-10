import { defineStore } from "pinia"
import { login as loginApi } from "@/api/config/user"
import { removeToken, setToken } from "@/utils/auth"

export interface IUserInfo {
  username: string
  password: string
}

export const useUserStore = defineStore("user", () => {
  const state = reactive({
    token: ""
  })
  const login = async (userInfo: IUserInfo) => {
    try {
      const { username, password } = userInfo
      const response = await loginApi({ username: username.trim(), password })
      const { data } = response
      state.token = data.token
      setToken(data.token)
    } catch (e) {
      return Promise.reject(e)
    }
  }
  const resetToken = () => {
    state.token = ""
    removeToken()
  }
  return { state, login, resetToken }
})
