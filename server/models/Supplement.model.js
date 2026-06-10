const mongoose = require('mongoose')

const supplementSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, default: '' },
  benefits: { type: String, default: '' },
  dosage: { type: String, default: '' },
  timing: { type: String, default: '' },
  evidenceLevel: {
    type: String,
    enum: ['strong', 'moderate', 'weak'],
    default: 'moderate'
  },
  safeForAll: { type: Boolean, default: true }
}, { timestamps: true })

module.exports = mongoose.model('Supplement', supplementSchema)