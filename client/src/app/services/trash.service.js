import httpService from './http.service'
const trashEndpoint = 'trash/'

const trashService = {
  get: async () => {
    const {data} = await httpService.get(trashEndpoint)
    return data
  },
  create: async payload => {
    const {data} = await httpService.post(trashEndpoint, payload)
    return data
  },
  remove: async noteId => {
    const {data} = await httpService.delete(trashEndpoint + noteId)
    return data
  },
  removeAll: async () => {
    const {data} = await httpService.delete(trashEndpoint)
    return data
  }
}

export default trashService