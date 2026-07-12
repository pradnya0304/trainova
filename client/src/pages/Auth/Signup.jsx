import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import authService from '../../services/authService'
import './Login.css'

const Signup = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const data = await authService.register(form.name, form.email, form.password)
      login(data, data.token)
      toast.success('Account created! Welcome to Trainova.')
      navigate('/profile')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <h1 className="auth-logo">Trainova</h1>
          <p className="auth-tagline">Join thousands who are already training smarter</p>
        </div>
        <div className="auth-features">
          <div className="auth-feature-item">
            <span className="auth-feature-icon">&#9670;</span>
            <span>Set your body type and goals</span>
          </div>
          <div className="auth-feature-item">
            <span className="auth-feature-icon">&#9670;</span>
            <span>Get a personalised plan in minutes</span>
          </div>
          <div className="auth-feature-item">
            <span className="auth-feature-icon">&#9670;</span>
            <span>Track everything in one place</span>
          </div>
          <div className="auth-feature-item">
            <span className="auth-feature-icon">&#9670;</span>
            <span>Chat with your AI coach anytime</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card animate-fade-in">
          <h2 className="auth-title">Create account</h2>
          <p className="auth-subtitle">Start your fitness journey today</p>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="Your name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Min 6 characters"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Create Account'}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup