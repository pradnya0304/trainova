const mongoose = require('mongoose')

const foodItemSchema = new mongoose.Schema({
  name: { type: String },
  calories: { type: Number, default: 0 },
  protein: { type: Number, default: 0 },
  carbs: { type: Number, default: 0 },
  fat: { type: Number, default: 0 },
  quantity: { type: String, default: '' }
})

const mealLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: { type: Date, default: Date.now },
  mealType: {
    type: String,
    enum: ['breakfast', 'lunch', 'dinner', 'snack'],
    default: 'breakfast'
  },
  foods: [foodItemSchema],
  totalCalories: { type: Number, default: 0 },
  totalProtein: { type: Number, default: 0 },
  totalCarbs: { type: Number, default: 0 },
  totalFat: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('MealLog', mealLogSchema)