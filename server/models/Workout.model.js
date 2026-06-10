const mongoose = require('mongoose')

const exerciseInWorkoutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, default: 3 },
  reps: { type: Number, default: 10 },
  weight: { type: Number, default: 0 },
  muscleGroup: { type: String, default: '' },
  notes: { type: String, default: '' }
})

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  goal: { type: String, default: '' },
  day: { type: String, default: '' },
  exercises: [exerciseInWorkoutSchema],
  duration: { type: Number, default: 0 },
  completed: { type: Boolean, default: false }
}, { timestamps: true })

module.exports = mongoose.model('Workout', workoutSchema)