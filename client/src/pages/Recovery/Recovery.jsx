import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import './Recovery.css'

const tips = [
  { title: 'Sleep 7 to 9 Hours', desc: 'Muscle repair and growth hormone release peak during deep sleep. Poor sleep directly reduces strength gains and fat loss.', color: 'blue' },
  { title: 'Hydration', desc: 'Drink at least 3 to 4 litres of water per day. Even 2% dehydration can impair performance significantly.', color: 'green' },
  { title: 'Active Recovery Days', desc: 'Light walking, swimming or cycling on rest days improves blood flow to muscles and speeds recovery without adding stress.', color: 'yellow' },
  { title: 'Deload Weeks', desc: 'Every 4 to 6 weeks, reduce training volume by 40 to 50%. This prevents overtraining and allows accumulated fatigue to clear.', color: 'peach' },
  { title: 'Foam Rolling', desc: 'Spend 10 to 15 minutes on a foam roller post-workout targeting the major muscle groups you trained.', color: 'purple' },
  { title: 'Protein Timing', desc: 'Consume 20 to 40g of protein within 2 hours post-workout to maximise muscle protein synthesis.', color: 'green' }
]

const stretches = [
  { name: 'Hip Flexor Stretch', duration: '30 sec each side', muscle: 'hips' },
  { name: 'Chest Doorway Stretch', duration: '30 sec', muscle: 'chest' },
  { name: 'Hamstring Stretch', duration: '30 sec each side', muscle: 'legs' },
  { name: 'Thoracic Spine Rotation', duration: '10 reps each side', muscle: 'back' },
  { name: 'Child Pose', duration: '60 sec', muscle: 'back' },
  { name: 'Shoulder Cross Body Stretch', duration: '30 sec each side', muscle: 'shoulders' },
  { name: 'Quad Stretch', duration: '30 sec each side', muscle: 'legs' },
  { name: 'Pigeon Pose', duration: '60 sec each side', muscle: 'hips' }
]

const Recovery = () => {
  return (
    <div className="recovery-page">
      <Navbar />
      <div className="recovery-layout">
        <Sidebar />
        <main className="recovery-main">

          <div className="animate-fade-in">
            <h1 className="section-title">Recovery Guide</h1>
            <p className="section-subtitle">Recovery is where the real gains happen. Sleep, rest and mobility matter as much as training.</p>
          </div>

          <div className="recovery-tips-grid animate-fade-in">
            {tips.map((tip, i) => (
              <div key={i} className={`recovery-tip-card card tip-${tip.color}`}>
                <h3 className="tip-title">{tip.title}</h3>
                <p className="tip-desc">{tip.desc}</p>
              </div>
            ))}
          </div>

          <div className="card animate-fade-in">
            <h3 className="card-section-title">Post Workout Stretching Routine</h3>
            <p className="section-subtitle" style={{ marginBottom: '20px' }}>Spend 10 to 15 minutes on these stretches after every session</p>
            <div className="stretches-grid">
              {stretches.map((s, i) => (
                <div key={i} className="stretch-item">
                  <div className="stretch-number">{i + 1}</div>
                  <div>
                    <p className="stretch-name">{s.name}</p>
                    <p className="stretch-meta">{s.duration} &middot; {s.muscle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="recovery-deload card animate-fade-in">
            <h3 className="card-section-title">Deload Week Planner</h3>
            <p className="section-subtitle">Every 4 to 6 weeks, take a deload. Here is how:</p>
            <div className="deload-grid">
              <div className="deload-item">
                <p className="deload-label">Volume</p>
                <p className="deload-value">Cut by 40 to 50%</p>
                <p className="deload-desc">Do half the sets you normally do</p>
              </div>
              <div className="deload-item">
                <p className="deload-label">Intensity</p>
                <p className="deload-value">Drop to 60% of max weight</p>
                <p className="deload-desc">Focus on form and feel</p>
              </div>
              <div className="deload-item">
                <p className="deload-label">Frequency</p>
                <p className="deload-value">2 to 3 sessions that week</p>
                <p className="deload-desc">Shorter sessions are fine</p>
              </div>
              <div className="deload-item">
                <p className="deload-label">Sleep</p>
                <p className="deload-value">Prioritise 8 to 9 hours</p>
                <p className="deload-desc">This is when the body resets</p>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  )
}

export default Recovery