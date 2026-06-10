import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import MealCard from '../../components/MealCard/MealCard'
import MacroRing from '../../components/MacroRing/MacroRing'
import toast from 'react-hot-toast'
import nutritionService from '../../services/nutritionService'
import './Nutrition.css'

const emptyMeal = { mealName: '', foods: '', calories: 0, protein: 0, carbs: 0, fat: 0 }

const Nutrition = () => {
  const [plan, setPlan] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({
    totalCalories: '', protein: '', carbs: '', fat: '',
    dietType: 'standard', meals: [{ ...emptyMeal }]
  })

  useEffect(() => {
    nutritionService.getNutrition()
      .then(data => {
        if (data) {
          setPlan(data)
          setForm({
            totalCalories: data.totalCalories,
            protein: data.protein,
            carbs: data.carbs,
            fat: data.fat,
            dietType: data.dietType,
            meals: data.meals.length > 0 ? data.meals : [{ ...emptyMeal }]
          })
        }
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleMealChange = (index, field, value) => {
    const updated = [...form.meals]
    updated[index][field] = value
    setForm({ ...form, meals: updated })
  }

  const addMeal = () => {
    setForm({ ...form, meals: [...form.meals, { ...emptyMeal }] })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...form,
        meals: form.meals.map(m => ({
          ...m,
          foods: typeof m.foods === 'string' ? m.foods.split(',').map(f => f.trim()) : m.foods
        }))
      }
      const data = await nutritionService.saveNutrition(payload)
      setPlan(data)
      setShowForm(false)
      toast.success('Nutrition plan saved!')
    } catch (err) {
      toast.error('Could not save plan')
    }
  }

  return (
    <div className="nutrition-page">
      <Navbar />
      <div className="nutrition-layout">
        <Sidebar />
        <main className="nutrition-main">

          <div className="nutrition-header animate-fade-in">
            <div>
              <h1 className="section-title">Nutrition Plan</h1>
              <p className="section-subtitle">Set your daily macro targets and meal plan</p>
            </div>
            <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : plan ? 'Edit Plan' : '+ Create Plan'}
            </button>
          </div>

          {showForm && (
            <div className="card animate-slide-down">
              <h3 className="card-section-title">Set Nutrition Plan</h3>
              <form onSubmit={handleSubmit}>
                <div className="nutrition-form-grid">
                  <div className="form-group">
                    <label>Total Calories</label>
                    <input name="totalCalories" type="number" value={form.totalCalories} onChange={handleChange} placeholder="2000" required />
                  </div>
                  <div className="form-group">
                    <label>Protein (g)</label>
                    <input name="protein" type="number" value={form.protein} onChange={handleChange} placeholder="150" required />
                  </div>
                  <div className="form-group">
                    <label>Carbs (g)</label>
                    <input name="carbs" type="number" value={form.carbs} onChange={handleChange} placeholder="200" required />
                  </div>
                  <div className="form-group">
                    <label>Fat (g)</label>
                    <input name="fat" type="number" value={form.fat} onChange={handleChange} placeholder="70" required />
                  </div>
                  <div className="form-group">
                    <label>Diet Type</label>
                    <select name="dietType" value={form.dietType} onChange={handleChange}>
                      <option value="standard">Standard</option>
                      <option value="vegetarian">Vegetarian</option>
                      <option value="vegan">Vegan</option>
                      <option value="keto">Keto</option>
                      <option value="paleo">Paleo</option>
                    </select>
                  </div>
                </div>

                <div className="meal-form-section">
                  <div className="meal-form-header">
                    <h4>Meals</h4>
                    <button type="button" className="btn-secondary" style={{ padding: '6px 14px', fontSize: '13px' }} onClick={addMeal}>
                      + Add Meal
                    </button>
                  </div>
                  {form.meals.map((meal, i) => (
                    <div key={i} className="meal-form-row">
                      <div className="form-group">
                        <label>Meal Name</label>
                        <input value={meal.mealName} onChange={(e) => handleMealChange(i, 'mealName', e.target.value)} placeholder="Breakfast" />
                      </div>
                      <div className="form-group" style={{ flex: 2 }}>
                        <label>Foods (comma separated)</label>
                        <input value={meal.foods} onChange={(e) => handleMealChange(i, 'foods', e.target.value)} placeholder="Oats, Banana, Milk" />
                      </div>
                      <div className="form-group">
                        <label>Calories</label>
                        <input type="number" value={meal.calories} onChange={(e) => handleMealChange(i, 'calories', e.target.value)} placeholder="400" />
                      </div>
                      <div className="form-group">
                        <label>Protein (g)</label>
                        <input type="number" value={meal.protein} onChange={(e) => handleMealChange(i, 'protein', e.target.value)} placeholder="30" />
                      </div>
                      <div className="form-group">
                        <label>Carbs (g)</label>
                        <input type="number" value={meal.carbs} onChange={(e) => handleMealChange(i, 'carbs', e.target.value)} placeholder="50" />
                      </div>
                      <div className="form-group">
                        <label>Fat (g)</label>
                        <input type="number" value={meal.fat} onChange={(e) => handleMealChange(i, 'fat', e.target.value)} placeholder="10" />
                      </div>
                    </div>
                  ))}
                </div>

                <button type="submit" className="btn-primary">Save Plan</button>
              </form>
            </div>
          )}

          {loading ? (
            <div className="spinner" style={{ margin: '40px auto' }}></div>
          ) : plan ? (
            <div className="nutrition-content animate-fade-in">
              <div className="nutrition-overview">
                <div className="card">
                  <h3 className="card-section-title">Daily Targets</h3>
                  <div className="nutrition-targets">
                    <div className="target-item">
                      <p className="target-value">{plan.totalCalories}</p>
                      <p className="target-label">Calories</p>
                    </div>
                    <div className="target-item protein">
                      <p className="target-value">{plan.protein}g</p>
                      <p className="target-label">Protein</p>
                    </div>
                    <div className="target-item carbs">
                      <p className="target-value">{plan.carbs}g</p>
                      <p className="target-label">Carbs</p>
                    </div>
                    <div className="target-item fat">
                      <p className="target-value">{plan.fat}g</p>
                      <p className="target-label">Fat</p>
                    </div>
                  </div>
                  <div className="nutrition-diet-badge">
                    <span className="badge badge-green">{plan.dietType}</span>
                  </div>
                </div>

                <div className="card">
                  <h3 className="card-section-title">Macro Split</h3>
                  <MacroRing protein={plan.protein} carbs={plan.carbs} fat={plan.fat} />
                </div>
              </div>

              <div className="meals-section">
                <h3 className="card-section-title">Meal Plan</h3>
                <div className="meals-grid">
                  {plan.meals.map((meal, i) => (
                    <MealCard key={i} meal={meal} />
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="card" style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
              <p>No nutrition plan yet. Create one above.</p>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default Nutrition