import './GoalBadge.css'

const goalConfig = {
  muscle_gain: { label: 'Muscle Gain', className: 'badge-green' },
  fat_loss: { label: 'Fat Loss', className: 'badge-peach' },
  recomp: { label: 'Recomposition', className: 'badge-blue' },
  endurance: { label: 'Endurance', className: 'badge-yellow' },
  mobility: { label: 'Mobility', className: 'badge-purple' }
}

const GoalBadge = ({ goal }) => {
  const config = goalConfig[goal] || { label: goal, className: 'badge-green' }

  return (
    <span className={`badge ${config.className} goal-badge`}>
      {config.label}
    </span>
  )
}

export default GoalBadge