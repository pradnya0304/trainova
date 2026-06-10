const express = require('express')
const router = express.Router()
const { getWorkouts, createWorkout, updateWorkout, deleteWorkout } = require('../controllers/workout.controller')
const protect = require('../middleware/auth.middleware')

router.get('/', protect, getWorkouts)
router.post('/', protect, createWorkout)
router.put('/:id', protect, updateWorkout)
router.delete('/:id', protect, deleteWorkout)

module.exports = router