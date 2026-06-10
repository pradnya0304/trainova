import api from './api'

const register = async (name, email, password) => {
  const res = await api.post('/auth/register', { name, email, password })
  return res.data
}

const login = async (email, password) => {
  const res = await api.post('/auth/login', { email, password })
  return res.data
}

const getMe = async () => {
  const res = await api.get('/auth/me')
  return res.data
}

export default { register, login, getMe }