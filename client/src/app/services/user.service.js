import httpService from './http.service'
const userEndpoint = 'user/'

const userService = {
  get: async () => {
    const {data} = await httpService.get(userEndpoint)
    return data
  },
  updateName: async payload => {
    const {data} = await httpService.patch(userEndpoint, payload)
    return data
  },
  updateAvatar: async payload => {
    const {data} = await httpService.patch(userEndpoint, payload)
    return data
  },
  remove: async payload => {
    const {data} = await httpService.delete(userEndpoint, payload)
    return data
  }
}

export default userService