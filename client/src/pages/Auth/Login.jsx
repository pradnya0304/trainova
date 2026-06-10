import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import authService from '../../services/authService'
import './Login.css'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const data = await authService.login(form.email, form.password)
      login(data, data.token)
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-brand">
          <h1 className="auth-logo">Trainova</h1>
          <p className="auth-tagline">Your complete health and fitness companion</p>
        </div>
        <div className="auth-features">
          <div className="auth-feature-item">
            <span className="auth-feature-icon">&#9670;</span>
            <span>Personalised workout plans</span>
          </div>
          <div className="auth-feature-item">
            <span className="auth-feature-icon">&#9670;</span>
            <span>Smart nutrition tracking</span>
          </div>
          <div className="auth-feature-item">
            <span className="auth-feature-icon">&#9670;</span>
            <span>AI powered coaching</span>
          </div>
          <div className="auth-feature-item">
            <span className="auth-feature-icon">&#9670;</span>
            <span>Body type based training</span>
          </div>
        </div>
      </div>

      <div className="auth-right">
        <div className="auth-card animate-fade-in">
          <h2 className="auth-title">Welcome back</h2>
          <p className="auth-subtitle">Log in to continue your journey</p>

          <form onSubmit={handleSubmit} className="auth-form">
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
                placeholder="Enter your password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn-primary auth-btn" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Log In'}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login