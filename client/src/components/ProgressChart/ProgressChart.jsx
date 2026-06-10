import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import './ProgressChart.css'

const ProgressChart = ({ data, dataKey = 'weight', color = '#7db98a', label = 'Weight (kg)' }) => {
  if (!data || data.length === 0) {
    return (
      <div className="chart-empty">
        <p>No data yet. Start logging your progress.</p>
      </div>
    )
  }

  const formatted = data.map(entry => ({
    ...entry,
    date: new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }))

  return (
    <div className="progress-chart">
      <p className="chart-label">{label}</p>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart data={formatted} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-light)" />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 11, fill: 'var(--text-muted)' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              fontSize: '13px',
              color: 'var(--text-primary)'
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2.5}
            dot={{ fill: color, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

export default ProgressChart