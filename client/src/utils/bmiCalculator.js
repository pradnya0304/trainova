export const calculateBMI = (weight, height) => {
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  return parseFloat(bmi.toFixed(1))
}

export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

export const getBMIColor = (bmi) => {
  if (bmi < 18.5) return 'var(--accent-blue)'
  if (bmi < 25) return 'var(--accent-green)'
  if (bmi < 30) return 'var(--accent-yellow)'
  return 'var(--accent-peach)'
}