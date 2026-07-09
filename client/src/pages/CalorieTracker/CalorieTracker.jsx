import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import api from '../../services/api'
import './CalorieTracker.css'

const CalorieTracker = () => {
  const [input, setInput] = useState('')
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const totalCalories = meals.reduce((sum, m) => sum + m.calories, 0)
  const totalProtein = meals.reduce((sum, m) => sum + m.protein, 0)
  const totalCarbs = meals.reduce((sum, m) => sum + m.carbs, 0)
  const totalFat = meals.reduce((sum, m) => sum + m.fat, 0)

  const handleSearch = async () => {
    if (!input.trim()) return
    setLoading(true)
    setError('')

    try {
      const res = await api.post('/calories/search', { query: input })
      const foods = res.data

      if (!foods || foods.length === 0) {
        setError('Could not find that food. Try a simpler name like "banana" or "chicken".')
        setLoading(false)
        return
      }

      setMeals(prev => [...prev, ...foods])
      setInput('')
    } catch (err) {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const removeItem = (id) => {
    setMeals(meals.filter(m => m.id !== id))
  }

  const clearAll = () => {
    setMeals([])
  }

  return (
    <div className="calorie-page">
      <Navbar />
      <div className="calorie-layout">
        <Sidebar />
        <main className="calorie-main">

          <div className="animate-fade-in">
            <h1 className="section-title">Calorie Tracker</h1>
            <p className="section-subtitle">Type what you ate and we will calculate the calories and macros automatically.</p>
          </div>

          <div className="card calorie-input-card animate-fade-in">
            <h3 className="card-section-title">What did you eat?</h3>
            <p className="calorie-input-hint">Examples: "banana", "chicken breast", "oats", "brown rice"</p>
            <div className="calorie-input-row">
              <input
                className="calorie-input"
                placeholder="Type a food name..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <button
                className="btn-primary calorie-search-btn"
                onClick={handleSearch}
                disabled={loading}
              >
                {loading
                  ? <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                  : 'Calculate'
                }
              </button>
            </div>
            {error && <p className="calorie-error">{error}</p>}
          </div>

          {meals.length > 0 && (
            <>
              <div className="calorie-totals animate-fade-in">
                <div className="card calorie-total-card highlight">
                  <p className="stat-label">Total Calories</p>
                  <p className="calorie-total-value">{totalCalories}</p>
                  <p className="calorie-total-unit">kcal</p>
                </div>
                <div className="card calorie-total-card">
                  <p className="stat-label">Protein</p>
                  <p className="calorie-total-value protein">{totalProtein}g</p>
                  <p className="calorie-total-unit">grams</p>
                </div>
                <div className="card calorie-total-card">
                  <p className="stat-label">Carbs</p>
                  <p className="calorie-total-value carbs">{totalCarbs}g</p>
                  <p className="calorie-total-unit">grams</p>
                </div>
                <div className="card calorie-total-card">
                  <p className="stat-label">Fat</p>
                  <p className="calorie-total-value fat">{totalFat}g</p>
                  <p className="calorie-total-unit">grams</p>
                </div>
              </div>

              <div className="card animate-fade-in">
                <div className="calorie-list-header">
                  <h3 className="card-section-title">Today's Food Log</h3>
                  <button className="calorie-clear-btn" onClick={clearAll}>Clear all</button>
                </div>

                <div className="calorie-food-list">
                  {meals.map((meal, i) => (
                    <div key={meal.id} className="calorie-food-item">
                      <div className="calorie-food-left">
                        <div className="calorie-food-number">{i + 1}</div>
                        <div>
                          <p className="calorie-food-name">{meal.name}</p>
                          <p className="calorie-food-quantity">{meal.quantity}</p>
                        </div>
                      </div>
                      <div className="calorie-food-macros">
                        <div className="calorie-macro-pill protein-pill">{meal.protein}g P</div>
                        <div className="calorie-macro-pill carbs-pill">{meal.carbs}g C</div>
                        <div className="calorie-macro-pill fat-pill">{meal.fat}g F</div>
                        <div className="calorie-food-kcal">{meal.calories} kcal</div>
                        <button
                          className="calorie-remove-btn"
                          onClick={() => removeItem(meal.id)}
                        >
                          x
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card calorie-macro-bar-card animate-fade-in">
                <h3 className="card-section-title">Macro Breakdown</h3>
                <div className="macro-bar-section">
                  <div className="macro-bar-row">
                    <span className="macro-bar-label">Protein</span>
                    <div className="macro-bar-track">
                      <div
                        className="macro-bar-fill protein-fill"
                        style={{ width: `${totalCalories > 0 ? Math.min((totalProtein * 4 / totalCalories) * 100, 100) : 0}%` }}
                      ></div>
                    </div>
                    <span className="macro-bar-pct">
                      {totalCalories > 0 ? Math.round((totalProtein * 4 / totalCalories) * 100) : 0}%
                    </span>
                  </div>
                  <div className="macro-bar-row">
                    <span className="macro-bar-label">Carbs</span>
                    <div className="macro-bar-track">
                      <div
                        className="macro-bar-fill carbs-fill"
                        style={{ width: `${totalCalories > 0 ? Math.min((totalCarbs * 4 / totalCalories) * 100, 100) : 0}%` }}
                      ></div>
                    </div>
                    <span className="macro-bar-pct">
                      {totalCalories > 0 ? Math.round((totalCarbs * 4 / totalCalories) * 100) : 0}%
                    </span>
                  </div>
                  <div className="macro-bar-row">
                    <span className="macro-bar-label">Fat</span>
                    <div className="macro-bar-track">
                      <div
                        className="macro-bar-fill fat-fill"
                        style={{ width: `${totalCalories > 0 ? Math.min((totalFat * 9 / totalCalories) * 100, 100) : 0}%` }}
                      ></div>
                    </div>
                    <span className="macro-bar-pct">
                      {totalCalories > 0 ? Math.round((totalFat * 9 / totalCalories) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {meals.length === 0 && !loading && (
            <div className="card calorie-empty animate-fade-in">
              <div className="calorie-empty-content">
                <p className="calorie-empty-title">Start logging your food</p>
                <p className="calorie-empty-desc">
                  Type any food name above. Search one food at a time for best results.
                </p>
                <div className="calorie-examples">
                  {['banana', 'chicken breast', 'brown rice', 'boiled eggs', 'whole milk', 'oats'].map((ex, i) => (
                    <button
                      key={i}
                      className="calorie-example-btn"
                      onClick={() => setInput(ex)}
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default CalorieTracker