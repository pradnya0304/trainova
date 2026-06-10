const Supplement = require('../models/Supplement.model')

const getSupplements = async (req, res) => {
  try {
    const supplements = await Supplement.find()
    res.json(supplements)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getSupplements }