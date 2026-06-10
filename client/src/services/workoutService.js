import api from './api'

const getWorkouts = async () => {
  const res = await api.get('/workout')
  return res.data
}

const createWorkout = async (workoutData) => {
  const res = await api.post('/workout', workoutData)
  return res.data
}

const updateWorkout = async (id, workoutData) => {
  const res = await api.put(`/workout/${id}`, workoutData)
  return res.data
}

const deleteWorkout = async (id) => {
  const res = await api.delete(`/workout/${id}`)
  return res.data
}

export default { getWorkouts, createWorkout, updateWorkout, deleteWorkout }