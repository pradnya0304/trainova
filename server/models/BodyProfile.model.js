const mongoose = require('mongoose')

const bodyProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  age: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  gender: { type: String, default: '' },
  bodyType: { type: String, default: '' },
  goal: { type: String, default: '' },
  activityLevel: { type: String, default: '' },
  bmi: { type: Number, default: 0 },
  bmr: { type: Number, default: 0 },
  tdee: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('BodyProfile', bodyProfileSchema)