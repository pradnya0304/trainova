import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import ExerciseCard from '../../components/ExerciseCard/ExerciseCard'
import api from '../../services/api'
import './ExerciseLibrary.css'

const muscleGroups = ['all', 'chest', 'back', 'legs', 'shoulders', 'arms', 'core', 'full body']
const difficulties = ['all', 'beginner', 'intermediate', 'advanced']

const ExerciseLibrary = () => {
  const [exercises, setExercises] = useState([])
  const [filtered, setFiltered] = useState([])
  const [loading, setLoading] = useState(true)
  const [muscle, setMuscle] = useState('all')
  const [difficulty, setDifficulty] = useState('all')
  const [search, setSearch] = useState('')

  useEffect(() => {
    api.get('/exercise')
      .then(res => {
        setExercises(res.data)
        setFiltered(res.data)
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    let result = exercises
    if (muscle !== 'all') result = result.filter(e => e.muscleGroup === muscle)
    if (difficulty !== 'all') result = result.filter(e => e.difficulty === difficulty)
    if (search) result = result.filter(e => e.name.toLowerCase().includes(search.toLowerCase()))
    setFiltered(result)
  }, [muscle, difficulty, search, exercises])

  return (
    <div className="exercise-page">
      <Navbar />
      <div className="exercise-layout">
        <Sidebar />
        <main className="exercise-main">

          <div className="animate-fade-in">
            <h1 className="section-title">Exercise Library</h1>
            <p className="section-subtitle">Browse exercises by muscle group, difficulty and equipment</p>
          </div>

          <div className="card exercise-filters animate-fade-in">
            <input
              className="exercise-search"
              placeholder="Search exercises..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="filter-group">
              <p className="filter-label">Muscle Group</p>
              <div className="filter-pills">
                {muscleGroups.map(m => (
                  <button
                    key={m}
                    className={`filter-pill ${muscle === m ? 'active' : ''}`}
                    onClick={() => setMuscle(m)}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div className="filter-group">
              <p className="filter-label">Difficulty</p>
              <div className="filter-pills">
                {difficulties.map(d => (
                  <button
                    key={d}
                    className={`filter-pill ${difficulty === d ? 'active' : ''}`}
                    onClick={() => setDifficulty(d)}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <p className="exercise-count animate-fade-in">{filtered.length} exercises found</p>

          {loading ? (
            <div className="spinner" style={{ margin: '40px auto' }}></div>
          ) : filtered.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
              No exercises found. Try different filters.
            </div>
          ) : (
            <div className="exercise-grid animate-fade-in">
              {filtered.map(ex => (
                <ExerciseCard key={ex._id} exercise={ex} />
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default ExerciseLibrary