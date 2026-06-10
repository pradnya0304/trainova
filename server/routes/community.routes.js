const express = require('express')
const router = express.Router()
const { getPosts, createPost, likePost, addComment } = require('../controllers/community.controller')
const protect = require('../middleware/auth.middleware')

router.get('/', protect, getPosts)
router.post('/', protect, createPost)
router.post('/:id/like', protect, likePost)
router.post('/:id/comment', protect, addComment)

module.exports = router