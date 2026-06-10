import { Link, useLocation } from 'react-router-dom'
import {
  FiGrid, FiUser, FiActivity, FiBook,
  FiPieChart, FiTrendingUp, FiHeart,
  FiPackage, FiUsers, FiMessageSquare
} from 'react-icons/fi'
import './Sidebar.css'

const Sidebar = () => {
  const location = useLocation()

  const links = [
    { label: 'Dashboard', path: '/dashboard', icon: <FiGrid size={18} /> },
    { label: 'Profile', path: '/profile', icon: <FiUser size={18} /> },
    { label: 'BMI & Stats', path: '/bmi', icon: <FiActivity size={18} /> },
    { label: 'Workout', path: '/workout', icon: <FiBook size={18} /> },
    { label: 'Exercises', path: '/exercises', icon: <FiHeart size={18} /> },
    { label: 'Nutrition', path: '/nutrition', icon: <FiPieChart size={18} /> },
    { label: 'Progress', path: '/progress', icon: <FiTrendingUp size={18} /> },
    { label: 'Recovery', path: '/recovery', icon: <FiHeart size={18} /> },
    { label: 'Supplements', path: '/supplements', icon: <FiPackage size={18} /> },
    { label: 'Community', path: '/community', icon: <FiUsers size={18} /> },
    { label: 'AI Coach', path: '/aicoach', icon: <FiMessageSquare size={18} /> }
  ]

  const isActive = (path) => location.pathname === path

  return (
    <aside className="sidebar">
      <ul className="sidebar-links">
        {links.map(link => (
          <li key={link.path}>
            <Link
              to={link.path}
              className={`sidebar-link ${isActive(link.path) ? 'active' : ''}`}
            >
              <span className="sidebar-icon">{link.icon}</span>
              <span className="sidebar-label">{link.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}

export default Sidebar