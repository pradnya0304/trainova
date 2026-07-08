import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import useAuth from '../../hooks/useAuth'
import api from '../../services/api'
import './AICoach.css'

const suggestions = [
  'What should I eat before a workout?',
  'How many rest days do I need per week?',
  'What is the best split for muscle gain?',
  'How do I break through a plateau?',
  'Should I do cardio on rest days?',
  'How much protein do I need daily?'
]

const AICoach = () => {
  const { user } = useAuth()
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hi ${user?.name?.split(' ')[0] || 'there'}! I am your Trainova AI Coach. I know your profile and goals. Ask me anything about training, nutrition, recovery or supplements.`
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const buildContext = () => {
    return `You are a professional fitness coach inside the Trainova app. The user's name is ${user?.name || 'the user'}. Their goal is ${user?.goal?.replace('_', ' ') || 'not set'}. Their body type is ${user?.bodyType || 'not set'}. Their activity level is ${user?.activityLevel?.replace('_', ' ') || 'not set'}. Age: ${user?.age || 'unknown'}. Weight: ${user?.weight || 'unknown'} kg. Height: ${user?.height || 'unknown'} cm. Give concise, practical and personalised fitness advice. Keep answers clear and under 200 words.`
  }

  const sendMessage = async (text) => {
    const userMessage = text || input
    if (!userMessage.trim()) return

    const newMessages = [...messages, { role: 'user', text: userMessage }]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const chatHistory = newMessages
        .filter((m, i) => !(i === 0 && m.role === 'assistant'))
        .map(m => ({
          role: m.role === 'user' ? 'user' : 'assistant',
          content: m.text
        }))

      const res = await api.post('/ai/chat', {
        systemPrompt: buildContext(),
        messages: chatHistory
      })

      setMessages(prev => [...prev, { role: 'assistant', text: res.data.reply }])

  } catch (err) {
  const errorMsg = err.response?.data?.message || 'Sorry I could not get a response right now. Please try again.'
  setMessages(prev => [...prev, { role: 'assistant', text: errorMsg }])
} finally {
  setLoading(false)
}
  }

  return (
    <div className="aicoach-page">
      <Navbar />
      <div className="aicoach-layout">
        <Sidebar />
        <main className="aicoach-main">

          <div className="animate-fade-in">
            <h1 className="section-title">AI Coach</h1>
            <p className="section-subtitle">Your personal fitness coach powered by AI. Knows your profile and goals.</p>
          </div>

          <div className="aicoach-container animate-fade-in">
            <div className="chat-window">
              <div className="chat-messages">
                {messages.map((msg, i) => (
                  <div key={i} className={`chat-bubble ${msg.role}`}>
                    {msg.role === 'assistant' && (
                      <div className="coach-avatar">T</div>
                    )}
                    <div className={`bubble-text ${msg.role}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="chat-bubble assistant">
                    <div className="coach-avatar">T</div>
                    <div className="bubble-text assistant typing">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                )}
              </div>

              <div className="chat-input-area">
                <input
                  className="chat-input"
                  placeholder="Ask your coach anything..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !loading && sendMessage()}
                />
                <button
                  className="btn-primary chat-send-btn"
                  onClick={() => sendMessage()}
                  disabled={loading}
                >
                  {loading ? <span className="spinner" style={{ width: '16px', height: '16px' }}></span> : 'Send'}
                </button>
              </div>
            </div>

            <div className="coach-sidebar">
              <div className="card coach-profile-card">
                <div className="coach-profile-avatar">T</div>
                <h3 className="coach-profile-name">Trainova Coach</h3>
                <p className="coach-profile-desc">AI powered personal trainer with full knowledge of your profile and goals</p>
              </div>

              <div className="card">
                <h4 className="suggestions-title">Suggested Questions</h4>
                <div className="suggestions-list">
                  {suggestions.map((s, i) => (
                    <button key={i} className="suggestion-btn" onClick={() => !loading && sendMessage(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default AICoach