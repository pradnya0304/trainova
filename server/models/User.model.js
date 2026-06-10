const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: ''
  },
  bodyType: {
    type: String,
    enum: ['ectomorph', 'mesomorph', 'endomorph', ''],
    default: ''
  },
  goal: {
    type: String,
    enum: ['muscle_gain', 'fat_loss', 'recomp', 'endurance', 'mobility', ''],
    default: ''
  },
  age: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  weight: { type: Number, default: 0 },
  gender: {
    type: String,
    enum: ['male', 'female', ''],
    default: ''
  },
  activityLevel: {
    type: String,
    enum: ['sedentary', 'light', 'moderate', 'active', 'very_active', ''],
    default: ''
  }
}, { timestamps: true })

module.exports = mongoose.model('User', userSchema)