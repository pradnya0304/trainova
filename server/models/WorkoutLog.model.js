const mongoose = require('mongoose')

const setSchema = new mongoose.Schema({
  setNumber: { type: Number },
  reps: { type: Number },
  weight: { type: Number, default: 0 }
})

const loggedExerciseSchema = new mongoose.Schema({
  exerciseName: { type: String },
  sets: [setSchema]
})

const workoutLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  workoutName: { type: String, default: '' },
  date: { type: Date, default: Date.now },
  exercises: [loggedExerciseSchema],
  duration: { type: Number, default: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('WorkoutLog', workoutLogSchema)