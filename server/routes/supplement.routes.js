const express = require('express')
const router = express.Router()
const { getSupplements } = require('../controllers/supplement.controller')
const protect = require('../middleware/auth.middleware')

router.get('/', protect, getSupplements)

module.exports = router