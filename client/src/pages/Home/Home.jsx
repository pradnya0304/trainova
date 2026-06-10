import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import './Home.css'

const features = [
  { title: 'BMI & Body Stats', desc: 'Calculate BMI, BMR, TDEE and body fat percentage in one place.', color: 'blue', path: '/bmi' },
  { title: 'Workout Plans', desc: 'Goal based training plans tailored to your body type and fitness level.', color: 'green', path: '/workout' },
  { title: 'Exercise Library', desc: 'Browse hundreds of exercises filtered by muscle, equipment and difficulty.', color: 'purple', path: '/exercises' },
  { title: 'Nutrition Planner', desc: 'Personalised meal plans with macro targets based on your goals.', color: 'yellow', path: '/nutrition' },
  { title: 'Progress Tracker', desc: 'Log your weight and measurements and visualise your progress over time.', color: 'peach', path: '/progress' },
  { title: 'AI Coach', desc: 'Chat with your personal AI coach that knows your full fitness profile.', color: 'green', path: '/aicoach' },
  { title: 'Recovery Guide', desc: 'Sleep, deload weeks, stretching and injury prevention tips.', color: 'blue', path: '/recovery' },
  { title: 'Supplements', desc: 'Evidence based supplement guide with dosing and timing information.', color: 'purple', path: '/supplements' }
]

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      <section className="hero-section">
        <div className="hero-content animate-fade-in">
          <span className="hero-badge badge badge-green">All in one fitness platform</span>
          <h1 className="hero-title">
            Train smarter.<br />
            Eat better.<br />
            <span className="hero-title-accent">Live stronger.</span>
          </h1>
          <p className="hero-desc">
            Trainova combines workout planning, nutrition tracking, body analysis and AI coaching into one clean platform. Built around your body type and goals.
          </p>
          <div className="hero-actions">
            <Link to="/signup" className="btn-primary hero-btn">Get Started Free</Link>
            <Link to="/login" className="btn-secondary hero-btn">Log In</Link>
          </div>
        </div>
        <div className="hero-visual animate-fade-in-right">
          <div className="hero-card-stack">
            <div className="hero-stat-card card">
              <p className="hero-stat-label">Daily Calories</p>
              <p className="hero-stat-value">2,340 kcal</p>
              <div className="hero-stat-bar">
                <div className="hero-stat-fill" style={{ width: '72%', backgroundColor: 'var(--accent-green)' }}></div>
              </div>
            </div>
            <div className="hero-stat-card card">
              <p className="hero-stat-label">Workout Streak</p>
              <p className="hero-stat-value">14 days</p>
              <div className="hero-stat-bar">
                <div className="hero-stat-fill" style={{ width: '85%', backgroundColor: 'var(--accent-blue)' }}></div>
              </div>
            </div>
            <div className="hero-stat-card card">
              <p className="hero-stat-label">Goal Progress</p>
              <p className="hero-stat-value">Muscle Gain</p>
              <div className="hero-stat-bar">
                <div className="hero-stat-fill" style={{ width: '55%', backgroundColor: 'var(--accent-purple)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <p className="features-subtitle">Everything you need</p>
        <h2 className="features-title">One platform, every tool</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <Link to={f.path} key={i} className={`feature-card feature-${f.color}`}>
              <h3 className="feature-title">{f.title}</h3>
              <p className="feature-desc">{f.desc}</p>
              <span className="feature-link">Explore &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-card card">
          <h2>Ready to start your transformation?</h2>
          <p>Create your free account and get a personalised plan in minutes.</p>
          <Link to="/signup" className="btn-primary">Get Started Free</Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default Home