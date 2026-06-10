export const calculateMacros = (tdee, goal) => {
  let calories = tdee

  if (goal === 'muscle_gain') calories = tdee + 300
  if (goal === 'fat_loss') calories = tdee - 500
  if (goal === 'recomp') calories = tdee

  let protein, carbs, fat

  if (goal === 'muscle_gain') {
    protein = Math.round((calories * 0.30) / 4)
    carbs = Math.round((calories * 0.45) / 4)
    fat = Math.round((calories * 0.25) / 9)
  } else if (goal === 'fat_loss') {
    protein = Math.round((calories * 0.40) / 4)
    carbs = Math.round((calories * 0.30) / 4)
    fat = Math.round((calories * 0.30) / 9)
  } else {
    protein = Math.round((calories * 0.30) / 4)
    carbs = Math.round((calories * 0.40) / 4)
    fat = Math.round((calories * 0.30) / 9)
  }

  return { calories, protein, carbs, fat }
}

export const getGoalLabel = (goal) => {
  const labels = {
    muscle_gain: 'Muscle Gain',
    fat_loss: 'Fat Loss',
    recomp: 'Body Recomposition',
    endurance: 'Endurance',
    mobility: 'Mobility'
  }
  return labels[goal] || goal
}