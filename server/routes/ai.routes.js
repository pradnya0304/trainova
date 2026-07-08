const express = require('express')
const router = express.Router()
const protect = require('../middleware/auth.middleware')
const axios = require('axios')

router.post('/chat', protect, async (req, res) => {
  try {
    const { messages, systemPrompt } = req.body

    const contents = messages.map(m => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }))

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`

    const response = await axios.post(url, {
      system_instruction: {
        parts: [{ text: systemPrompt }]
      },
      contents: contents
    })

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response received'
    res.json({ reply })

  } catch (error) {
  console.log('Gemini error:', error.response?.data || error.message)
  
  const status = error.response?.data?.error?.status

  if (status === 'RESOURCE_EXHAUSTED') {
    return res.status(429).json({ 
      message: 'AI Coach is temporarily unavailable due to high usage. Please try again in a few minutes.' 
    })
  }

  res.status(500).json({ message: 'AI service error', error: error.message })
}
})

module.exports = router