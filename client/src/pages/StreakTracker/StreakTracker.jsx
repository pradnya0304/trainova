import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import workoutService from '../../services/workoutService'
import progressService from '../../services/progressService'
import './StreakTracker.css'

const StreakTracker = () => {
  const [workouts, setWorkouts] = useState([])
  const [progressEntries, setProgressEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [hoveredDay, setHoveredDay] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [w, p] = await Promise.all([
          workoutService.getWorkouts(),
          progressService.getProgress()
        ])
        setWorkouts(w)
        setProgressEntries(p)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const generateGrid = () => {
    const today = new Date()
    const days = []

    for (let i = 363; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(today.getDate() - i)
      days.push(date)
    }

    return days
  }

  const getActivityDates = () => {
    const dates = new Set()

    workouts.forEach(w => {
      const d = new Date(w.createdAt)
      dates.add(d.toDateString())
    })

    progressEntries.forEach(p => {
      const d = new Date(p.date)
      dates.add(d.toDateString())
    })

    return dates
  }

  const days = generateGrid()
  const activityDates = getActivityDates()

  const weeks = []
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }

  const months = []
  let lastMonth = null
  weeks.forEach((week, i) => {
    const firstDay = week[0]
    const month = firstDay.toLocaleString('default', { month: 'short' })
    if (month !== lastMonth) {
      months.push({ label: month, index: i })
      lastMonth = month
    }
  })

  const totalActive = activityDates.size

  const currentStreak = (() => {
    let streak = 0
    const today = new Date()
    for (let i = 0; i < 365; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      if (activityDates.has(d.toDateString())) {
        streak++
      } else if (i > 0) {
        break
      }
    }
    return streak
  })()

  const longestStreak = (() => {
    let max = 0
    let current = 0
    days.forEach(d => {
      if (activityDates.has(d.toDateString())) {
        current++
        max = Math.max(max, current)
      } else {
        current = 0
      }
    })
    return max
  })()

  const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="streak-page">
      <Navbar />
      <div className="streak-layout">
        <Sidebar />
        <main className="streak-main">

          <div className="animate-fade-in">
            <h1 className="section-title">Workout Streak Tracker</h1>
            <p className="section-subtitle">Every day you log a workout or progress entry counts as an active day. Keep the streak alive.</p>
          </div>

          <div className="streak-stats animate-fade-in">
            <div className="card streak-stat-card">
              <p className="stat-label">Current Streak</p>
              <p className="streak-stat-value" style={{ color: 'var(--accent-green)' }}>{currentStreak}</p>
              <p className="streak-stat-unit">days</p>
            </div>
            <div className="card streak-stat-card">
              <p className="stat-label">Longest Streak</p>
              <p className="streak-stat-value" style={{ color: 'var(--accent-blue)' }}>{longestStreak}</p>
              <p className="streak-stat-unit">days</p>
            </div>
            <div className="card streak-stat-card">
              <p className="stat-label">Total Active Days</p>
              <p className="streak-stat-value" style={{ color: 'var(--accent-purple)' }}>{totalActive}</p>
              <p className="streak-stat-unit">this year</p>
            </div>
            <div className="card streak-stat-card">
              <p className="stat-label">Consistency</p>
              <p className="streak-stat-value" style={{ color: 'var(--accent-yellow)' }}>
                {Math.round((totalActive / 364) * 100)}
              </p>
              <p className="streak-stat-unit">% of year</p>
            </div>
          </div>

          {loading ? (
            <div className="spinner" style={{ margin: '40px auto' }}></div>
          ) : (
            <div className="card streak-grid-card animate-fade-in">
              <div className="streak-grid-header">
                <h3 className="card-section-title">Activity Grid — Last 52 Weeks</h3>
                <div className="streak-legend">
                  <span className="legend-text">Less</span>
                  <div className="legend-boxes">
                    <div className="legend-box empty"></div>
                    <div className="legend-box level1"></div>
                    <div className="legend-box level2"></div>
                  </div>
                  <span className="legend-text">More</span>
                </div>
              </div>

              <div className="streak-grid-wrap">
                <div className="streak-day-labels">
                  {dayLabels.map((d, i) => (
                    <span key={i} className="streak-day-label">{i % 2 === 1 ? d : ''}</span>
                  ))}
                </div>

                <div className="streak-grid-scroll">
                  <div className="streak-month-labels">
                    {months.map((m, i) => (
                      <span
                        key={i}
                        className="streak-month-label"
                        style={{ left: `${m.index * 16}px` }}
                      >
                        {m.label}
                      </span>
                    ))}
                  </div>

                  <div className="streak-grid">
                    {weeks.map((week, wi) => (
                      <div key={wi} className="streak-week">
                        {week.map((day, di) => {
                          const isActive = activityDates.has(day.toDateString())
                          const isToday = day.toDateString() === new Date().toDateString()
                          const isFuture = day > new Date()
                          const dateStr = day.toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })

                          return (
                            <div
                              key={di}
                              className={`streak-cell ${isActive ? 'active' : 'empty'} ${isToday ? 'today' : ''} ${isFuture ? 'future' : ''}`}
                              onMouseEnter={() => setHoveredDay({ date: dateStr, active: isActive })}
                              onMouseLeave={() => setHoveredDay(null)}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {hoveredDay && (
                <div className="streak-tooltip">
                  {hoveredDay.active ? 'Active' : 'No activity'} — {hoveredDay.date}
                </div>
              )}
            </div>
          )}

          <div className="card streak-how-card animate-fade-in">
            <h3 className="card-section-title">How to build your streak</h3>
            <div className="streak-tips-grid">
              <div className="streak-tip">
                <p className="streak-tip-title">Log a Workout</p>
                <p className="streak-tip-desc">Create or save any workout in the Workout section and that day counts as active.</p>
              </div>
              <div className="streak-tip">
                <p className="streak-tip-title">Log Progress</p>
                <p className="streak-tip-desc">Add a progress entry with your weight in the Progress Tracker to mark that day active.</p>
              </div>
              <div className="streak-tip">
                <p className="streak-tip-title">Stay Consistent</p>
                <p className="streak-tip-desc">Even rest days count if you log your weight. Consistency beats intensity every time.</p>
              </div>
              <div className="streak-tip">
                <p className="streak-tip-title">Never Miss Twice</p>
                <p className="streak-tip-desc">Missing one day is fine. Missing two in a row breaks momentum. Get back on track fast.</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default StreakTracker