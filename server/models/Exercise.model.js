const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  muscleGroup: { type: String, required: true },
  equipment: { type: String, default: 'bodyweight' },
  difficulty: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  instructions: { type: String, default: '' },
  tips: { type: String, default: '' },
  category: {
    type: String,
    enum: ['strength', 'cardio', 'flexibility', 'mobility'],
    default: 'strength'
  }
}, { timestamps: true })

module.exports = mongoose.model('Exercise', exerciseSchema)