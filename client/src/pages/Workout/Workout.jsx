import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import WorkoutCard from '../../components/WorkoutCard/WorkoutCard'
import TimerWidget from '../../components/TimerWidget/TimerWidget'
import toast from 'react-hot-toast'
import workoutService from '../../services/workoutService'
import './Workout.css'

const emptyExercise = { name: '', sets: 3, reps: 10, weight: 0, muscleGroup: '' }

const Workout = () => {
  const [workouts, setWorkouts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', goal: '', day: '', duration: '', exercises: [{ ...emptyExercise }] })

  useEffect(() => {
    fetchWorkouts()
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
                      <option value="muscle_gain">Muscle Gain</option>
                      <option value="fat_loss">Fat Loss</option>
                      <option value="recomp">Recomposition</option>
                      <option value="endurance">Endurance</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Day</label>
                    <input name="day" value={form.day} onChange={handleChange} placeholder="e.g. Monday" />
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
                      <div className="form-group" style={{ flex: 2 }}>
                        <label>Exercise Name</label>
                        <input value={ex.name} onChange={(e) => handleExerciseChange(i, 'name', e.target.value)} placeholder="e.g. Bench Press" required />
                      </div>
                      <div className="form-group" style={{ flex: 1 }}>
                        <label>Muscle Group</label>
                        <input value={ex.muscleGroup} onChange={(e) => handleExerciseChange(i, 'muscleGroup', e.target.value)} placeholder="chest" />
                      </div>
                      <div className="form-group" style={{ flex: 0.5 }}>
                        <label>Sets</label>
                        <input type="number" value={ex.sets} onChange={(e) => handleExerciseChange(i, 'sets', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ flex: 0.5 }}>
                        <label>Reps</label>
                        <input type="number" value={ex.reps} onChange={(e) => handleExerciseChange(i, 'reps', e.target.value)} />
                      </div>
                      <div className="form-group" style={{ flex: 0.5 }}>
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
              <div className="card">
                <h3 className="card-section-title">Rest Timer</h3>
                <TimerWidget defaultSeconds={90} />
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default Workout