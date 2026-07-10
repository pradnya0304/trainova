import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

import Home from './pages/Home/Home'
import Login from './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard/Dashboard'
import Profile from './pages/Profile/Profile'
import BMI from './pages/BMI/BMI'
import Workout from './pages/Workout/Workout'
import ExerciseLibrary from './pages/ExerciseLibrary/ExerciseLibrary'
import Nutrition from './pages/Nutrition/Nutrition'
import Progress from './pages/Progress/Progress'
import Recovery from './pages/Recovery/Recovery'
import Supplements from './pages/Supplements/Supplements'
import Community from './pages/Community/Community'
import WorkoutSplit from './pages/WorkoutSplit/WorkoutSplit'
 import StreakTracker from './pages/StreakTracker/StreakTracker'
 import CalorieTracker from './pages/CalorieTracker/CalorieTracker'
 import PlatePlanner from './pages/PlatePlanner/PlatePlanner'


const App = () => {
  return (
    <BrowserRouter>
      <Toaster position="top-right" toastOptions={{
        style: {
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          fontSize: '14px'
        }
      }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/bmi" element={<ProtectedRoute><BMI /></ProtectedRoute>} />
        <Route path="/workout" element={<ProtectedRoute><Workout /></ProtectedRoute>} />
        <Route path="/exercises" element={<ProtectedRoute><ExerciseLibrary /></ProtectedRoute>} />
        <Route path="/nutrition" element={<ProtectedRoute><Nutrition /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute><Progress /></ProtectedRoute>} />
        <Route path="/recovery" element={<ProtectedRoute><Recovery /></ProtectedRoute>} />
        <Route path="/supplements" element={<ProtectedRoute><Supplements /></ProtectedRoute>} />
        <Route path="/community" element={<ProtectedRoute><Community /></ProtectedRoute>} />
        <Route path="/split" element={<ProtectedRoute><WorkoutSplit /></ProtectedRoute>} />
        <Route path="/calories" element={<ProtectedRoute><CalorieTracker /></ProtectedRoute>} />
        <Route path="/streak" element={<ProtectedRoute><StreakTracker /></ProtectedRoute>} />
        <Route path="/plate" element={<ProtectedRoute><PlatePlanner /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App