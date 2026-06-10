const ProgressEntry = require('../models/ProgressEntry.model')

// GET ALL PROGRESS ENTRIES
const getProgress = async (req, res) => {
  try {
    const entries = await ProgressEntry.find({ user: req.user.id }).sort({ date: -1 })
    res.json(entries)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// ADD PROGRESS ENTRY
const addProgress = async (req, res) => {
  try {
    const { date, weight, bodyFat, chest, waist, hips, arms, legs, notes } = req.body

    const entry = await ProgressEntry.create({
      user: req.user.id,
      date, weight, bodyFat,
      chest, waist, hips, arms, legs,
      notes
    })

    res.status(201).json(entry)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// DELETE PROGRESS ENTRY
const deleteProgress = async (req, res) => {
  try {
    await ProgressEntry.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    res.json({ message: 'Entry deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getProgress, addProgress, deleteProgress }