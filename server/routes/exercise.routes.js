const express = require('express')
const router = express.Router()
const { getExercises, getExerciseById } = require('../controllers/exercise.controller')
const protect = require('../middleware/auth.middleware')

router.get('/', protect, getExercises)
router.get('/:id', protect, getExerciseById)

module.exports = router