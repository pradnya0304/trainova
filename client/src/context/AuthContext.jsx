import { createContext, useState, useEffect } from 'react'
import api from '../services/api'

export const AuthContext = createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('trainova-token')
    if (token) {
      api.get('/auth/me')
        .then(res => setUser(res.data))
        .catch(() => localStorage.removeItem('trainova-token'))
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const login = (userData, token) => {
    localStorage.setItem('trainova-token', token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem('trainova-token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider