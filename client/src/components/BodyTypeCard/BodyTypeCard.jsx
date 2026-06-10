import './BodyTypeCard.css'

const bodyTypeInfo = {
  ectomorph: {
    title: 'Ectomorph',
    description: 'Naturally lean and slim. Fast metabolism, hard to gain weight or muscle.',
    traits: ['Fast metabolism', 'Slim frame', 'Low body fat', 'Hard gainer'],
    tip: 'Focus on calorie surplus and heavy compound lifts.',
    color: 'blue'
  },
  mesomorph: {
    title: 'Mesomorph',
    description: 'Athletic and muscular build. Responds well to both training and diet.',
    traits: ['Athletic build', 'Gains muscle easily', 'Burns fat well', 'Strong frame'],
    tip: 'Balance strength training with cardio for best results.',
    color: 'green'
  },
  endomorph: {
    title: 'Endomorph',
    description: 'Naturally broader build. Tends to store fat more easily.',
    traits: ['Broad frame', 'High strength', 'Slow metabolism', 'Fat prone'],
    tip: 'Prioritize cardio and maintain a moderate calorie deficit.',
    color: 'peach'
  }
}

const BodyTypeCard = ({ bodyType, selected, onClick }) => {
  const info = bodyTypeInfo[bodyType]
  if (!info) return null

  return (
    <div
      className={`body-type-card body-type-${info.color} ${selected ? 'selected' : ''}`}
      onClick={() => onClick && onClick(bodyType)}
    >
      <h3 className="body-type-title">{info.title}</h3>
      <p className="body-type-desc">{info.description}</p>
      <ul className="body-type-traits">
        {info.traits.map((trait, i) => (
          <li key={i}>{trait}</li>
        ))}
      </ul>
      <p className="body-type-tip">{info.tip}</p>
    </div>
  )
}

export default BodyTypeCard