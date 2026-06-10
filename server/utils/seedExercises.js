const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Exercise = require('../models/Exercise.model')

dotenv.config()

const exercises = [
  { name: 'Push Up', muscleGroup: 'chest', equipment: 'bodyweight', difficulty: 'beginner', category: 'strength', instructions: 'Keep body straight, lower chest to floor, push back up.', tips: 'Keep core tight throughout.' },
  { name: 'Pull Up', muscleGroup: 'back', equipment: 'pull-up bar', difficulty: 'intermediate', category: 'strength', instructions: 'Hang from bar, pull chest up to bar level.', tips: 'Avoid swinging.' },
  { name: 'Squat', muscleGroup: 'legs', equipment: 'bodyweight', difficulty: 'beginner', category: 'strength', instructions: 'Feet shoulder width, lower hips until thighs parallel to floor.', tips: 'Keep knees over toes.' },
  { name: 'Deadlift', muscleGroup: 'back', equipment: 'barbell', difficulty: 'intermediate', category: 'strength', instructions: 'Hinge at hips, keep back flat, lift bar to hip level.', tips: 'Keep bar close to body.' },
  { name: 'Bench Press', muscleGroup: 'chest', equipment: 'barbell', difficulty: 'intermediate', category: 'strength', instructions: 'Lower bar to chest, press back up.', tips: 'Keep feet flat on floor.' },
  { name: 'Plank', muscleGroup: 'core', equipment: 'bodyweight', difficulty: 'beginner', category: 'strength', instructions: 'Hold body straight on forearms and toes.', tips: 'Do not let hips sag.' },
  { name: 'Lunges', muscleGroup: 'legs', equipment: 'bodyweight', difficulty: 'beginner', category: 'strength', instructions: 'Step forward, lower back knee toward floor.', tips: 'Keep front knee behind toes.' },
  { name: 'Shoulder Press', muscleGroup: 'shoulders', equipment: 'dumbbell', difficulty: 'intermediate', category: 'strength', instructions: 'Press dumbbells overhead from shoulder height.', tips: 'Keep core braced.' },
  { name: 'Bicep Curl', muscleGroup: 'arms', equipment: 'dumbbell', difficulty: 'beginner', category: 'strength', instructions: 'Curl dumbbells toward shoulders keeping elbows fixed.', tips: 'Avoid swinging.' },
  { name: 'Tricep Dip', muscleGroup: 'arms', equipment: 'bench', difficulty: 'beginner', category: 'strength', instructions: 'Lower body by bending elbows, push back up.', tips: 'Keep elbows pointing back.' },
  { name: 'Running', muscleGroup: 'full body', equipment: 'none', difficulty: 'beginner', category: 'cardio', instructions: 'Maintain steady pace with relaxed shoulders.', tips: 'Land midfoot not heel.' },
  { name: 'Jumping Jacks', muscleGroup: 'full body', equipment: 'bodyweight', difficulty: 'beginner', category: 'cardio', instructions: 'Jump feet out while raising arms overhead.', tips: 'Keep a steady rhythm.' },
  { name: 'Burpee', muscleGroup: 'full body', equipment: 'bodyweight', difficulty: 'advanced', category: 'cardio', instructions: 'Drop to push up, jump feet in, jump up with arms overhead.', tips: 'Move fast but maintain form.' },
  { name: 'Mountain Climber', muscleGroup: 'core', equipment: 'bodyweight', difficulty: 'intermediate', category: 'cardio', instructions: 'In push up position, drive knees alternately to chest.', tips: 'Keep hips level.' },
  { name: 'Cat Cow Stretch', muscleGroup: 'back', equipment: 'bodyweight', difficulty: 'beginner', category: 'flexibility', instructions: 'On hands and knees, alternate arching and rounding back.', tips: 'Move slowly and breathe.' }
]

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await Exercise.deleteMany()
    await Exercise.insertMany(exercises)
    console.log('Exercises seeded successfully')
    process.exit()
  } catch (error) {
    console.log('Seed error:', error)
    process.exit(1)
  }
}

seedDB()