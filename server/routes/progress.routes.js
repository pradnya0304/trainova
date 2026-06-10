const express = require('express')
const router = express.Router()
const { getProgress, addProgress, deleteProgress } = require('../controllers/progress.controller')
const protect = require('../middleware/auth.middleware')

router.get('/', protect, getProgress)
router.post('/', protect, addProgress)
router.delete('/:id', protect, deleteProgress)

module.exports = router