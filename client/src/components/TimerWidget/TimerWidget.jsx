import { useState, useEffect, useRef } from 'react'
import { FiPlay, FiPause, FiRefreshCw } from 'react-icons/fi'
import './TimerWidget.css'

const TimerWidget = ({ defaultSeconds = 60 }) => {
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (running && seconds > 0) {
      intervalRef.current = setInterval(() => {
        setSeconds(prev => prev - 1)
      }, 1000)
    } else if (seconds === 0) {
      setRunning(false)
    }

    return () => clearInterval(intervalRef.current)
  }, [running, seconds])

  const toggle = () => setRunning(prev => !prev)

  const reset = () => {
    setRunning(false)
    setSeconds(defaultSeconds)
  }

  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60

  const progress = (seconds / defaultSeconds) * 100

  return (
    <div className="timer-widget">
      <div className="timer-ring">
        <svg viewBox="0 0 100 100" className="timer-svg">
          <circle cx="50" cy="50" r="42" className="timer-track" />
          <circle
            cx="50" cy="50" r="42"
            className="timer-progress"
            strokeDasharray={`${2 * Math.PI * 42}`}
            strokeDashoffset={`${2 * Math.PI * 42 * (1 - progress / 100)}`}
          />
        </svg>
        <div className="timer-display">
          <span className="timer-time">
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </span>
          <span className="timer-label">rest</span>
        </div>
      </div>

      <div className="timer-controls">
        <button className="timer-btn" onClick={toggle}>
          {running ? <FiPause size={18} /> : <FiPlay size={18} />}
        </button>
        <button className="timer-btn reset" onClick={reset}>
          <FiRefreshCw size={16} />
        </button>
      </div>
    </div>
  )
}

export default TimerWidget