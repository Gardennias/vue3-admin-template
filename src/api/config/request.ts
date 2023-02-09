import axios, { AxiosHeaders } from "axios"
import { getToken } from "@/utils/auth"
import { ElMessage } from "element-plus"

const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 100000
})

service.interceptors.request.use((config) => {
  const token = getToken()
  if (token) {
    // v1.2.2 axios bug
    ;(config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`)
    // config.headers!.Authorization = `Bearer ${token}`
  }
  return config
})

service.interceptors.response.use((response) => {
  const { code, message } = response.data
  if (code !== 0) {
    ElMessage.error(message)
    return Promise.reject(message)
  }
  return response.data
})
export default service
