import { createContext, useState, useEffect } from 'react'
import api from '../services/api'
import useAuth from '../hooks/useAuth'

export const UserProfileContext = createContext()

const UserProfileProvider = ({ children }) => {
  const { user } = useAuth()
  const [profile, setProfile] = useState(null)
  const [profileLoading, setProfileLoading] = useState(true)

  useEffect(() => {
    if (user) {
      api.get('/user/profile')
        .then(res => setProfile(res.data))
        .catch(err => console.log(err))
        .finally(() => setProfileLoading(false))
    } else {
      setProfile(null)
      setProfileLoading(false)
    }
  }, [user])

  const updateProfile = (updatedData) => {
    setProfile(prev => ({ ...prev, ...updatedData }))
  }

  return (
    <UserProfileContext.Provider value={{ profile, profileLoading, updateProfile }}>
      {children}
    </UserProfileContext.Provider>
  )
}

export default UserProfileProvider