const mongoose = require('mongoose')

const mealSchema = new mongoose.Schema({
  mealName: { type: String, default: '' },
  foods: [{ type: String }],
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 }
})

const nutritionPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  totalCalories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  dietType: {
    type: String,
    enum: ['standard', 'vegetarian', 'vegan', 'keto', 'paleo'],
    default: 'standard'
  },
  meals: [mealSchema]
}, { timestamps: true })

module.exports = mongoose.model('NutritionPlan', nutritionPlanSchema)