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
    weight: '', bodyFat: '', chest: '', waist: '', hips: '', arms: '', legs: '', notes: ''
  })

  useEffect(() => {
    progressService.getProgress()
      .then(data => setEntries(data.slice(0, 20).reverse()))
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
      setEntries([...entries, data])
      setShowForm(false)
      toast.success('Progress logged!')
      setForm({ date: new Date().toISOString().split('T')[0], weight: '', bodyFat: '', chest: '', waist: '', hips: '', arms: '', legs: '', notes: '' })
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

  return (
    <div className="progress-page">
      <Navbar />
      <div className="progress-layout">
        <Sidebar />
        <main className="progress-main">

          <div className="progress-header animate-fade-in">
            <div>
              <h1 className="section-title">Progress Tracker</h1>
              <p className="section-subtitle">Log your measurements and track your transformation</p>
            </div>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : '+ Log Progress'}
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
                    <input name="weight" type="number" step="0.1" value={form.weight} onChange={handleChange} placeholder="70.5" />
                  </div>
                  <div className="form-group">
                    <label>Body Fat (%)</label>
                    <input name="bodyFat" type="number" step="0.1" value={form.bodyFat} onChange={handleChange} placeholder="18" />
                  </div>
                  <div className="form-group">
                    <label>Chest (cm)</label>
                    <input name="chest" type="number" value={form.chest} onChange={handleChange} placeholder="95" />
                  </div>
                  <div className="form-group">
                    <label>Waist (cm)</label>
                    <input name="waist" type="number" value={form.waist} onChange={handleChange} placeholder="80" />
                  </div>
                  <div className="form-group">
                    <label>Hips (cm)</label>
                    <input name="hips" type="number" value={form.hips} onChange={handleChange} placeholder="95" />
                  </div>
                  <div className="form-group">
                    <label>Arms (cm)</label>
                    <input name="arms" type="number" value={form.arms} onChange={handleChange} placeholder="36" />
                  </div>
                  <div className="form-group">
                    <label>Legs (cm)</label>
                    <input name="legs" type="number" value={form.legs} onChange={handleChange} placeholder="55" />
                  </div>
                  <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                    <label>Notes</label>
                    <input name="notes" value={form.notes} onChange={handleChange} placeholder="How are you feeling?" />
                  </div>
                </div>
                <button type="submit" className="btn-primary">Save Entry</button>
              </form>
            </div>
          )}

          {latest && (
            <div className="progress-latest animate-fade-in">
              <h3 className="card-section-title" style={{ marginBottom: '16px' }}>Latest Measurements</h3>
              <div className="latest-grid">
                <div className="latest-card card">
                  <p className="latest-label">Weight</p>
                  <p className="latest-value">{latest.weight || '--'} <span>kg</span></p>
                </div>
                <div className="latest-card card">
                  <p className="latest-label">Body Fat</p>
                  <p className="latest-value">{latest.bodyFat || '--'} <span>%</span></p>
                </div>
                <div className="latest-card card">
                  <p className="latest-label">Waist</p>
                  <p className="latest-value">{latest.waist || '--'} <span>cm</span></p>
                </div>
                <div className="latest-card card">
                  <p className="latest-label">Arms</p>
                  <p className="latest-value">{latest.arms || '--'} <span>cm</span></p>
                </div>
              </div>
            </div>
          )}

          <div className="progress-charts animate-fade-in">
            <div className="card">
              <ProgressChart data={entries} dataKey="weight" label="Weight over time (kg)" color="var(--accent-green)" />
            </div>
            <div className="card">
              <ProgressChart data={entries} dataKey="bodyFat" label="Body fat over time (%)" color="var(--accent-peach)" />
            </div>
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
                      <th>Body Fat</th>
                      <th>Waist</th>
                      <th>Arms</th>
                      <th>Notes</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {[...entries].reverse().map(entry => (
                      <tr key={entry._id}>
                        <td>{new Date(entry.date).toLocaleDateString()}</td>
                        <td>{entry.weight ? entry.weight + ' kg' : '--'}</td>
                        <td>{entry.bodyFat ? entry.bodyFat + ' %' : '--'}</td>
                        <td>{entry.waist ? entry.waist + ' cm' : '--'}</td>
                        <td>{entry.arms ? entry.arms + ' cm' : '--'}</td>
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