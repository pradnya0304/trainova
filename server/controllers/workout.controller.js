const Workout = require('../models/Workout.model')

// GET ALL WORKOUTS FOR USER
const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(workouts)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// CREATE WORKOUT
const createWorkout = async (req, res) => {
  try {
    const { name, goal, day, exercises, duration } = req.body

    const workout = await Workout.create({
      user: req.user.id,
      name,
      goal,
      day,
      exercises,
      duration
    })

    res.status(201).json(workout)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// UPDATE WORKOUT
const updateWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    )

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }

    res.json(workout)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// DELETE WORKOUT
const deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    })

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' })
    }

    res.json({ message: 'Workout deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getWorkouts, createWorkout, updateWorkout, deleteWorkout }