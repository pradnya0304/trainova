import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard'
import toast from 'react-hot-toast'
import workoutService from '../../services/workoutService'
import api from '../../services/api'
import './Workout.css'

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
const goals = ['muscle_gain', 'fat_loss', 'recomp', 'endurance', 'mobility']
const emptyExercise = { name: '', sets: 3, reps: 10, weight: 0, muscleGroup: '', custom: false }

const WorkoutTimer = () => {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(30)
  const [totalSeconds, setTotalSeconds] = useState(90)
  const [timeLeft, setTimeLeft] = useState(90)
  const [running, setRunning] = useState(false)
  const [editing, setEditing] = useState(false)
  const [inputMin, setInputMin] = useState(1)
  const [inputSec, setInputSec] = useState(30)

  useEffect(() => {
    let interval = null
    if (running && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000)
    } else if (timeLeft === 0) {
      setRunning(false)
    }
    return () => clearInterval(interval)
  }, [running, timeLeft])

  const handleSetTimer = () => {
    const total = inputMin * 60 + parseInt(inputSec)
    setTotalSeconds(total)
    setTimeLeft(total)
    setRunning(false)
    setEditing(false)
  }

  const mins = Math.floor(timeLeft / 60)
  const secs = timeLeft % 60
  const progress = totalSeconds > 0 ? (timeLeft / totalSeconds) * 100 : 0

  return (
    <div className="card timer-card">
      <h3 className="card-section-title">Rest Timer</h3>

      {editing ? (
        <div className="timer-edit">
          <div className="timer-edit-inputs">
            <div className="form-group">
              <label>Minutes</label>
              <input type="number" min="0" max="10" value={inputMin} onChange={e => setInputMin(e.target.value)} />
            </div>
            <div className="form-group">
              <label>Seconds</label>
              <input type="number" min="0" max="59" value={inputSec} onChange={e => setInputSec(e.target.value)} />
            </div>
          </div>
          <button className="btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={handleSetTimer}>Set Timer</button>
          <button className="btn-secondary" style={{ width: '100%', marginTop: '8px' }} onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="timer-widget">
          <div className="timer-ring">
            <svg viewBox="0 0 100 100" className="timer-svg">
              <circle cx="50" cy="50" r="42" className="timer-track" />
              <circle
                cx="50" cy="50" r="42"
                className="timer-progress"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
              />
            </svg>
            <div className="timer-display">
              <span className="timer-time">
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </span>
              <span className="timer-label">rest</span>
            </div>
          </div>

          <div className="timer-controls">
            <button className="timer-btn" onClick={() => setRunning(p => !p)}>
              {running ? '⏸' : '▶'}
            </button>
            <button className="timer-btn reset" onClick={() => { setRunning(false); setTimeLeft(totalSeconds) }}>
              ↺
            </button>
          </div>

          <button className="timer-edit-btn" onClick={() => setEditing(true)}>
            Set custom time
          </button>
        </div>
      )}
    </div>
  )
}

const Workout = () => {
  const [workouts, setWorkouts] = useState([])
  const [exercises, setExercises] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    name: '',
    goal: '',
    day: '',
    duration: '',
    exercises: [{ ...emptyExercise }]
  })

  useEffect(() => {
    fetchWorkouts()
    api.get('/exercise').then(res => setExercises(res.data)).catch(err => console.log(err))
  }, [])

  const fetchWorkouts = async () => {
    try {
      const data = await workoutService.getWorkouts()
      setWorkouts(data)
    } catch (err) {
      toast.error('Could not load workouts')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleExerciseChange = (index, field, value) => {
    const updated = [...form.exercises]
    updated[index][field] = value
    if (field === 'name' && !updated[index].custom) {
      const found = exercises.find(e => e.name === value)
      if (found) updated[index].muscleGroup = found.muscleGroup
    }
    setForm({ ...form, exercises: updated })
  }

  const toggleCustomExercise = (index) => {
    const updated = [...form.exercises]
    updated[index].custom = !updated[index].custom
    updated[index].name = ''
    setForm({ ...form, exercises: updated })
  }

  const addExercise = () => {
    setForm({ ...form, exercises: [...form.exercises, { ...emptyExercise }] })
  }

  const removeExercise = (index) => {
    const updated = form.exercises.filter((_, i) => i !== index)
    setForm({ ...form, exercises: updated })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = await workoutService.createWorkout(form)
      setWorkouts([data, ...workouts])
      setForm({ name: '', goal: '', day: '', duration: '', exercises: [{ ...emptyExercise }] })
      setShowForm(false)
      toast.success('Workout created!')
    } catch (err) {
      toast.error('Could not save workout')
    }
  }

  const handleDelete = async (id) => {
    try {
      await workoutService.deleteWorkout(id)
      setWorkouts(workouts.filter(w => w._id !== id))
      toast.success('Workout deleted')
    } catch (err) {
      toast.error('Could not delete workout')
    }
  }

  return (
    <div className="workout-page">
      <Navbar />
      <div className="workout-layout">
        <Sidebar />
        <main className="workout-main">

          <div className="workout-header animate-fade-in">
            <div>
              <h1 className="section-title">Workout Plans</h1>
              <p className="section-subtitle">Create and manage your training routines</p>
            </div>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : '+ New Workout'}
            </button>
          </div>

          {showForm && (
            <div className="card workout-form-card animate-slide-down">
              <h3 className="card-section-title">Create New Workout</h3>
              <form onSubmit={handleSubmit}>
                <div className="workout-form-grid">
                  <div className="form-group">
                    <label>Workout Name</label>
                    <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Push Day" required />
                  </div>
                  <div className="form-group">
                    <label>Goal</label>
                    <select name="goal" value={form.goal} onChange={handleChange}>
                      <option value="">Select goal</option>
                      {goals.map(g => (
                        <option key={g} value={g}>{g.replace('_', ' ')}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Day</label>
                    <select name="day" value={form.day} onChange={handleChange}>
                      <option value="">Select day</option>
                      {days.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Duration (min)</label>
                    <input name="duration" type="number" value={form.duration} onChange={handleChange} placeholder="60" />
                  </div>
                </div>

                <div className="exercise-form-section">
                  <div className="exercise-form-header">
                    <h4>Exercises</h4>
                    <button type="button" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '13px' }} onClick={addExercise}>
                      + Add Exercise
                    </button>
                  </div>

                  {form.exercises.map((ex, i) => (
                    <div key={i} className="exercise-form-row">
                      <div className="exercise-name-group">
                        <label>Exercise</label>
                        {ex.custom ? (
                          <input
                            value={ex.name}
                            onChange={(e) => handleExerciseChange(i, 'name', e.target.value)}
                            placeholder="Type exercise name"
                            required
                          />
                        ) : (
                          <select
                            value={ex.name}
                            onChange={(e) => handleExerciseChange(i, 'name', e.target.value)}
                            required
                          >
                            <option value="">Select exercise</option>
                            {exercises.map(e => (
                              <option key={e._id} value={e.name}>{e.name} ({e.muscleGroup})</option>
                            ))}
                          </select>
                        )}
                        <button
                          type="button"
                          className="custom-toggle-btn"
                          onClick={() => toggleCustomExercise(i)}
                        >
                          {ex.custom ? 'Pick from list' : 'Type manually'}
                        </button>
                      </div>

                      <div className="form-group" style={{ flex: '0 0 80px' }}>
                        <label>Sets</label>
                        <input type="number" value={ex.sets} onChange={(e) => handleExerciseChange(i, 'sets', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ flex: '0 0 80px' }}>
                        <label>Reps</label>
                        <input type="number" value={ex.reps} onChange={(e) => handleExerciseChange(i, 'reps', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ flex: '0 0 100px' }}>
                        <label>Weight (kg)</label>
                        <input type="number" value={ex.weight} onChange={(e) => handleExerciseChange(i, 'weight', e.target.value)} />
                      </div>

                      {form.exercises.length > 1 && (
                        <button type="button" className="remove-exercise-btn" onClick={() => removeExercise(i)}>x</button>
                      )}
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn-primary">Save Workout</button>
              </form>
            </div>
          )}

          <div className="workout-content">
            <div className="workout-list-section">
              {loading ? (
                <div className="spinner" style={{ margin: '40px auto' }}></div>
              ) : workouts.length === 0 ? (
                <div className="card workout-empty">
                  <p>No workouts yet. Create your first workout plan above.</p>
                </div>
              ) : (
                <div className="workout-cards-grid">
                  {workouts.map(w => (
                    <WorkoutCard key={w._id} workout={w} onDelete={handleDelete} />
                  ))}
                </div>
              )}
            </div>

            <div className="workout-timer-section">
              <WorkoutTimer />
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default Workout