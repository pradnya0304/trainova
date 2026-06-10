// Calculate BMI
const calculateBMI = (weight, height) => {
  // weight in kg, height in cm
  const heightInMeters = height / 100
  const bmi = weight / (heightInMeters * heightInMeters)
  return parseFloat(bmi.toFixed(1))
}

// Get BMI category
const getBMICategory = (bmi) => {
  if (bmi < 18.5) return 'Underweight'
  if (bmi < 25) return 'Normal weight'
  if (bmi < 30) return 'Overweight'
  return 'Obese'
}

// Calculate BMR using Mifflin-St Jeor
const calculateBMR = (weight, height, age, gender) => {
  if (gender === 'male') {
    return Math.round(10 * weight + 6.25 * height - 5 * age + 5)
  } else {
    return Math.round(10 * weight + 6.25 * height - 5 * age - 161)
  }
}

// Calculate TDEE
const calculateTDEE = (bmr, activityLevel) => {
  const multipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  }
  return Math.round(bmr * (multipliers[activityLevel] || 1.2))
}

module.exports = { calculateBMI, getBMICategory, calculateBMR, calculateTDEE }