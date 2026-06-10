const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' })
  }

  if (password.length < 6) {
    return res.status(400).json({ message: 'Password must be at least 6 characters' })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: 'Please enter a valid email' })
  }

  next()
}

const validateLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !password) {
    return res.status(400).json({ message: 'Please fill all fields' })
  }

  next()
}

module.exports = { validateRegister, validateLogin }