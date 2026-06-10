import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import { calculateBMI, getBMICategory, getBMIColor } from '../../utils/bmiCalculator'
import { calculateBMR, calculateTDEE } from '../../utils/tdeeCalculator'
import { calculateMacros } from '../../utils/macroCalculator'
import './BMI.css'

const BMI = () => {
  const [form, setForm] = useState({
    weight: '', height: '', age: '', gender: 'male', activityLevel: 'moderate', goal: 'muscle_gain'
  })
  const [results, setResults] = useState(null)

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleCalculate = (e) => {
    e.preventDefault()
    const weight = parseFloat(form.weight)
    const height = parseFloat(form.height)
    const age = parseInt(form.age)

    const bmi = calculateBMI(weight, height)
    const category = getBMICategory(bmi)
    const color = getBMIColor(bmi)
    const bmr = calculateBMR(weight, height, age, form.gender)
    const tdee = calculateTDEE(bmr, form.activityLevel)
    const macros = calculateMacros(tdee, form.goal)

    setResults({ bmi, category, color, bmr, tdee, macros })
  }

  return (
    <div className="bmi-page">
      <Navbar />
      <div className="bmi-layout">
        <Sidebar />
        <main className="bmi-main">

          <div className="animate-fade-in">
            <h1 className="section-title">BMI and Body Stats</h1>
            <p className="section-subtitle">Calculate your BMI, BMR, TDEE and recommended macros</p>
          </div>

          <div className="bmi-content">
            <div className="card bmi-form-card animate-fade-in">
              <h3 className="card-section-title">Enter Your Details</h3>
              <form onSubmit={handleCalculate}>
                <div className="bmi-form-grid">
                  <div className="form-group">
                    <label>Weight (kg)</label>
                    <input name="weight" type="number" value={form.weight} onChange={handleChange} placeholder="70" required />
                  </div>
                  <div className="form-group">
                    <label>Height (cm)</label>
                    <input name="height" type="number" value={form.height} onChange={handleChange} placeholder="175" required />
                  </div>
                  <div className="form-group">
                    <label>Age</label>
                    <input name="age" type="number" value={form.age} onChange={handleChange} placeholder="25" required />
                  </div>
                  <div className="form-group">
                    <label>Gender</label>
                    <select name="gender" value={form.gender} onChange={handleChange}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Activity Level</label>
                    <select name="activityLevel" value={form.activityLevel} onChange={handleChange}>
                      <option value="sedentary">Sedentary</option>
                      <option value="light">Light</option>
                      <option value="moderate">Moderate</option>
                      <option value="active">Active</option>
                      <option value="very_active">Very Active</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Goal</label>
                    <select name="goal" value={form.goal} onChange={handleChange}>
                      <option value="muscle_gain">Muscle Gain</option>
                      <option value="fat_loss">Fat Loss</option>
                      <option value="recomp">Recomposition</option>
                      <option value="endurance">Endurance</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="btn-primary">Calculate</button>
              </form>
            </div>

            {results && (
              <div className="bmi-results animate-fade-in">
                <div className="card bmi-result-main">
                  <p className="bmi-result-label">Your BMI</p>
                  <p className="bmi-result-value" style={{ color: results.color }}>{results.bmi}</p>
                  <p className="bmi-result-category" style={{ color: results.color }}>{results.category}</p>
                  <div className="bmi-scale">
                    <div className="bmi-scale-bar">
                      <div className="bmi-scale-fill" style={{ width: `${Math.min((results.bmi / 40) * 100, 100)}%`, backgroundColor: results.color }}></div>
                    </div>
                    <div className="bmi-scale-labels">
                      <span>Underweight</span>
                      <span>Normal</span>
                      <span>Overweight</span>
                      <span>Obese</span>
                    </div>
                  </div>
                </div>

                <div className="bmi-stats-row">
                  <div className="card bmi-stat">
                    <p className="stat-label">BMR</p>
                    <p className="stat-value">{results.bmr} <span>kcal/day</span></p>
                    <p className="bmi-stat-desc">Calories burned at rest</p>
                  </div>
                  <div className="card bmi-stat">
                    <p className="stat-label">TDEE</p>
                    <p className="stat-value">{results.tdee} <span>kcal/day</span></p>
                    <p className="bmi-stat-desc">Total daily energy expenditure</p>
                  </div>
                  <div className="card bmi-stat">
                    <p className="stat-label">Target Calories</p>
                    <p className="stat-value">{results.macros.calories} <span>kcal/day</span></p>
                    <p className="bmi-stat-desc">Based on your goal</p>
                  </div>
                </div>

                <div className="card animate-fade-in">
                  <h3 className="card-section-title">Recommended Macros</h3>
                  <div className="macros-display">
                    <div className="macro-block protein">
                      <p className="macro-block-value">{results.macros.protein}g</p>
                      <p className="macro-block-label">Protein</p>
                    </div>
                    <div className="macro-block carbs">
                      <p className="macro-block-value">{results.macros.carbs}g</p>
                      <p className="macro-block-label">Carbs</p>
                    </div>
                    <div className="macro-block fat">
                      <p className="macro-block-value">{results.macros.fat}g</p>
                      <p className="macro-block-label">Fat</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

        </main>
      </div>
    </div>
  )
}

export default BMI