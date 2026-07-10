import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import useAuth from '../../hooks/useAuth'
import { calculateBMR, calculateTDEE } from '../../utils/tdeeCalculator'
import { calculateMacros } from '../../utils/macroCalculator'
import './PlatePlanner.css'

const mealSuggestions = {
  muscle_gain: {
    breakfast: [
      { food: 'Oats', amount: '80g', protein: 14, carbs: 53, fat: 6, calories: 311 },
      { food: 'Whole Eggs', amount: '3 eggs', protein: 18, carbs: 1, fat: 15, calories: 210 },
      { food: 'Banana', amount: '1 medium', protein: 1, carbs: 23, fat: 0, calories: 89 },
      { food: 'Whole Milk', amount: '200ml', protein: 6, carbs: 10, fat: 6, calories: 122 }
    ],
    lunch: [
      { food: 'Chicken Breast', amount: '200g', protein: 62, carbs: 0, fat: 8, calories: 330 },
      { food: 'White Rice', amount: '150g', protein: 4, carbs: 42, fat: 0, calories: 195 },
      { food: 'Broccoli', amount: '100g', protein: 3, carbs: 7, fat: 0, calories: 34 },
      { food: 'Olive Oil', amount: '10g', protein: 0, carbs: 0, fat: 10, calories: 88 }
    ],
    dinner: [
      { food: 'Salmon', amount: '180g', protein: 36, carbs: 0, fat: 23, calories: 374 },
      { food: 'Sweet Potato', amount: '150g', protein: 3, carbs: 30, fat: 0, calories: 129 },
      { food: 'Spinach', amount: '100g', protein: 3, carbs: 4, fat: 0, calories: 23 },
      { food: 'Olive Oil', amount: '10g', protein: 0, carbs: 0, fat: 10, calories: 88 }
    ],
    snack: [
      { food: 'Greek Yogurt', amount: '200g', protein: 20, carbs: 8, fat: 0, calories: 118 },
      { food: 'Almonds', amount: '30g', protein: 6, carbs: 7, fat: 15, calories: 174 },
      { food: 'Whey Protein', amount: '1 scoop', protein: 25, carbs: 3, fat: 2, calories: 120 }
    ]
  },
  fat_loss: {
    breakfast: [
      { food: 'Egg Whites', amount: '4 whites', protein: 14, carbs: 1, fat: 0, calories: 68 },
      { food: 'Oatmeal', amount: '60g', protein: 10, carbs: 40, fat: 4, calories: 233 },
      { food: 'Berries', amount: '100g', protein: 1, carbs: 12, fat: 0, calories: 50 },
      { food: 'Black Coffee', amount: '250ml', protein: 0, carbs: 0, fat: 0, calories: 5 }
    ],
    lunch: [
      { food: 'Grilled Chicken', amount: '150g', protein: 47, carbs: 0, fat: 6, calories: 248 },
      { food: 'Mixed Salad', amount: '200g', protein: 4, carbs: 8, fat: 0, calories: 40 },
      { food: 'Brown Rice', amount: '100g', protein: 3, carbs: 23, fat: 1, calories: 111 },
      { food: 'Lemon Dressing', amount: '10g', protein: 0, carbs: 1, fat: 4, calories: 40 }
    ],
    dinner: [
      { food: 'Fish', amount: '200g', protein: 44, carbs: 0, fat: 10, calories: 272 },
      { food: 'Roasted Vegetables', amount: '200g', protein: 4, carbs: 16, fat: 2, calories: 96 },
      { food: 'Quinoa', amount: '80g', protein: 3, carbs: 17, fat: 2, calories: 96 }
    ],
    snack: [
      { food: 'Greek Yogurt', amount: '150g', protein: 15, carbs: 6, fat: 0, calories: 89 },
      { food: 'Apple', amount: '1 medium', protein: 0, carbs: 25, fat: 0, calories: 95 },
      { food: 'Green Tea', amount: '250ml', protein: 0, carbs: 0, fat: 0, calories: 2 }
    ]
  },
  recomp: {
    breakfast: [
      { food: 'Whole Eggs', amount: '3 eggs', protein: 18, carbs: 1, fat: 15, calories: 210 },
      { food: 'Oats', amount: '60g', protein: 10, carbs: 40, fat: 5, calories: 233 },
      { food: 'Banana', amount: '1 medium', protein: 1, carbs: 23, fat: 0, calories: 89 }
    ],
    lunch: [
      { food: 'Chicken Breast', amount: '180g', protein: 56, carbs: 0, fat: 7, calories: 297 },
      { food: 'Brown Rice', amount: '120g', protein: 4, carbs: 28, fat: 1, calories: 133 },
      { food: 'Mixed Vegetables', amount: '150g', protein: 4, carbs: 12, fat: 0, calories: 60 }
    ],
    dinner: [
      { food: 'Paneer or Tofu', amount: '150g', protein: 27, carbs: 3, fat: 15, calories: 255 },
      { food: 'Roti', amount: '2 rotis', protein: 8, carbs: 40, fat: 6, calories: 248 },
      { food: 'Dal', amount: '150g', protein: 14, carbs: 30, fat: 1, calories: 174 }
    ],
    snack: [
      { food: 'Peanut Butter', amount: '30g', protein: 7, carbs: 6, fat: 15, calories: 176 },
      { food: 'Brown Bread', amount: '2 slices', protein: 8, carbs: 28, fat: 3, calories: 165 },
      { food: 'Whey Protein', amount: '1 scoop', protein: 25, carbs: 3, fat: 2, calories: 120 }
    ]
  },
  endurance: {
    breakfast: [
      { food: 'Oats', amount: '100g', protein: 17, carbs: 66, fat: 7, calories: 389 },
      { food: 'Banana', amount: '2 medium', protein: 2, carbs: 46, fat: 0, calories: 178 },
      { food: 'Honey', amount: '15g', protein: 0, carbs: 12, fat: 0, calories: 46 },
      { food: 'Milk', amount: '250ml', protein: 8, carbs: 13, fat: 8, calories: 153 }
    ],
    lunch: [
      { food: 'Pasta', amount: '200g', protein: 10, carbs: 50, fat: 2, calories: 262 },
      { food: 'Chicken Breast', amount: '150g', protein: 47, carbs: 0, fat: 6, calories: 248 },
      { food: 'Tomato Sauce', amount: '100g', protein: 2, carbs: 8, fat: 1, calories: 50 }
    ],
    dinner: [
      { food: 'Brown Rice', amount: '200g', protein: 6, carbs: 46, fat: 2, calories: 222 },
      { food: 'Lentils', amount: '150g', protein: 14, carbs: 30, fat: 1, calories: 174 },
      { food: 'Sweet Potato', amount: '150g', protein: 3, carbs: 30, fat: 0, calories: 129 }
    ],
    snack: [
      { food: 'Dates', amount: '50g', protein: 1, carbs: 38, fat: 0, calories: 141 },
      { food: 'Banana', amount: '1 medium', protein: 1, carbs: 23, fat: 0, calories: 89 },
      { food: 'Coconut Water', amount: '300ml', protein: 0, carbs: 12, fat: 0, calories: 57 }
    ]
  },
  mobility: {
    breakfast: [
      { food: 'Eggs', amount: '2 eggs', protein: 12, carbs: 1, fat: 10, calories: 140 },
      { food: 'Avocado', amount: '100g', protein: 2, carbs: 9, fat: 15, calories: 160 },
      { food: 'Brown Bread', amount: '2 slices', protein: 8, carbs: 28, fat: 3, calories: 165 },
      { food: 'Green Tea', amount: '250ml', protein: 0, carbs: 0, fat: 0, calories: 2 }
    ],
    lunch: [
      { food: 'Salmon', amount: '150g', protein: 30, carbs: 0, fat: 20, calories: 312 },
      { food: 'Quinoa', amount: '100g', protein: 4, carbs: 21, fat: 2, calories: 120 },
      { food: 'Spinach Salad', amount: '150g', protein: 4, carbs: 6, fat: 0, calories: 35 },
      { food: 'Olive Oil', amount: '10g', protein: 0, carbs: 0, fat: 10, calories: 88 }
    ],
    dinner: [
      { food: 'Tofu', amount: '200g', protein: 16, carbs: 4, fat: 8, calories: 152 },
      { food: 'Brown Rice', amount: '120g', protein: 4, carbs: 28, fat: 1, calories: 133 },
      { food: 'Stir Fried Vegetables', amount: '200g', protein: 4, carbs: 16, fat: 4, calories: 112 }
    ],
    snack: [
      { food: 'Walnuts', amount: '30g', protein: 5, carbs: 4, fat: 20, calories: 196 },
      { food: 'Blueberries', amount: '100g', protein: 1, carbs: 14, fat: 0, calories: 57 },
      { food: 'Greek Yogurt', amount: '150g', protein: 15, carbs: 6, fat: 0, calories: 89 }
    ]
  }
}

const mealColors = {
  breakfast: 'var(--accent-yellow)',
  lunch: 'var(--accent-green)',
  dinner: 'var(--accent-blue)',
  snack: 'var(--accent-purple)'
}

const mealBg = {
  breakfast: 'var(--accent-yellow-light)',
  lunch: 'var(--accent-green-light)',
  dinner: 'var(--accent-blue-light)',
  snack: 'var(--accent-purple-light)'
}

const PlatePlanner = () => {
  const { user } = useAuth()
  const [activeMeal, setActiveMeal] = useState('breakfast')

  const goal = user?.goal || 'muscle_gain'
  const meals = mealSuggestions[goal] || mealSuggestions['muscle_gain']
  const currentMeal = meals[activeMeal]

  const totalCalories = currentMeal.reduce((s, f) => s + f.calories, 0)
  const totalProtein = currentMeal.reduce((s, f) => s + f.protein, 0)
  const totalCarbs = currentMeal.reduce((s, f) => s + f.carbs, 0)
  const totalFat = currentMeal.reduce((s, f) => s + f.fat, 0)
  const totalMacroGrams = totalProtein + totalCarbs + totalFat

  const bmr = user?.weight && user?.height && user?.age
    ? calculateBMR(user.weight, user.height, user.age, user.gender || 'male')
    : null
  const tdee = bmr ? calculateTDEE(bmr, user.activityLevel || 'moderate') : null
  const targets = tdee ? calculateMacros(tdee, goal) : null

  const plateSlices = [
    { label: 'Protein', value: totalProtein, color: 'var(--accent-blue)', bg: 'var(--accent-blue-light)' },
    { label: 'Carbs', value: totalCarbs, color: 'var(--accent-yellow)', bg: 'var(--accent-yellow-light)' },
    { label: 'Fat', value: totalFat, color: 'var(--accent-peach)', bg: 'var(--accent-peach-light)' }
  ]

  const buildDonut = () => {
    const total = totalProtein * 4 + totalCarbs * 4 + totalFat * 9
    const values = [
      { value: totalProtein * 4, color: 'var(--accent-blue)' },
      { value: totalCarbs * 4, color: 'var(--accent-yellow)' },
      { value: totalFat * 9, color: 'var(--accent-peach)' }
    ]

    const radius = 80
    const cx = 100
    const cy = 100
    const circumference = 2 * Math.PI * radius

    let paths = []
    let offset = 0

    values.forEach((item, i) => {
      const pct = total > 0 ? item.value / total : 0
      const dash = pct * circumference
      const gap = circumference - dash

      paths.push(
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={radius}
          fill="none"
          stroke={item.color}
          strokeWidth="28"
          strokeDasharray={`${dash} ${gap}`}
          strokeDashoffset={-offset}
          style={{ transform: 'rotate(-90deg)', transformOrigin: '100px 100px', transition: 'stroke-dasharray 0.6s ease' }}
        />
      )
      offset += dash
    })

    return paths
  }

  return (
    <div className="plate-page">
      <Navbar />
      <div className="plate-layout">
        <Sidebar />
        <main className="plate-main">

          <div className="animate-fade-in">
            <h1 className="section-title">Smart Plate Builder</h1>
            <p className="section-subtitle">
              Meal suggestions built around your goal. See exactly what your plate should look like for each meal of the day.
            </p>
          </div>

          {(!goal || !user?.weight) && (
            <div className="card plate-warning">
              Complete your profile with weight, height, age and goal to get personalised plate suggestions.
            </div>
          )}

          <div className="card plate-goal-bar animate-fade-in">
            <div className="plate-goal-item">
              <p className="plate-goal-label">Your Goal</p>
              <p className="plate-goal-value">{goal.replace('_', ' ')}</p>
            </div>
            {targets && (
              <>
                <div className="plate-goal-divider"></div>
                <div className="plate-goal-item">
                  <p className="plate-goal-label">Daily Target</p>
                  <p className="plate-goal-value">{targets.calories} kcal</p>
                </div>
                <div className="plate-goal-divider"></div>
                <div className="plate-goal-item">
                  <p className="plate-goal-label">Protein Target</p>
                  <p className="plate-goal-value">{targets.protein}g</p>
                </div>
                <div className="plate-goal-divider"></div>
                <div className="plate-goal-item">
                  <p className="plate-goal-label">Carbs Target</p>
                  <p className="plate-goal-value">{targets.carbs}g</p>
                </div>
                <div className="plate-goal-divider"></div>
                <div className="plate-goal-item">
                  <p className="plate-goal-label">Fat Target</p>
                  <p className="plate-goal-value">{targets.fat}g</p>
                </div>
              </>
            )}
          </div>

          <div className="plate-meal-tabs animate-fade-in">
            {Object.keys(meals).map(meal => (
              <button
                key={meal}
                className={`plate-meal-tab ${activeMeal === meal ? 'active' : ''}`}
                style={activeMeal === meal ? {
                  backgroundColor: mealBg[meal],
                  color: mealColors[meal],
                  borderColor: mealColors[meal]
                } : {}}
                onClick={() => setActiveMeal(meal)}
              >
                {meal.charAt(0).toUpperCase() + meal.slice(1)}
              </button>
            ))}
          </div>

          <div className="plate-content animate-fade-in">

            <div className="plate-left">
              <div className="card plate-visual-card">
                <h3 className="card-section-title">
                  {activeMeal.charAt(0).toUpperCase() + activeMeal.slice(1)} Plate
                </h3>

                <div className="plate-donut-wrap">
                  <svg width="200" height="200" viewBox="0 0 200 200">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="var(--border-light)" strokeWidth="28" />
                    {buildDonut()}
                    <circle cx="100" cy="100" r="56" fill="var(--bg-card)" />
                    <text x="100" y="95" textAnchor="middle" style={{ fill: 'var(--text-primary)', fontSize: '22px', fontWeight: '800' }}>
                      {totalCalories}
                    </text>
                    <text x="100" y="115" textAnchor="middle" style={{ fill: 'var(--text-muted)', fontSize: '11px', fontWeight: '500' }}>
                      kcal
                    </text>
                  </svg>
                </div>

                <div className="plate-macro-legend">
                  {plateSlices.map((s, i) => (
                    <div key={i} className="plate-legend-item">
                      <div className="plate-legend-dot" style={{ backgroundColor: s.color }}></div>
                      <div>
                        <p className="plate-legend-label">{s.label}</p>
                        <p className="plate-legend-value" style={{ color: s.color }}>{s.value}g</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="plate-macro-bars">
                  {plateSlices.map((s, i) => (
                    <div key={i} className="plate-macro-bar-row">
                      <span className="plate-bar-label">{s.label}</span>
                      <div className="plate-bar-track">
                        <div
                          className="plate-bar-fill"
                          style={{
                            width: `${totalMacroGrams > 0 ? (s.value / totalMacroGrams) * 100 : 0}%`,
                            backgroundColor: s.color
                          }}
                        ></div>
                      </div>
                      <span className="plate-bar-pct">
                        {totalMacroGrams > 0 ? Math.round((s.value / totalMacroGrams) * 100) : 0}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {targets && (
                <div className="card plate-targets-card">
                  <h3 className="card-section-title">This meal vs daily target</h3>
                  <div className="plate-targets">
                    {[
                      { label: 'Calories', meal: totalCalories, target: targets.calories, unit: 'kcal' },
                      { label: 'Protein', meal: totalProtein, target: targets.protein, unit: 'g' },
                      { label: 'Carbs', meal: totalCarbs, target: targets.carbs, unit: 'g' },
                      { label: 'Fat', meal: totalFat, target: targets.fat, unit: 'g' }
                    ].map((t, i) => (
                      <div key={i} className="plate-target-row">
                        <div className="plate-target-info">
                          <span className="plate-target-label">{t.label}</span>
                          <span className="plate-target-values">{t.meal} / {t.target}{t.unit}</span>
                        </div>
                        <div className="plate-target-bar-track">
                          <div
                            className="plate-target-bar-fill"
                            style={{
                              width: `${Math.min((t.meal / t.target) * 100, 100)}%`,
                              backgroundColor: t.meal / t.target > 0.9 ? 'var(--accent-peach)' : 'var(--accent-green)'
                            }}
                          ></div>
                        </div>
                        <span className="plate-target-pct">
                          {Math.round((t.meal / t.target) * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                  <p className="plate-target-note">
                    This meal covers roughly {Math.round((totalCalories / targets.calories) * 100)}% of your daily calorie target.
                  </p>
                </div>
              )}
            </div>

            <div className="plate-right">
              <div className="card plate-foods-card">
                <h3 className="card-section-title">What to put on your plate</h3>
                <div className="plate-foods-list">
                  {currentMeal.map((food, i) => (
                    <div key={i} className="plate-food-item">
                      <div className="plate-food-left">
                        <div
                          className="plate-food-number"
                          style={{
                            backgroundColor: mealBg[activeMeal],
                            color: mealColors[activeMeal]
                          }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="plate-food-name">{food.food}</p>
                          <p className="plate-food-amount">{food.amount}</p>
                        </div>
                      </div>
                      <div className="plate-food-macros">
                        <span className="plate-macro-tag protein-tag">{food.protein}g P</span>
                        <span className="plate-macro-tag carbs-tag">{food.carbs}g C</span>
                        <span className="plate-macro-tag fat-tag">{food.fat}g F</span>
                        <span className="plate-food-cal">{food.calories} kcal</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="plate-foods-total">
                  <p className="plate-total-label">Meal Total</p>
                  <div className="plate-total-row">
                    <span className="plate-total-item">{totalCalories} kcal</span>
                    <span className="plate-total-item protein">{totalProtein}g protein</span>
                    <span className="plate-total-item carbs">{totalCarbs}g carbs</span>
                    <span className="plate-total-item fat">{totalFat}g fat</span>
                  </div>
                </div>
              </div>

              <div className="card plate-tips-card">
                <h3 className="card-section-title">
                  {activeMeal.charAt(0).toUpperCase() + activeMeal.slice(1)} tips for {goal.replace('_', ' ')}
                </h3>
                <ul className="plate-tips-list">
                  {goal === 'muscle_gain' && activeMeal === 'breakfast' && <>
                    <li>Eat within 30 to 60 minutes of waking up to stop muscle breakdown overnight.</li>
                    <li>Oats give slow release carbs for sustained energy through your morning.</li>
                    <li>Whole eggs include yolk — that is where the anabolic hormones come from.</li>
                  </>}
                  {goal === 'muscle_gain' && activeMeal === 'lunch' && <>
                    <li>This is your largest meal — eat it 1 to 2 hours before training if you train afternoons.</li>
                    <li>Chicken breast is the most efficient protein source gram for gram.</li>
                    <li>White rice digests faster than brown rice which is useful for pre-workout energy.</li>
                  </>}
                  {goal === 'muscle_gain' && activeMeal === 'dinner' && <>
                    <li>Salmon at night is ideal — the fats slow protein digestion for overnight muscle repair.</li>
                    <li>Eat dinner at least 2 hours before sleep for best digestion and recovery.</li>
                    <li>Casein protein or cottage cheese before bed also works well for overnight recovery.</li>
                  </>}
                  {goal === 'muscle_gain' && activeMeal === 'snack' && <>
                    <li>Post-workout snack should be within 30 to 60 minutes after training.</li>
                    <li>Greek yogurt has both whey and casein protein — great post workout choice.</li>
                    <li>A handful of almonds throughout the day keeps calorie surplus going without effort.</li>
                  </>}
                  {goal === 'fat_loss' && activeMeal === 'breakfast' && <>
                    <li>Egg whites give high protein with almost zero calories — perfect for a deficit.</li>
                    <li>Coffee before training enhances fat burning by 10 to 15 percent.</li>
                    <li>Berries are low sugar, high fibre and high in antioxidants — ideal for cutting.</li>
                  </>}
                  {goal === 'fat_loss' && activeMeal === 'lunch' && <>
                    <li>Eat your biggest meal at lunch when metabolism is highest.</li>
                    <li>Fill half the plate with salad — it adds volume without adding significant calories.</li>
                    <li>Brown rice over white rice keeps you fuller for longer on a cut.</li>
                  </>}
                  {goal === 'fat_loss' && activeMeal === 'dinner' && <>
                    <li>Keep dinner the lightest meal of the day.</li>
                    <li>Fish at night is high protein and low calorie — ideal for fat loss.</li>
                    <li>Avoid carbs late at night if you are in an aggressive deficit.</li>
                  </>}
                  {goal === 'fat_loss' && activeMeal === 'snack' && <>
                    <li>Greek yogurt keeps hunger away for hours due to its casein protein content.</li>
                    <li>Green tea boosts metabolism slightly and suppresses appetite.</li>
                    <li>Keep snacks under 150 calories on a cut — fruit is your best friend here.</li>
                  </>}
                  {goal === 'recomp' && <>
                    <li>Recomposition requires eating at or slightly below maintenance — consistency is everything.</li>
                    <li>Time your carbs around workouts for best body composition results.</li>
                    <li>High protein intake protects muscle while the deficit burns fat simultaneously.</li>
                  </>}
                  {goal === 'endurance' && <>
                    <li>Carbohydrates are your primary fuel — do not restrict them on training days.</li>
                    <li>Hydration matters as much as nutrition for endurance performance.</li>
                    <li>Eat 2 to 3 hours before long sessions so digestion is complete before you train.</li>
                  </>}
                  {goal === 'mobility' && <>
                    <li>Anti-inflammatory foods like salmon, walnuts and berries directly improve joint flexibility.</li>
                    <li>Omega 3 fats reduce joint inflammation and support connective tissue health.</li>
                    <li>Staying well hydrated is critical for fascia flexibility and muscle elasticity.</li>
                  </>}
                </ul>
              </div>
            </div>

          </div>

        </main>
      </div>
    </div>
  )
}

export default PlatePlanner