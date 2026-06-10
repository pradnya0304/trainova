import api from './api'

const getProgress = async () => {
  const res = await api.get('/progress')
  return res.data
}

const addProgress = async (entryData) => {
  const res = await api.post('/progress', entryData)
  return res.data
}

const deleteProgress = async (id) => {
  const res = await api.delete(`/progress/${id}`)
  return res.data
}

export default { getProgress, addProgress, deleteProgress }