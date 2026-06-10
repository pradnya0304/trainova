const Community = require('../models/Community.model')

// GET ALL POSTS
const getPosts = async (req, res) => {
  try {
    const posts = await Community.find()
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
    res.json(posts)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// CREATE POST
const createPost = async (req, res) => {
  try {
    const { type, content, tags } = req.body

    const post = await Community.create({
      user: req.user.id,
      type,
      content,
      tags
    })

    res.status(201).json(post)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// LIKE / UNLIKE POST
const likePost = async (req, res) => {
  try {
    const post = await Community.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    const alreadyLiked = post.likes.includes(req.user.id)

    if (alreadyLiked) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id)
    } else {
      post.likes.push(req.user.id)
    }

    await post.save()
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// ADD COMMENT
const addComment = async (req, res) => {
  try {
    const post = await Community.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ message: 'Post not found' })
    }

    post.comments.push({
      user: req.user.id,
      text: req.body.text
    })

    await post.save()
    res.json(post)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getPosts, createPost, likePost, addComment }