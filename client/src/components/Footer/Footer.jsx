import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-top">
          <div className="footer-brand">
            <h2 className="footer-logo">Trainova</h2>
            <p className="footer-tagline">Your complete health and fitness companion. Train smart, eat right, live better.</p>
          </div>

          <div className="footer-links-group">
            <h4>Features</h4>
            <ul>
              <li><Link to="/bmi">BMI Calculator</Link></li>
              <li><Link to="/workout">Workout Plans</Link></li>
              <li><Link to="/nutrition">Nutrition</Link></li>
              <li><Link to="/progress">Progress Tracker</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Explore</h4>
            <ul>
              <li><Link to="/exercises">Exercise Library</Link></li>
              <li><Link to="/supplements">Supplements</Link></li>
              <li><Link to="/recovery">Recovery</Link></li>
              <li><Link to="/community">Community</Link></li>
            </ul>
          </div>

          <div className="footer-links-group">
            <h4>Account</h4>
            <ul>
              <li><Link to="/dashboard">Dashboard</Link></li>
              <li><Link to="/profile">Profile</Link></li>
              <li><Link to="/aicoach">AI Coach</Link></li>
              <li><Link to="/signup">Get Started</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>2024 Trainova. All rights reserved.</p>
          <p>Built for people who take their health seriously.</p>
        </div>

      </div>
    </footer>
  )
}

export default Footer