const User = require('../models/User.model')

// GET USER PROFILE
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

// UPDATE USER PROFILE
const updateProfile = async (req, res) => {
  try {
    const { name, age, height, weight, gender, bodyType, goal, activityLevel } = req.body

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { name, age, height, weight, gender, bodyType, goal, activityLevel },
      { new: true }
    ).select('-password')

    res.json(user)
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message })
  }
}

module.exports = { getProfile, updateProfile }