const express = require('express')
const router = express.Router()
const { getNutrition, saveNutrition } = require('../controllers/nutrition.controller')
const protect = require('../middleware/auth.middleware')

router.get('/', protect, getNutrition)
router.post('/', protect, saveNutrition)

module.exports = router