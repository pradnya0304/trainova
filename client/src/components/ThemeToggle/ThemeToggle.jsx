import { FiSun, FiMoon } from 'react-icons/fi'
import useTheme from '../../hooks/useTheme'
import './ThemeToggle.css'

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <button className="theme-toggle" onClick={toggleTheme} title="Toggle theme">
      {theme === 'light' ? <FiMoon size={18} /> : <FiSun size={18} />}
    </button>
  )
}

export default ThemeToggle