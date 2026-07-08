import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import ProgressChart from '../../components/ProgressChart/ProgressChart'
import toast from 'react-hot-toast'
import progressService from '../../services/progressService'
import './Progress.css'

const Progress = () => {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
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
  const weightChange = latest && first && latest._id !== first._id
    ? (latest.weight - first.weight).toFixed(1)
    : null

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
                <p className="stat-label">Current Weight</p>
                <p className="stat-value">{latest.weight} <span>kg</span></p>
              </div>
              <div className="card progress-stat-card">
                <p className="stat-label">Total Entries</p>
                <p className="stat-value">{entries.length}</p>
              </div>
              <div className="card progress-stat-card">
                <p className="stat-label">Weight Change</p>
                <p className="stat-value" style={{ color: weightChange > 0 ? 'var(--accent-peach)' : 'var(--accent-green)' }}>
                  {weightChange !== null ? (weightChange > 0 ? '+' : '') + weightChange : '--'} <span>kg</span>
                </p>
              </div>
              <div className="card progress-stat-card">
                <p className="stat-label">Last Logged</p>
                <p className="stat-value" style={{ fontSize: '16px' }}>{new Date(latest.date).toLocaleDateString()}</p>
              </div>
            </div>
          )}

          <div className="card animate-fade-in">
            <ProgressChart data={entries} dataKey="weight" label="Weight over time (kg)" color="var(--accent-green)" />
          </div>

          {loading ? (
            <div className="spinner" style={{ margin: '40px auto' }}></div>
          ) : entries.length > 0 && (
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
          )}

        </main>
      </div>
    </div>
  )
}

export default Progress