import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import AuthProvider from './context/AuthContext'
import ThemeProvider from './context/ThemeContext'
import UserProfileProvider from './context/UserProfileContext'
import './styles/globals.css'
import './styles/animations.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <UserProfileProvider>
          <App />
        </UserProfileProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
)