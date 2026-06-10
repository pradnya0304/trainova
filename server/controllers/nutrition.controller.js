const NutritionPlan = require('../models/NutritionPlan.model')

// GET NUTRITION PLAN
const getNutrition = async (req, res) => {
  try {
    const plan = await NutritionPlan.findOne({ user: req.user.id })
    res.json(plan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// CREATE OR UPDATE NUTRITION PLAN
const saveNutrition = async (req, res) => {
  try {
    const { totalCalories, protein, carbs, fat, dietType, meals } = req.body

    let plan = await NutritionPlan.findOne({ user: req.user.id })

    if (plan) {
      plan = await NutritionPlan.findOneAndUpdate(
        { user: req.user.id },
        { totalCalories, protein, carbs, fat, dietType, meals },
        { new: true }
      )
    } else {
      plan = await NutritionPlan.create({
        user: req.user.id,
        totalCalories, protein, carbs, fat, dietType, meals
      })
    }

    res.json(plan)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getNutrition, saveNutrition }