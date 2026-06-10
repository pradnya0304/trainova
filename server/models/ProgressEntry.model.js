const mongoose = require('mongoose')

const progressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  weight: { type: Number, default: 0 },
  bodyFat: { type: Number, default: 0 },
  chest: { type: Number, default: 0 },
  waist: { type: Number, default: 0 },
  hips: { type: Number, default: 0 },
  arms: { type: Number, default: 0 },
  legs: { type: Number, default: 0 },
  notes: { type: String, default: '' }
}, { timestamps: true })

module.exports = mongoose.model('ProgressEntry', progressSchema)