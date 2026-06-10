import { FiTrash2, FiClock, FiTarget } from 'react-icons/fi'
import './WorkoutCard.css'

const WorkoutCard = ({ workout, onDelete }) => {
  return (
    <div className="workout-card animate-fade-in">
      <div className="workout-card-header">
        <div>
          <h3 className="workout-card-title">{workout.name}</h3>
          {workout.day && <p className="workout-card-day">{workout.day}</p>}
        </div>
        {onDelete && (
          <button className="workout-card-delete" onClick={() => onDelete(workout._id)}>
            <FiTrash2 size={16} />
          </button>
        )}
      </div>

      <div className="workout-card-meta">
        {workout.goal && (
          <span className="workout-meta-item">
            <FiTarget size={13} />
            {workout.goal.replace('_', ' ')}
          </span>
        )}
        {workout.duration > 0 && (
          <span className="workout-meta-item">
            <FiClock size={13} />
            {workout.duration} min
          </span>
        )}
      </div>

      {workout.exercises && workout.exercises.length > 0 && (
        <ul className="workout-exercise-list">
          {workout.exercises.slice(0, 4).map((ex, i) => (
            <li key={i} className="workout-exercise-item">
              <span className="exercise-name">{ex.name}</span>
              <span className="exercise-detail">{ex.sets} x {ex.reps}</span>
            </li>
          ))}
          {workout.exercises.length > 4 && (
            <li className="workout-exercise-more">
              +{workout.exercises.length - 4} more exercises
            </li>
          )}
        </ul>
      )}
    </div>
  )
}

export default WorkoutCard