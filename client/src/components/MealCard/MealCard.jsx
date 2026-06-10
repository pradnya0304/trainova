import './MealCard.css'

const MealCard = ({ meal }) => {
  return (
    <div className="meal-card animate-fade-in">
      <div className="meal-card-header">
        <h3 className="meal-card-name">{meal.mealName}</h3>
        <span className="meal-calories">{meal.calories} kcal</span>
      </div>

      {meal.foods && meal.foods.length > 0 && (
        <ul className="meal-foods-list">
          {meal.foods.map((food, i) => (
            <li key={i} className="meal-food-item">{food}</li>
          ))}
        </ul>
      )}

      <div className="meal-macros">
        <div className="meal-macro-item">
          <span className="macro-value protein">{meal.protein}g</span>
          <span className="macro-label">Protein</span>
        </div>
        <div className="meal-macro-item">
          <span className="macro-value carbs">{meal.carbs}g</span>
          <span className="macro-label">Carbs</span>
        </div>
        <div className="meal-macro-item">
          <span className="macro-value fat">{meal.fat}g</span>
          <span className="macro-label">Fat</span>
        </div>
      </div>
    </div>
  )
}

export default MealCard