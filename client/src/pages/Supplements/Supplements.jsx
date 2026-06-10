import { useState, useEffect } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import api from '../../services/api'
import './Supplements.css'

const evidenceBadge = { strong: 'badge-green', moderate: 'badge-yellow', weak: 'badge-peach' }

const Supplements = () => {
  const [supplements, setSupplements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/supplement')
      .then(res => setSupplements(res.data))
      .catch(err => console.log(err))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="supplements-page">
      <Navbar />
      <div className="supplements-layout">
        <Sidebar />
        <main className="supplements-main">

          <div className="animate-fade-in">
            <h1 className="section-title">Supplement Guide</h1>
            <p className="section-subtitle">Evidence based supplement information only. No sponsored content. Ranked by how well the science supports them.</p>
          </div>

          <div className="evidence-legend card animate-fade-in">
            <p className="legend-title">Evidence Level</p>
            <div className="legend-items">
              <span className="badge badge-green">Strong</span>
              <span className="legend-desc">Multiple high quality studies support this</span>
              <span className="badge badge-yellow">Moderate</span>
              <span className="legend-desc">Some evidence, worth considering</span>
              <span className="badge badge-peach">Weak</span>
              <span className="legend-desc">Limited or mixed evidence</span>
            </div>
          </div>

          {loading ? (
            <div className="spinner" style={{ margin: '40px auto' }}></div>
          ) : (
            <div className="supplements-grid animate-fade-in">
              {supplements.map((s, i) => (
                <div key={i} className="supplement-card card">
                  <div className="supplement-card-header">
                    <div>
                      <h3 className="supplement-name">{s.name}</h3>
                      <span className="supplement-category">{s.category}</span>
                    </div>
                    <span className={`badge ${evidenceBadge[s.evidenceLevel]}`}>{s.evidenceLevel}</span>
                  </div>
                  <p className="supplement-benefits">{s.benefits}</p>
                  <div className="supplement-details">
                    <div className="supplement-detail">
                      <p className="detail-label">Dosage</p>
                      <p className="detail-value">{s.dosage}</p>
                    </div>
                    <div className="supplement-detail">
                      <p className="detail-label">Timing</p>
                      <p className="detail-value">{s.timing}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default Supplements