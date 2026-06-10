import './ExerciseCard.css'

const difficultyColor = {
  beginner: 'badge-green',
  intermediate: 'badge-yellow',
  advanced: 'badge-peach'
}

const ExerciseCard = ({ exercise }) => {
  return (
    <div className="exercise-card animate-fade-in">
      <div className="exercise-card-header">
        <h3 className="exercise-card-name">{exercise.name}</h3>
        <span className={`badge ${difficultyColor[exercise.difficulty] || 'badge-green'}`}>
          {exercise.difficulty}
        </span>
      </div>

      <div className="exercise-card-tags">
        <span className="exercise-tag muscle">{exercise.muscleGroup}</span>
        <span className="exercise-tag equipment">{exercise.equipment}</span>
        <span className="exercise-tag category">{exercise.category}</span>
      </div>

      {exercise.instructions && (
        <p className="exercise-card-instructions">{exercise.instructions}</p>
      )}

      {exercise.tips && (
        <p className="exercise-card-tip">Tip: {exercise.tips}</p>
      )}
    </div>
  )
}

export default ExerciseCard