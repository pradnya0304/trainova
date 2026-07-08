import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import BodyTypeCard from '../../components/BodyTypeCard/BodyTypeCard'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import api from '../../services/api'
import './Profile.css'

const Profile = () => {
  const { user, login, refreshUser } = useAuth()
  const [form, setForm] = useState({
    name: '', age: '', height: '', weight: '',
    gender: '', bodyType: '', goal: '', activityLevel: ''
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        age: user.age || '',
        height: user.height || '',
        weight: user.weight || '',
        gender: user.gender || '',
        bodyType: user.bodyType || '',
        goal: user.goal || '',
        activityLevel: user.activityLevel || ''
      })
    }
  }, [user])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleBodyType = (type) => {
    setForm({ ...form, bodyType: type })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.put('/user/profile', form)
      await refreshUser()
      toast.success('Profile updated!')
    } catch (err) {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="profile-page">
      <Navbar />
      <div className="profile-layout">
        <Sidebar />
        <main className="profile-main">

          <div className="profile-header animate-fade-in">
            <h1 className="section-title">Your Profile</h1>
            <p className="section-subtitle">Set your body details so Trainova can personalise everything for you</p>
          </div>

          <form onSubmit={handleSubmit} className="profile-form animate-fade-in">

            <div className="card profile-section">
              <h3 className="profile-section-title">Basic Info</h3>
              <div className="profile-grid">
                <div className="form-group">
                  <label>Full Name</label>
                  <input name="name" value={form.name} onChange={handleChange} placeholder="Your name" />
                </div>
                <div className="form-group">
                  <label>Age</label>
                  <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="Years" />
                </div>
                <div className="form-group">
                  <label>Height (cm)</label>
                  <input name="height" type="number" value={form.height} onChange={handleChange} placeholder="cm" />
                </div>
                <div className="form-group">
                  <label>Weight (kg)</label>
                  <input name="weight" type="number" value={form.weight} onChange={handleChange} placeholder="kg" />
                </div>
                <div className="form-group">
                  <label>Gender</label>
                  <select name="gender" value={form.gender} onChange={handleChange}>
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Activity Level</label>
                  <select name="activityLevel" value={form.activityLevel} onChange={handleChange}>
                    <option value="">Select activity level</option>
                    <option value="sedentary">Sedentary (little or no exercise)</option>
                    <option value="light">Light (1-3 days/week)</option>
                    <option value="moderate">Moderate (3-5 days/week)</option>
                    <option value="active">Active (6-7 days/week)</option>
                    <option value="very_active">Very Active (twice a day)</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="card profile-section">
              <h3 className="profile-section-title">Your Goal</h3>
              <div className="goals-grid">
                {['muscle_gain', 'fat_loss', 'recomp', 'endurance', 'mobility'].map(g => (
                  <button
                    key={g}
                    type="button"
                    className={`goal-btn ${form.goal === g ? 'active' : ''}`}
                    onClick={() => setForm({ ...form, goal: g })}
                  >
                    {g.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            <div className="card profile-section">
              <h3 className="profile-section-title">Your Body Type</h3>
              <p className="profile-section-desc">Select the body type that best describes you</p>
              <div className="body-types-grid-profile">
                {['ectomorph', 'mesomorph', 'endomorph'].map(bt => (
                  <BodyTypeCard
                    key={bt}
                    bodyType={bt}
                    selected={form.bodyType === bt}
                    onClick={handleBodyType}
                  />
                ))}
              </div>
            </div>

            <button type="submit" className="btn-primary profile-save-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Save Profile'}
            </button>

          </form>
        </main>
      </div>
    </div>
  )
}

export default Profile