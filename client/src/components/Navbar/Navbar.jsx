import { Link, useNavigate, useLocation } from 'react-router-dom'
import { FiMenu, FiX, FiLogOut, FiUser, FiChevronDown } from 'react-icons/fi'
import { useState, useRef, useEffect } from 'react'
import useAuth from '../../hooks/useAuth'
import ThemeToggle from '../ThemeToggle/ThemeToggle'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
    setDropdownOpen(false)
  }

  const mobileLinks = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Workout', path: '/workout' },
    { label: 'Nutrition', path: '/nutrition' },
    { label: 'Progress', path: '/progress' },
    { label: 'AI Coach', path: '/aicoach' },
    { label: 'BMI & Stats', path: '/bmi' },
    { label: 'Exercises', path: '/exercises' },
    { label: 'Recovery', path: '/recovery' },
    { label: 'Supplements', path: '/supplements' }
  ]

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="navbar">
      <div className="navbar-container">

        <Link to="/" className="navbar-logo">
          Trainova
        </Link>

        <div className="navbar-right">
          <ThemeToggle />

          {user ? (
            <div className="navbar-user" ref={dropdownRef}>
              <button className="navbar-avatar-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                <FiUser size={15} />
                <span>{user.name?.split(' ')[0]}</span>
                <FiChevronDown size={14} />
              </button>

              {dropdownOpen && (
                <div className="navbar-dropdown animate-slide-down">
                  <div className="dropdown-user-info">
                    <p className="dropdown-name">{user.name}</p>
                    <p className="dropdown-email">{user.email}</p>
                  </div>
                  <div className="dropdown-divider"></div>
                  <Link to="/profile" className="dropdown-item" onClick={() => setDropdownOpen(false)}>
                    <FiUser size={15} />
                    Profile
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    <FiLogOut size={15} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar-auth">
              <Link to="/login" className="btn-secondary">Login</Link>
              <Link to="/signup" className="btn-primary">Sign Up</Link>
            </div>
          )}

          <button className="navbar-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

      </div>

      {menuOpen && (
        <div className="navbar-mobile-menu animate-slide-down">
          {user && mobileLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className="mobile-link"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          {user ? (
            <>
              <Link to="/profile" className="mobile-link" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button className="mobile-logout" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <div className="mobile-auth">
              <Link to="/login" className="btn-secondary" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/signup" className="btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar