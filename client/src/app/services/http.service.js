import axios from 'axios'
import configFile from '../config.json'
import localStorageService from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
  baseURL: configFile.apiEndpoint
})

http.interceptors.request.use(async config => {
    const expiresDate = localStorageService.getTokenExpiresDate()
    const refreshToken = localStorageService.getRefreshToken()
    const isExpired = refreshToken && expiresDate < Date.now()

    if (isExpired) {
      const data = await authService.refresh()
      localStorageService.setTokens(data)
    }

    const accessToken = localStorageService.getAccessToken()

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`
      }
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(res => {
    res.data = {content: res.data}
    return res
  },
  function (error) {
    const expectedErrors = error.response &&
      error.response.status >= 400 &&
      error.response.status < 500

    if (!expectedErrors) {
      console.log(error.message)
      console.log(error.response.data.message)
    }
    return Promise.reject(error)
  }
)

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  patch: http.patch,
  delete: http.delete
}

export default httpService