const Exercise = require('../models/Exercise.model')

// GET ALL EXERCISES
const getExercises = async (req, res) => {
  try {
    const { muscle, equipment, difficulty } = req.query

    let filter = {}
    if (muscle) filter.muscleGroup = muscle
    if (equipment) filter.equipment = equipment
    if (difficulty) filter.difficulty = difficulty

    const exercises = await Exercise.find(filter)
    res.json(exercises)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// GET SINGLE EXERCISE
const getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id)
    if (!exercise) {
      return res.status(404).json({ message: 'Exercise not found' })
    }
    res.json(exercise)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getExercises, getExerciseById }