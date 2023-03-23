import httpService from './http.service'
import {getUserId} from './localStorage.service'
const noteEndpoint = 'note/'

const noteService = {
  get: async () => {
    const {data} = await httpService.get(noteEndpoint)
    return data
  },
  create: async payload => {
    const {data} = await httpService.post(noteEndpoint, payload)
    return data
  },
  getCurrentUser: async () => {
    const {data} = await httpService.get(noteEndpoint + getUserId())
    return data
  },
  update: async ({id, newNote, header}) => {
    await httpService.patch(noteEndpoint + id, {newNote, header})
    return {id, newNote, header}
  },
  updateStatus: async payload => {
    const {data} = await httpService.patch(
      noteEndpoint + payload.note.id,
      {'favoritesStatus': payload.status}
    )
    return data
  },
  remove: async noteId => {
    const {data} = await httpService.delete(noteEndpoint + noteId)
    return data
  }
}

export default noteService