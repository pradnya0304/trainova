import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProgressChart from '../../components/ProgressChart/ProgressChart'
import toast from 'react-hot-toast'
import useAuth from '../../hooks/useAuth'
import progressService from '../../services/progressService'
import './Progress.css'

const Progress = () => {
  const { user } = useAuth()
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [activeTab, setActiveTab] = useState('chart')
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    notes: ''
  })

  useEffect(() => {
    progressService.getProgress()
      .then(data => setEntries(data.slice(0, 30).reverse()))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await progressService.addProgress(form)
      setEntries(prev => [...prev, data])
      setShowForm(false)
      toast.success('Progress logged!')
      setForm({
        date: new Date().toISOString().split('T')[0],
        weight: '',
        notes: ''
      })
    } catch (err) {
      toast.error('Could not save entry')
    }
  }

  const handleDelete = async (id) => {
    try {
      await progressService.deleteProgress(id)
      setEntries(entries.filter(e => e._id !== id))
      toast.success('Entry deleted')
    } catch (err) {
      toast.error('Could not delete entry')
    }
  }

  const latest = entries[entries.length - 1]
  const first = entries[0]
  const goalWeight = user?.weight || null

  const weightChange = latest && first && latest._id !== first._id
    ? parseFloat((latest.weight - first.weight).toFixed(1))
    : null

  const goalDiff = latest && goalWeight
    ? parseFloat((latest.weight - goalWeight).toFixed(1))
    : null

  const progressPercent = (() => {
    if (!first || !latest || !goalWeight) return 0
    const startWeight = first.weight
    const currentWeight = latest.weight
    const target = goalWeight

    if (startWeight === target) return 100
    const total = Math.abs(target - startWeight)
    const done = Math.abs(currentWeight - startWeight)
    return Math.min(Math.round((done / total) * 100), 100)
  })()

  return (
    <div className="progress-page">
      <Navbar />
      <div className="progress-layout">
        <Sidebar />
        <main className="progress-main">

          <div className="progress-header animate-fade-in">
            <div>
              <h1 className="section-title">Progress Tracker</h1>
              <p className="section-subtitle">Log your weight and track your transformation over time</p>
            </div>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : '+ Log Today'}
            </button>
          </div>

          {showForm && (
            <div className="card animate-slide-down">
              <h3 className="card-section-title">Log New Entry</h3>
              <form onSubmit={handleSubmit}>
                <div className="progress-form-grid">
                  <div className="form-group">
                    <label>Date</label>
                    <input name="date" type="date" value={form.date} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input name="weight" type="number" step="0.1" value={form.weight} onChange={handleChange} placeholder="70.5" required />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Notes (optional)</label>
                    <input name="notes" value={form.notes} onChange={handleChange} placeholder="How are you feeling today?" />
                  </div>
                </div>
                <button type="submit" className="btn-primary">Save Entry</button>
              </form>
            </div>
          )}

          {latest && (
            <div className="progress-stats animate-fade-in">
              <div className="card progress-stat-card">
                <p className="stat-label">Starting Weight</p>
                <p className="stat-value">{first?.weight || '--'} <span>kg</span></p>
              </div>
              <div className="card progress-stat-card">
                <p className="stat-label">Current Weight</p>
                <p className="stat-value">{latest.weight} <span>kg</span></p>
              </div>
              <div className="card progress-stat-card">
                <p className="stat-label">Weight Change</p>
                <p className="stat-value" style={{ color: weightChange > 0 ? 'var(--accent-peach)' : weightChange < 0 ? 'var(--accent-green)' : 'var(--text-primary)' }}>
                  {weightChange !== null ? (weightChange > 0 ? '+' : '') + weightChange : '--'} <span>kg</span>
                </p>
              </div>
              <div className="card progress-stat-card">
                <p className="stat-label">Total Entries</p>
                <p className="stat-value">{entries.length}</p>
              </div>
            </div>
          )}

          <div className="progress-tabs animate-fade-in">
            <button className={`progress-tab ${activeTab === 'chart' ? 'active' : ''}`} onClick={() => setActiveTab('chart')}>Chart View</button>
            <button className={`progress-tab ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>Transformation Timeline</button>
            <button className={`progress-tab ${activeTab === 'table' ? 'active' : ''}`} onClick={() => setActiveTab('table')}>All Entries</button>
          </div>

          {activeTab === 'chart' && (
            <div className="card animate-fade-in">
              <ProgressChart
                data={entries}
                dataKey="weight"
                label="Weight over time (kg)"
                color="var(--accent-green)"
              />
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="timeline-section animate-fade-in">

              {entries.length < 2 ? (
                <div className="card" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                  <p>Log at least 2 entries to see your transformation timeline.</p>
                </div>
              ) : (
                <>
                  <div className="card timeline-goal-card">
                    <div className="timeline-goal-header">
                      <h3 className="card-section-title">Your Transformation Journey</h3>
                      <span className="badge badge-green">{progressPercent}% to goal</span>
                    </div>

                    <div className="timeline-journey-bar">
                      <div className="journey-points">
                        <div className="journey-point start">
                          <div className="journey-dot start-dot"></div>
                          <p className="journey-label">Start</p>
                          <p className="journey-weight">{first?.weight} kg</p>
                          <p className="journey-date">{new Date(first?.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>

                        <div className="journey-line-wrap">
                          <div className="journey-line-bg"></div>
                          <div className="journey-line-fill" style={{ width: `${progressPercent}%` }}></div>
                          <div className="journey-current-marker" style={{ left: `${progressPercent}%` }}>
                            <div className="current-marker-dot"></div>
                            <div className="current-marker-label">
                              <p className="journey-weight" style={{ color: 'var(--accent-green)' }}>{latest?.weight} kg</p>
                              <p className="journey-label">Now</p>
                            </div>
                          </div>
                        </div>

                        <div className="journey-point goal">
                          <div className="journey-dot goal-dot"></div>
                          <p className="journey-label">Goal</p>
                          <p className="journey-weight">{goalWeight} kg</p>
                          <p className="journey-date">Profile weight</p>
                        </div>
                      </div>
                    </div>

                    {goalDiff !== null && (
                      <p className="timeline-goal-message">
                        {Math.abs(goalDiff) < 0.5
                          ? 'You have reached your goal weight. Amazing work!'
                          : goalDiff > 0
                          ? `You are ${goalDiff} kg above your goal weight. Keep going.`
                          : `You are ${Math.abs(goalDiff)} kg below your goal weight. Keep going.`
                        }
                      </p>
                    )}
                  </div>

                  <div className="timeline-entries">
                    <h3 className="card-section-title" style={{ marginBottom: '20px' }}>Entry Timeline</h3>
                    <div className="timeline-list">
                      {[...entries].reverse().map((entry, i, arr) => {
                        const prev = arr[i + 1]
                        const diff = prev ? parseFloat((entry.weight - prev.weight).toFixed(1)) : null
                        const isFirst = i === arr.length - 1
                        const isLatest = i === 0

                        return (
                          <div key={entry._id} className={`timeline-entry ${isLatest ? 'latest' : ''}`}>
                            <div className="timeline-entry-left">
                              <div className={`timeline-dot ${isLatest ? 'dot-latest' : isFirst ? 'dot-first' : 'dot-normal'}`}></div>
                              {i < arr.length - 1 && <div className="timeline-line"></div>}
                            </div>
                            <div className="timeline-entry-content card">
                              <div className="timeline-entry-header">
                                <div>
                                  <p className="timeline-entry-date">
                                    {new Date(entry.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                  </p>
                                  {isLatest && <span className="badge badge-green" style={{ marginTop: '4px', display: 'inline-block' }}>Latest</span>}
                                  {isFirst && !isLatest && <span className="badge badge-blue" style={{ marginTop: '4px', display: 'inline-block' }}>Starting point</span>}
                                </div>
                                <div className="timeline-entry-right">
                                  <p className="timeline-entry-weight">{entry.weight} kg</p>
                                  {diff !== null && (
                                    <p className="timeline-entry-diff" style={{ color: diff > 0 ? 'var(--accent-peach)' : 'var(--accent-green)' }}>
                                      {diff > 0 ? '+' : ''}{diff} kg
                                    </p>
                                  )}
                                </div>
                              </div>
                              {entry.notes && (
                                <p className="timeline-entry-notes">{entry.notes}</p>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === 'table' && (
            loading ? (
              <div className="spinner" style={{ margin: '40px auto' }}></div>
            ) : entries.length > 0 ? (
              <div className="card animate-fade-in">
                <h3 className="card-section-title">All Entries</h3>
                <div className="progress-table-wrap">
                  <table className="progress-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Weight</th>
                        <th>Notes</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...entries].reverse().map(entry => (
                        <tr key={entry._id}>
                          <td>{new Date(entry.date).toLocaleDateString()}</td>
                          <td>{entry.weight ? entry.weight + ' kg' : '--'}</td>
                          <td>{entry.notes || '--'}</td>
                          <td>
                            <button className="progress-delete-btn" onClick={() => handleDelete(entry._id)}>Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                No entries yet.
              </div>
            )
          )}

        </main>
      </div>
    </div>
  )
}

export default Progress