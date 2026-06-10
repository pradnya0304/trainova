import { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import GoalBadge from '../../components/GoalBadge/GoalBadge'
import ProgressChart from '../../components/ProgressChart/ProgressChart'
import { Link } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'
import progressService from '../../services/progressService'
import workoutService from '../../services/workoutService'
import './Dashboard.css'

const Dashboard = () => {
  const { user } = useAuth()
  const [progressData, setProgressData] = useState([])
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [prog, work] = await Promise.all([
          progressService.getProgress(),
          workoutService.getWorkouts()
        ])
        setProgressData(prog.slice(0, 10).reverse())
        setWorkouts(work.slice(0, 3))
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="dashboard-page">
      <Navbar />
      <div className="dashboard-layout">
        <Sidebar />
        <main className="dashboard-main">

          <div className="dashboard-header animate-fade-in">
            <div>
              <h1 className="dashboard-title">Welcome back, {user?.name?.split(' ')[0]}</h1>
              <p className="dashboard-subtitle">Here is your fitness overview for today</p>
            </div>
            {user?.goal && <GoalBadge goal={user.goal} />}
          </div>

          <div className="dashboard-stats animate-fade-in">
            <div className="stat-card card">
              <p className="stat-label">Current Weight</p>
              <p className="stat-value">
                {progressData.length > 0
                  ? progressData[progressData.length - 1]?.weight
                  : user?.weight || '--'}
                <span> kg</span>
              </p>
            </div>
            <div className="stat-card card">
              <p className="stat-label">Body Type</p>
              <p className="stat-value capitalize">{user?.bodyType || '--'}</p>
            </div>
            <div className="stat-card card">
              <p className="stat-label">Activity Level</p>
              <p className="stat-value capitalize">{user?.activityLevel?.replace('_', ' ') || '--'}</p>
            </div>
            <div className="stat-card card">
              <p className="stat-label">Workouts Logged</p>
              <p className="stat-value">{workouts.length}</p>
            </div>
          </div>

          <div className="dashboard-grid">
            <div className="card animate-fade-in">
              <h3 className="card-section-title">Weight Progress</h3>
              <ProgressChart data={progressData} dataKey="weight" label="Weight (kg)" color="var(--accent-green)" />
            </div>

            <div className="card animate-fade-in">
              <div className="card-section-header">
                <h3 className="card-section-title">Recent Workouts</h3>
                <Link to="/workout" className="card-link">View all</Link>
              </div>
              {loading ? (
                <div className="spinner" style={{ margin: '20px auto' }}></div>
              ) : workouts.length === 0 ? (
                <div className="dashboard-empty">
                  <p>No workouts yet.</p>
                  <Link to="/workout" className="btn-primary" style={{ marginTop: '12px', display: 'inline-block' }}>Create Workout</Link>
                </div>
              ) : (
                <ul className="dashboard-workout-list">
                  {workouts.map(w => (
                    <li key={w._id} className="dashboard-workout-item">
                      <div>
                        <p className="dw-name">{w.name}</p>
                        <p className="dw-meta">{w.exercises?.length} exercises {w.day ? '· ' + w.day : ''}</p>
                      </div>
                      <span className="dw-badge badge badge-green">{w.goal?.replace('_', ' ') || 'general'}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <div className="dashboard-quick-links animate-fade-in">
            <h3 className="card-section-title" style={{ marginBottom: '16px' }}>Quick Access</h3>
            <div className="quick-links-grid">
              <Link to="/bmi" className="quick-link-card ql-blue">BMI Calculator</Link>
              <Link to="/nutrition" className="quick-link-card ql-yellow">Nutrition Plan</Link>
              <Link to="/exercises" className="quick-link-card ql-purple">Exercise Library</Link>
              <Link to="/progress" className="quick-link-card ql-peach">Log Progress</Link>
              <Link to="/recovery" className="quick-link-card ql-green">Recovery</Link>
              <Link to="/aicoach" className="quick-link-card ql-blue">AI Coach</Link>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default Dashboard