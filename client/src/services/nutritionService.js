import api from './api'

const getNutrition = async () => {
  const res = await api.get('/nutrition')
  return res.data
}

const saveNutrition = async (nutritionData) => {
  const res = await api.post('/nutrition', nutritionData)
  return res.data
}

export default { getNutrition, saveNutrition }