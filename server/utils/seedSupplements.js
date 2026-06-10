const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Supplement = require('../models/Supplement.model')

dotenv.config()

const supplements = [
  {
    name: 'Creatine Monohydrate',
    category: 'Performance',
    benefits: 'Increases strength, power output and muscle volume. Most researched supplement in existence.',
    dosage: '3 to 5g per day',
    timing: 'Any time, consistency matters more than timing',
    evidenceLevel: 'strong',
    safeForAll: true
  },
  {
    name: 'Whey Protein',
    category: 'Muscle Building',
    benefits: 'Convenient source of high quality protein to hit daily protein targets for muscle growth and recovery.',
    dosage: '25 to 50g per serving',
    timing: 'Post-workout or any time protein intake is low',
    evidenceLevel: 'strong',
    safeForAll: true
  },
  {
    name: 'Caffeine',
    category: 'Performance',
    benefits: 'Improves endurance, strength, focus and reduces perceived effort during exercise.',
    dosage: '3 to 6mg per kg bodyweight',
    timing: '30 to 60 minutes before training',
    evidenceLevel: 'strong',
    safeForAll: true
  },
  {
    name: 'Omega 3 Fish Oil',
    category: 'Health',
    benefits: 'Reduces inflammation, supports joint health, heart health and may slightly improve muscle protein synthesis.',
    dosage: '2 to 3g EPA and DHA combined per day',
    timing: 'With meals',
    evidenceLevel: 'strong',
    safeForAll: true
  },
  {
    name: 'Vitamin D3',
    category: 'Health',
    benefits: 'Supports testosterone levels, bone health, immune function and mood. Most people are deficient.',
    dosage: '2000 to 4000 IU per day',
    timing: 'With food in the morning',
    evidenceLevel: 'strong',
    safeForAll: true
  },
  {
    name: 'Magnesium',
    category: 'Health',
    benefits: 'Improves sleep quality, reduces muscle cramps and supports hundreds of enzymatic reactions in the body.',
    dosage: '200 to 400mg per day',
    timing: 'Before bed',
    evidenceLevel: 'moderate',
    safeForAll: true
  },
  {
    name: 'Beta Alanine',
    category: 'Performance',
    benefits: 'Buffers lactic acid in muscles, improving endurance in high intensity efforts lasting 1 to 4 minutes.',
    dosage: '3.2 to 6.4g per day',
    timing: 'Pre-workout or split across the day',
    evidenceLevel: 'moderate',
    safeForAll: true
  },
  {
    name: 'Citrulline Malate',
    category: 'Performance',
    benefits: 'Improves blood flow, reduces fatigue and may increase training volume. Better than arginine.',
    dosage: '6 to 8g',
    timing: '60 minutes before training',
    evidenceLevel: 'moderate',
    safeForAll: true
  },
  {
    name: 'Zinc',
    category: 'Health',
    benefits: 'Supports testosterone production, immune function and recovery. Often low in people who sweat heavily.',
    dosage: '15 to 30mg per day',
    timing: 'With food',
    evidenceLevel: 'moderate',
    safeForAll: true
  },
  {
    name: 'Ashwagandha',
    category: 'Recovery',
    benefits: 'Reduces cortisol and stress, may improve testosterone levels and recovery from intense training.',
    dosage: '300 to 600mg per day',
    timing: 'With meals or before bed',
    evidenceLevel: 'moderate',
    safeForAll: true
  },
  {
    name: 'BCAAs',
    category: 'Muscle Building',
    benefits: 'Helpful only if you are training fasted or not hitting protein targets. Redundant if protein intake is adequate.',
    dosage: '5 to 10g',
    timing: 'During training if fasted',
    evidenceLevel: 'weak',
    safeForAll: true
  },
  {
    name: 'Pre-Workout Blends',
    category: 'Performance',
    benefits: 'Most benefits come from caffeine alone. Other ingredients are often underdosed. Better to build your own stack.',
    dosage: 'As directed',
    timing: 'Pre-workout',
    evidenceLevel: 'weak',
    safeForAll: true
  }
]

const seedSupplements = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI)
    await Supplement.deleteMany()
    await Supplement.insertMany(supplements)
    console.log('Supplements seeded successfully')
    process.exit()
  } catch (error) {
    console.log('Seed error:', error)
    process.exit(1)
  }
}

seedSupplements()