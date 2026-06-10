import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import './MacroRing.css'

const MacroRing = ({ protein, carbs, fat }) => {
  const data = [
    { name: 'Protein', value: protein, color: '#7aafd4' },
    { name: 'Carbs', value: carbs, color: '#d4b87a' },
    { name: 'Fat', value: fat, color: '#e8a598' }
  ]

  const total = protein + carbs + fat

  return (
    <div className="macro-ring">
      <div className="macro-ring-chart">
        <ResponsiveContainer width="100%" height={180}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '13px'
              }}
              formatter={(value) => [`${value}g`]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="macro-ring-center">
          <span className="macro-total-value">{total}g</span>
          <span className="macro-total-label">total</span>
        </div>
      </div>

      <div className="macro-ring-legend">
        {data.map((item, i) => (
          <div key={i} className="macro-legend-item">
            <span className="macro-dot" style={{ backgroundColor: item.color }}></span>
            <span className="macro-legend-name">{item.name}</span>
            <span className="macro-legend-value">{item.value}g</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MacroRing