import { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Sidebar from '../../components/Sidebar/Sidebar'
import useAuth from '../../hooks/useAuth'
import './WorkoutSplit.css'

const splitData = {
  muscle_gain: {
    ectomorph: {
      3: {
        name: 'Full Body 3x',
        description: 'As an ectomorph focused on muscle gain, full body training 3 days a week maximises muscle stimulation frequency while allowing enough recovery to actually grow.',
        days: [
          { day: 'Monday', focus: 'Full Body A', exercises: ['Squat 4x6', 'Bench Press 4x6', 'Bent Over Row 4x6', 'Overhead Press 3x8', 'Bicep Curl 3x10'] },
          { day: 'Wednesday', focus: 'Full Body B', exercises: ['Deadlift 4x5', 'Incline Press 4x8', 'Pull Up 4x6', 'Lateral Raise 3x12', 'Tricep Dip 3x10'] },
          { day: 'Friday', focus: 'Full Body C', exercises: ['Front Squat 4x6', 'Dumbbell Press 4x8', 'Cable Row 4x8', 'Face Pull 3x15', 'Hammer Curl 3x10'] }
        ]
      },
      4: {
        name: 'Upper Lower Split',
        description: 'Upper lower split gives ectomorphs high frequency on all muscle groups twice a week with enough volume to stimulate growth.',
        days: [
          { day: 'Monday', focus: 'Upper A', exercises: ['Bench Press 4x6', 'Bent Over Row 4x6', 'Overhead Press 3x8', 'Pull Up 3x6', 'Bicep Curl 3x10', 'Tricep Pushdown 3x10'] },
          { day: 'Tuesday', focus: 'Lower A', exercises: ['Squat 4x6', 'Romanian Deadlift 4x8', 'Leg Press 3x10', 'Leg Curl 3x10', 'Calf Raise 4x15'] },
          { day: 'Thursday', focus: 'Upper B', exercises: ['Incline Press 4x8', 'Cable Row 4x8', 'Dumbbell Shoulder Press 3x10', 'Lat Pulldown 3x8', 'Face Pull 3x15', 'Hammer Curl 3x10'] },
          { day: 'Friday', focus: 'Lower B', exercises: ['Deadlift 4x5', 'Hack Squat 3x10', 'Walking Lunge 3x12', 'Leg Extension 3x12', 'Standing Calf Raise 4x15'] }
        ]
      },
      5: {
        name: 'Push Pull Legs',
        description: 'PPL is ideal for ectomorphs who want to maximise volume per muscle group while training frequently enough to keep the muscle building signal high.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 4x6', 'Overhead Press 4x8', 'Incline Dumbbell Press 3x10', 'Lateral Raise 3x12', 'Tricep Pushdown 3x12', 'Overhead Tricep Extension 3x12'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 4x5', 'Pull Up 4x6', 'Bent Over Row 4x8', 'Lat Pulldown 3x10', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs', exercises: ['Squat 4x6', 'Romanian Deadlift 4x8', 'Leg Press 3x10', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Friday', focus: 'Push', exercises: ['Incline Bench 4x8', 'Dumbbell Shoulder Press 4x10', 'Cable Fly 3x12', 'Lateral Raise 3x15', 'Tricep Dip 3x10'] },
          { day: 'Saturday', focus: 'Pull', exercises: ['Rack Pull 4x6', 'Cable Row 4x8', 'Single Arm Row 3x10', 'Hammer Curl 3x12', 'Reverse Curl 3x12'] }
        ]
      },
      6: {
        name: 'Push Pull Legs 2x',
        description: 'Double PPL for ectomorphs who want maximum volume and frequency. Each muscle gets hit twice per week.',
        days: [
          { day: 'Monday', focus: 'Push A', exercises: ['Bench Press 4x6', 'Overhead Press 4x8', 'Incline Press 3x10', 'Lateral Raise 3x12', 'Tricep Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Pull A', exercises: ['Deadlift 4x5', 'Pull Up 4x6', 'Bent Over Row 4x8', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs A', exercises: ['Squat 4x6', 'Romanian Deadlift 4x8', 'Leg Press 3x10', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Thursday', focus: 'Push B', exercises: ['Incline Bench 4x8', 'Dumbbell Shoulder Press 4x10', 'Cable Fly 3x12', 'Lateral Raise 3x15', 'Overhead Tricep Extension 3x12'] },
          { day: 'Friday', focus: 'Pull B', exercises: ['Rack Pull 4x6', 'Lat Pulldown 4x8', 'Cable Row 3x10', 'Hammer Curl 3x12', 'Reverse Fly 3x15'] },
          { day: 'Saturday', focus: 'Legs B', exercises: ['Front Squat 4x6', 'Hack Squat 3x10', 'Walking Lunge 3x12', 'Leg Extension 3x12', 'Seated Calf Raise 4x15'] }
        ]
      }
    },
    mesomorph: {
      3: {
        name: 'Full Body Power',
        description: 'Mesomorphs respond extremely well to heavy compound movements. Full body 3x with progressive overload will pack on serious muscle fast.',
        days: [
          { day: 'Monday', focus: 'Full Body A', exercises: ['Squat 5x5', 'Bench Press 5x5', 'Deadlift 3x5', 'Pull Up 4x6', 'Overhead Press 3x8'] },
          { day: 'Wednesday', focus: 'Full Body B', exercises: ['Front Squat 4x6', 'Incline Press 4x6', 'Rack Pull 4x5', 'Weighted Dip 4x6', 'Barbell Row 4x6'] },
          { day: 'Friday', focus: 'Full Body C', exercises: ['Romanian Deadlift 4x6', 'Close Grip Bench 4x8', 'T-Bar Row 4x8', 'Bulgarian Split Squat 3x8', 'Arnold Press 3x10'] }
        ]
      },
      4: {
        name: 'Upper Lower Power',
        description: 'Upper lower with heavy loads. Mesomorphs thrive on this split with a mix of strength and hypertrophy work.',
        days: [
          { day: 'Monday', focus: 'Upper Strength', exercises: ['Bench Press 5x5', 'Barbell Row 5x5', 'Overhead Press 4x6', 'Weighted Pull Up 4x6', 'Bicep Curl 3x10', 'Tricep Pushdown 3x10'] },
          { day: 'Tuesday', focus: 'Lower Strength', exercises: ['Squat 5x5', 'Deadlift 4x4', 'Bulgarian Split Squat 3x8', 'Leg Curl 3x10', 'Calf Raise 4x12'] },
          { day: 'Thursday', focus: 'Upper Hypertrophy', exercises: ['Incline Bench 4x8', 'Cable Row 4x10', 'Dumbbell Shoulder Press 3x12', 'Lat Pulldown 3x10', 'Face Pull 3x15', 'Hammer Curl 3x12'] },
          { day: 'Friday', focus: 'Lower Hypertrophy', exercises: ['Front Squat 4x8', 'Romanian Deadlift 4x10', 'Leg Press 3x12', 'Leg Extension 3x15', 'Seated Calf Raise 4x15'] }
        ]
      },
      5: {
        name: 'Push Pull Legs',
        description: 'Classic PPL perfectly suits mesomorphs. High volume with heavy weights will maximise their natural ability to build muscle.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 5x5', 'Overhead Press 4x6', 'Incline Dumbbell Press 3x10', 'Lateral Raise 4x12', 'Tricep Pushdown 3x12', 'Dips 3x10'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 5x4', 'Weighted Pull Up 4x6', 'Barbell Row 4x8', 'Cable Row 3x10', 'Face Pull 3x15', 'Bicep Curl 4x10'] },
          { day: 'Wednesday', focus: 'Legs', exercises: ['Squat 5x5', 'Romanian Deadlift 4x8', 'Leg Press 4x10', 'Leg Curl 3x12', 'Leg Extension 3x12', 'Calf Raise 4x15'] },
          { day: 'Friday', focus: 'Push', exercises: ['Incline Bench 4x8', 'Dumbbell Shoulder Press 4x10', 'Pec Deck 3x12', 'Lateral Raise 3x15', 'Skull Crusher 3x12'] },
          { day: 'Saturday', focus: 'Pull', exercises: ['Rack Pull 4x5', 'Lat Pulldown 4x8', 'Single Arm Row 3x10', 'Rear Delt Fly 3x15', 'Hammer Curl 4x10'] }
        ]
      },
      6: {
        name: 'Push Pull Legs 2x',
        description: 'Maximum frequency and volume for mesomorphs. This is the optimal split for serious muscle building.',
        days: [
          { day: 'Monday', focus: 'Push A', exercises: ['Bench Press 5x5', 'Overhead Press 4x6', 'Incline Press 3x10', 'Lateral Raise 3x12', 'Tricep Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Pull A', exercises: ['Deadlift 5x4', 'Weighted Pull Up 4x6', 'Barbell Row 4x8', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs A', exercises: ['Squat 5x5', 'Romanian Deadlift 4x8', 'Leg Press 4x10', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Thursday', focus: 'Push B', exercises: ['Incline Bench 4x8', 'Arnold Press 4x10', 'Cable Fly 3x12', 'Lateral Raise 3x15', 'Skull Crusher 3x12'] },
          { day: 'Friday', focus: 'Pull B', exercises: ['Rack Pull 4x5', 'Lat Pulldown 4x8', 'Cable Row 3x10', 'Hammer Curl 3x12', 'Rear Delt Fly 3x15'] },
          { day: 'Saturday', focus: 'Legs B', exercises: ['Front Squat 4x6', 'Hack Squat 3x10', 'Walking Lunge 3x12', 'Leg Extension 3x12', 'Seated Calf Raise 4x15'] }
        ]
      }
    },
    endomorph: {
      3: {
        name: 'Full Body + Cardio',
        description: 'Endomorphs building muscle need compound movements plus cardio to manage body fat. 3 day full body with cardio finishers works perfectly.',
        days: [
          { day: 'Monday', focus: 'Full Body + Cardio', exercises: ['Squat 4x8', 'Bench Press 4x8', 'Bent Over Row 4x8', 'Overhead Press 3x10', '20 min moderate cardio'] },
          { day: 'Wednesday', focus: 'Full Body + Cardio', exercises: ['Deadlift 4x6', 'Incline Press 4x8', 'Pull Up 4x6', 'Lateral Raise 3x12', '20 min moderate cardio'] },
          { day: 'Friday', focus: 'Full Body + Cardio', exercises: ['Front Squat 4x8', 'Dumbbell Press 4x8', 'Cable Row 4x10', 'Face Pull 3x15', '20 min moderate cardio'] }
        ]
      },
      4: {
        name: 'Upper Lower + Cardio',
        description: 'Upper lower keeps muscle building going while the extra cardio sessions help endomorphs manage body composition.',
        days: [
          { day: 'Monday', focus: 'Upper', exercises: ['Bench Press 4x8', 'Bent Over Row 4x8', 'Overhead Press 3x10', 'Pull Up 3x8', 'Bicep Curl 3x12', 'Tricep Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Lower + Cardio', exercises: ['Squat 4x8', 'Romanian Deadlift 4x10', 'Leg Press 3x12', 'Leg Curl 3x12', 'Calf Raise 4x15', '15 min HIIT'] },
          { day: 'Thursday', focus: 'Upper', exercises: ['Incline Press 4x8', 'Cable Row 4x10', 'Dumbbell Shoulder Press 3x12', 'Lat Pulldown 3x10', 'Face Pull 3x15', 'Hammer Curl 3x12'] },
          { day: 'Friday', focus: 'Lower + Cardio', exercises: ['Deadlift 4x6', 'Hack Squat 3x10', 'Walking Lunge 3x12', 'Leg Extension 3x12', 'Seated Calf Raise 4x15', '15 min HIIT'] }
        ]
      },
      5: {
        name: 'PPL + Cardio Days',
        description: 'Push pull legs with dedicated cardio days for endomorphs who want to build muscle while keeping fat gain minimal.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 4x8', 'Overhead Press 4x10', 'Incline Dumbbell Press 3x12', 'Lateral Raise 3x15', 'Tricep Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 4x6', 'Pull Up 4x8', 'Bent Over Row 4x10', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Cardio', exercises: ['30 min steady state cardio', '10 min HIIT intervals', 'Core circuit 3 rounds'] },
          { day: 'Friday', focus: 'Legs', exercises: ['Squat 4x8', 'Romanian Deadlift 4x10', 'Leg Press 3x12', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Saturday', focus: 'Push Pull', exercises: ['Incline Bench 3x10', 'Lat Pulldown 3x10', 'Dumbbell Shoulder Press 3x12', 'Cable Row 3x10', 'Superset Curl and Pushdown 3x12'] }
        ]
      },
      6: {
        name: 'PPL + Cardio 2x',
        description: 'Maximum fat burning while building muscle. Alternating lifting and cardio days keeps metabolism high for endomorphs.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 4x8', 'Overhead Press 4x10', 'Incline Press 3x12', 'Lateral Raise 3x15', 'Tricep Dip 3x12'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 4x6', 'Pull Up 4x8', 'Barbell Row 4x10', 'Face Pull 3x15', 'Hammer Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs', exercises: ['Squat 4x8', 'Romanian Deadlift 4x10', 'Leg Press 3x12', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Thursday', focus: 'Cardio + Core', exercises: ['25 min steady cardio', '15 min HIIT', 'Plank 3x60s', 'Ab Circuit 3 rounds'] },
          { day: 'Friday', focus: 'Push Pull', exercises: ['Incline Bench 4x10', 'Lat Pulldown 4x10', 'Cable Fly 3x12', 'Cable Row 3x10', 'Bicep Curl 3x12', 'Tricep Pushdown 3x12'] },
          { day: 'Saturday', focus: 'Legs + Cardio', exercises: ['Front Squat 4x8', 'Hack Squat 3x10', 'Walking Lunge 3x12', 'Leg Extension 3x12', '20 min moderate cardio'] }
        ]
      }
    }
  },
  fat_loss: {
    ectomorph: {
      3: {
        name: 'Full Body Fat Burn',
        description: 'Ectomorphs on a fat loss phase need to maintain muscle. Full body 3x with moderate weights and shorter rest periods.',
        days: [
          { day: 'Monday', focus: 'Full Body Circuit', exercises: ['Squat 3x12', 'Push Up 3x15', 'Bent Over Row 3x12', 'Overhead Press 3x12', 'Plank 3x45s'] },
          { day: 'Wednesday', focus: 'Full Body Circuit', exercises: ['Romanian Deadlift 3x12', 'Dumbbell Press 3x12', 'Pull Up 3x8', 'Lateral Raise 3x15', 'Mountain Climber 3x30s'] },
          { day: 'Friday', focus: 'Full Body + Cardio', exercises: ['Lunge 3x12', 'Incline Press 3x12', 'Cable Row 3x12', 'Face Pull 3x15', '20 min cardio'] }
        ]
      },
      4: {
        name: 'Upper Lower Fat Loss',
        description: 'Maintain muscle with upper lower while burning fat through higher rep ranges and cardio finishers.',
        days: [
          { day: 'Monday', focus: 'Upper', exercises: ['Bench Press 3x10', 'Bent Over Row 3x10', 'Overhead Press 3x12', 'Pull Up 3x8', 'Superset Curl and Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Lower + Cardio', exercises: ['Squat 3x12', 'Romanian Deadlift 3x12', 'Leg Press 3x15', 'Leg Curl 3x12', '25 min cardio'] },
          { day: 'Thursday', focus: 'Upper', exercises: ['Incline Press 3x12', 'Cable Row 3x12', 'Lateral Raise 3x15', 'Lat Pulldown 3x10', 'Face Pull 3x15'] },
          { day: 'Friday', focus: 'Lower + Cardio', exercises: ['Deadlift 3x8', 'Walking Lunge 3x12', 'Leg Extension 3x15', 'Calf Raise 4x15', '25 min cardio'] }
        ]
      },
      5: { name: 'PPL Fat Loss', description: 'PPL with cardio days for ectomorphs cutting. Keeps muscle while burning fat.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 3x10', 'Overhead Press 3x12', 'Incline Press 3x12', 'Lateral Raise 3x15', 'Tricep Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 3x8', 'Pull Up 3x8', 'Bent Over Row 3x10', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Cardio', exercises: ['30 min steady cardio', 'Core circuit 3 rounds'] },
          { day: 'Friday', focus: 'Legs', exercises: ['Squat 3x12', 'Romanian Deadlift 3x12', 'Leg Press 3x15', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Saturday', focus: 'Full Body', exercises: ['Deadlift 3x8', 'Push Up 3x15', 'Pull Up 3x8', 'Lunge 3x12', '20 min cardio'] }
        ]
      },
      6: { name: 'Daily Training Fat Loss', description: 'Six days of training for maximum fat loss while preserving muscle on a cut.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 3x10', 'Overhead Press 3x12', 'Lateral Raise 3x15', 'Tricep Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 3x8', 'Pull Up 3x8', 'Cable Row 3x10', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs', exercises: ['Squat 3x12', 'Romanian Deadlift 3x12', 'Leg Press 3x15', 'Calf Raise 4x15'] },
          { day: 'Thursday', focus: 'Cardio + Core', exercises: ['30 min HIIT', 'Plank 3x60s', 'Ab Circuit 3 rounds'] },
          { day: 'Friday', focus: 'Upper', exercises: ['Incline Press 3x12', 'Lat Pulldown 3x10', 'Shoulder Press 3x12', 'Face Pull 3x15'] },
          { day: 'Saturday', focus: 'Cardio', exercises: ['45 min steady state cardio', 'Stretching 15 min'] }
        ]
      }
    },
    mesomorph: {
      3: { name: 'Full Body Cut', description: 'Mesomorphs cut fast. 3 day full body with moderate weights keeps muscle while the deficit does the fat burning.',
        days: [
          { day: 'Monday', focus: 'Full Body', exercises: ['Squat 4x8', 'Bench Press 4x8', 'Deadlift 3x6', 'Pull Up 3x8', '20 min cardio'] },
          { day: 'Wednesday', focus: 'Full Body', exercises: ['Front Squat 3x10', 'Incline Press 3x10', 'Barbell Row 3x10', 'Overhead Press 3x10', '20 min cardio'] },
          { day: 'Friday', focus: 'Full Body', exercises: ['Romanian Deadlift 4x8', 'Close Grip Bench 3x10', 'T-Bar Row 3x10', 'Bulgarian Split Squat 3x10', '20 min cardio'] }
        ]
      },
      4: { name: 'Upper Lower Cut', description: 'Upper lower cut for mesomorphs. Heavy enough to keep muscle, frequent enough cardio to burn fat.',
        days: [
          { day: 'Monday', focus: 'Upper', exercises: ['Bench Press 4x8', 'Barbell Row 4x8', 'Overhead Press 3x10', 'Pull Up 3x8', 'Superset Curl Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Lower + Cardio', exercises: ['Squat 4x8', 'Romanian Deadlift 4x10', 'Leg Press 3x12', 'Leg Curl 3x12', '20 min HIIT'] },
          { day: 'Thursday', focus: 'Upper', exercises: ['Incline Press 4x10', 'Cable Row 4x10', 'Lateral Raise 3x15', 'Lat Pulldown 3x10', 'Face Pull 3x15'] },
          { day: 'Friday', focus: 'Lower + Cardio', exercises: ['Deadlift 4x6', 'Hack Squat 3x12', 'Walking Lunge 3x12', 'Leg Extension 3x15', '20 min HIIT'] }
        ]
      },
      5: { name: 'PPL Cut', description: 'Classic PPL on a cut for mesomorphs. Keeps muscle with heavy compounds while burning fat.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 4x8', 'Overhead Press 3x10', 'Incline Press 3x12', 'Lateral Raise 3x15', 'Tricep Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 4x6', 'Pull Up 4x8', 'Barbell Row 3x10', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs', exercises: ['Squat 4x8', 'Romanian Deadlift 3x10', 'Leg Press 3x12', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Friday', focus: 'Push Pull', exercises: ['Incline Bench 3x10', 'Lat Pulldown 3x10', 'Dumbbell Shoulder 3x12', 'Cable Row 3x10', 'Superset Arms 3x12'] },
          { day: 'Saturday', focus: 'Cardio + Core', exercises: ['30 min steady cardio', '15 min HIIT', 'Core circuit 3 rounds'] }
        ]
      },
      6: { name: 'PPL 2x Cut', description: 'Double PPL cut for mesomorphs serious about losing fat fast while preserving all their muscle.',
        days: [
          { day: 'Monday', focus: 'Push A', exercises: ['Bench Press 4x8', 'Overhead Press 3x10', 'Incline Press 3x12', 'Lateral Raise 3x15', 'Tricep Dip 3x10'] },
          { day: 'Tuesday', focus: 'Pull A', exercises: ['Deadlift 4x6', 'Pull Up 4x8', 'Barbell Row 3x10', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs A', exercises: ['Squat 4x8', 'Romanian Deadlift 3x10', 'Leg Press 3x12', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Thursday', focus: 'Push B', exercises: ['Incline Bench 4x10', 'Arnold Press 3x12', 'Cable Fly 3x12', 'Lateral Raise 3x15', 'Skull Crusher 3x12'] },
          { day: 'Friday', focus: 'Pull B', exercises: ['Rack Pull 4x6', 'Lat Pulldown 3x10', 'Cable Row 3x10', 'Hammer Curl 3x12', 'Rear Delt Fly 3x15'] },
          { day: 'Saturday', focus: 'Legs B + Cardio', exercises: ['Front Squat 3x10', 'Hack Squat 3x12', 'Walking Lunge 3x12', 'Leg Extension 3x15', '20 min HIIT'] }
        ]
      }
    },
    endomorph: {
      3: { name: 'Full Body HIIT', description: 'Endomorphs on a cut need high intensity to burn fat. Full body 3x with HIIT finishers is the most effective approach.',
        days: [
          { day: 'Monday', focus: 'Full Body + HIIT', exercises: ['Squat 3x12', 'Bench Press 3x12', 'Bent Over Row 3x12', 'Overhead Press 3x12', '20 min HIIT'] },
          { day: 'Wednesday', focus: 'Full Body + HIIT', exercises: ['Deadlift 3x10', 'Incline Press 3x12', 'Pull Up 3x8', 'Lateral Raise 3x15', '20 min HIIT'] },
          { day: 'Friday', focus: 'Full Body + HIIT', exercises: ['Lunge 3x12', 'Dumbbell Press 3x12', 'Cable Row 3x12', 'Face Pull 3x15', '20 min HIIT'] }
        ]
      },
      4: { name: 'Upper Lower HIIT', description: 'Upper lower with HIIT for endomorphs cutting. Maximum fat burning while maintaining muscle mass.',
        days: [
          { day: 'Monday', focus: 'Upper', exercises: ['Bench Press 3x12', 'Bent Over Row 3x12', 'Overhead Press 3x12', 'Pull Up 3x8', 'Superset Arms 3x12'] },
          { day: 'Tuesday', focus: 'Lower + HIIT', exercises: ['Squat 3x12', 'Romanian Deadlift 3x12', 'Leg Press 3x15', 'Leg Curl 3x12', '25 min HIIT'] },
          { day: 'Thursday', focus: 'Upper', exercises: ['Incline Press 3x12', 'Cable Row 3x12', 'Lateral Raise 3x15', 'Lat Pulldown 3x10', 'Face Pull 3x15'] },
          { day: 'Friday', focus: 'Lower + HIIT', exercises: ['Deadlift 3x10', 'Walking Lunge 3x12', 'Leg Extension 3x15', 'Calf Raise 4x15', '25 min HIIT'] }
        ]
      },
      5: { name: 'PPL + Cardio Cut', description: 'PPL with extra cardio days for endomorphs wanting aggressive fat loss.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 3x12', 'Overhead Press 3x12', 'Incline Press 3x15', 'Lateral Raise 3x15', 'Tricep Pushdown 3x15'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 3x10', 'Pull Up 3x8', 'Bent Over Row 3x12', 'Face Pull 3x15', 'Bicep Curl 3x15'] },
          { day: 'Wednesday', focus: 'Cardio', exercises: ['20 min HIIT', '20 min steady cardio', 'Core circuit 3 rounds'] },
          { day: 'Friday', focus: 'Legs', exercises: ['Squat 3x12', 'Romanian Deadlift 3x12', 'Leg Press 3x15', 'Leg Curl 3x15', 'Calf Raise 4x15'] },
          { day: 'Saturday', focus: 'Cardio + Core', exercises: ['40 min steady state', '15 min HIIT', 'Plank 3x60s', 'Ab circuit 3 rounds'] }
        ]
      },
      6: { name: 'Maximum Fat Loss', description: 'Six day plan for endomorphs going all in on fat loss. Alternating weights and cardio every day.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 3x12', 'Overhead Press 3x12', 'Incline Press 3x15', 'Lateral Raise 3x15', 'Tricep Pushdown 3x15'] },
          { day: 'Tuesday', focus: 'Cardio + Core', exercises: ['30 min HIIT', '15 min steady cardio', 'Core circuit 3 rounds'] },
          { day: 'Wednesday', focus: 'Pull', exercises: ['Deadlift 3x10', 'Pull Up 3x8', 'Cable Row 3x12', 'Face Pull 3x15', 'Bicep Curl 3x15'] },
          { day: 'Thursday', focus: 'Cardio', exercises: ['45 min steady state cardio', 'Stretching 15 min'] },
          { day: 'Friday', focus: 'Legs', exercises: ['Squat 3x12', 'Romanian Deadlift 3x12', 'Leg Press 3x15', 'Leg Curl 3x15', 'Calf Raise 4x15'] },
          { day: 'Saturday', focus: 'Full Body + HIIT', exercises: ['Squat 3x12', 'Push Up 3x15', 'Pull Up 3x8', 'Lunge 3x12', '20 min HIIT'] }
        ]
      }
    }
  },
  recomp: {
    ectomorph: {
      3: { name: 'Recomp Full Body', description: 'Body recomposition for ectomorphs. Moderate deficit on rest days, maintenance on training days. Full body maximises muscle retention.',
        days: [
          { day: 'Monday', focus: 'Full Body', exercises: ['Squat 4x8', 'Bench Press 4x8', 'Bent Over Row 4x8', 'Overhead Press 3x10', 'Core work 3 rounds'] },
          { day: 'Wednesday', focus: 'Full Body', exercises: ['Deadlift 4x6', 'Incline Press 4x8', 'Pull Up 4x6', 'Lateral Raise 3x12', 'Core work 3 rounds'] },
          { day: 'Friday', focus: 'Full Body', exercises: ['Front Squat 4x8', 'Dumbbell Press 4x8', 'Cable Row 4x10', 'Face Pull 3x15', '15 min cardio'] }
        ]
      },
      4: { name: 'Upper Lower Recomp', description: 'Upper lower for ectomorph recomp. Build muscle and lose fat simultaneously with smart programming.',
        days: [
          { day: 'Monday', focus: 'Upper', exercises: ['Bench Press 4x8', 'Barbell Row 4x8', 'Overhead Press 3x10', 'Pull Up 3x8', 'Superset Arms 3x12'] },
          { day: 'Tuesday', focus: 'Lower', exercises: ['Squat 4x8', 'Romanian Deadlift 4x10', 'Leg Press 3x12', 'Leg Curl 3x12', '15 min cardio'] },
          { day: 'Thursday', focus: 'Upper', exercises: ['Incline Press 4x10', 'Cable Row 4x10', 'Lateral Raise 3x15', 'Lat Pulldown 3x10', 'Face Pull 3x15'] },
          { day: 'Friday', focus: 'Lower', exercises: ['Deadlift 4x6', 'Hack Squat 3x10', 'Walking Lunge 3x12', 'Leg Extension 3x12', '15 min cardio'] }
        ]
      },
      5: { name: 'PPL Recomp', description: 'PPL for ectomorph recomp. Build muscle efficiently while staying lean.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 4x8', 'Overhead Press 3x10', 'Incline Press 3x12', 'Lateral Raise 3x15', 'Tricep Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 4x6', 'Pull Up 4x6', 'Barbell Row 3x10', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs', exercises: ['Squat 4x8', 'Romanian Deadlift 3x10', 'Leg Press 3x12', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Friday', focus: 'Upper', exercises: ['Incline Bench 3x10', 'Lat Pulldown 3x10', 'Shoulder Press 3x12', 'Cable Row 3x10', 'Superset Arms 3x12'] },
          { day: 'Saturday', focus: 'Cardio + Core', exercises: ['25 min cardio', 'Core circuit 3 rounds', 'Stretching 10 min'] }
        ]
      },
      6: { name: 'PPL 2x Recomp', description: 'Double PPL for ectomorph recomp with cardio. Maximum muscle building stimulus with enough cardio to stay lean.',
        days: [
          { day: 'Monday', focus: 'Push A', exercises: ['Bench Press 4x8', 'Overhead Press 3x10', 'Incline Press 3x12', 'Lateral Raise 3x15', 'Tricep Dip 3x10'] },
          { day: 'Tuesday', focus: 'Pull A', exercises: ['Deadlift 4x6', 'Pull Up 4x6', 'Barbell Row 3x10', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs A', exercises: ['Squat 4x8', 'Romanian Deadlift 3x10', 'Leg Press 3x12', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Thursday', focus: 'Push B', exercises: ['Incline Bench 4x10', 'Arnold Press 3x12', 'Cable Fly 3x12', 'Lateral Raise 3x15', 'Skull Crusher 3x12'] },
          { day: 'Friday', focus: 'Pull B', exercises: ['Rack Pull 4x6', 'Lat Pulldown 3x10', 'Cable Row 3x10', 'Hammer Curl 3x12', 'Rear Delt Fly 3x15'] },
          { day: 'Saturday', focus: 'Legs B + Cardio', exercises: ['Front Squat 3x10', 'Hack Squat 3x12', 'Walking Lunge 3x12', 'Leg Extension 3x12', '20 min cardio'] }
        ]
      }
    },
    mesomorph: {
      3: { name: 'Full Body Recomp', description: 'Mesomorphs recomp very effectively. 3 day full body with moderate intensity.',
        days: [
          { day: 'Monday', focus: 'Full Body', exercises: ['Squat 4x8', 'Bench Press 4x8', 'Deadlift 3x6', 'Pull Up 3x8', '15 min cardio'] },
          { day: 'Wednesday', focus: 'Full Body', exercises: ['Front Squat 3x10', 'Incline Press 3x10', 'Barbell Row 3x10', 'Overhead Press 3x10', '15 min cardio'] },
          { day: 'Friday', focus: 'Full Body', exercises: ['Romanian Deadlift 4x8', 'Dumbbell Press 3x10', 'T-Bar Row 3x10', 'Bulgarian Split Squat 3x10', '15 min cardio'] }
        ]
      },
      4: { name: 'Upper Lower Recomp', description: 'Upper lower recomp for mesomorphs. Optimal blend of strength and body composition work.',
        days: [
          { day: 'Monday', focus: 'Upper Strength', exercises: ['Bench Press 4x6', 'Barbell Row 4x6', 'Overhead Press 3x8', 'Weighted Pull Up 3x6', 'Superset Arms 3x10'] },
          { day: 'Tuesday', focus: 'Lower + Cardio', exercises: ['Squat 4x8', 'Deadlift 3x6', 'Bulgarian Split Squat 3x10', 'Leg Curl 3x12', '20 min cardio'] },
          { day: 'Thursday', focus: 'Upper Hypertrophy', exercises: ['Incline Bench 4x10', 'Cable Row 4x10', 'Dumbbell Shoulder Press 3x12', 'Lat Pulldown 3x10', 'Face Pull 3x15'] },
          { day: 'Friday', focus: 'Lower + Cardio', exercises: ['Front Squat 4x8', 'Romanian Deadlift 4x10', 'Leg Press 3x12', 'Leg Extension 3x15', '20 min cardio'] }
        ]
      },
      5: { name: 'PPL Recomp', description: 'PPL recomp for mesomorphs. Best of both worlds - muscle gain and fat loss simultaneously.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 4x8', 'Overhead Press 4x10', 'Incline Press 3x12', 'Lateral Raise 3x15', 'Tricep Pushdown 3x12'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 4x6', 'Weighted Pull Up 4x6', 'Barbell Row 4x8', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs', exercises: ['Squat 4x8', 'Romanian Deadlift 4x10', 'Leg Press 3x12', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Friday', focus: 'Push Pull', exercises: ['Incline Bench 3x10', 'Lat Pulldown 3x10', 'Shoulder Press 3x12', 'Cable Row 3x10', 'Superset Arms 3x12'] },
          { day: 'Saturday', focus: 'Cardio + Core', exercises: ['25 min cardio', 'Core circuit 3 rounds'] }
        ]
      },
      6: { name: 'PPL 2x Recomp', description: 'Double PPL recomp for mesomorphs going all in. Maximum results.',
        days: [
          { day: 'Monday', focus: 'Push A', exercises: ['Bench Press 4x8', 'Overhead Press 3x10', 'Incline Press 3x12', 'Lateral Raise 3x15', 'Tricep Dip 3x10'] },
          { day: 'Tuesday', focus: 'Pull A', exercises: ['Deadlift 4x6', 'Weighted Pull Up 4x6', 'Barbell Row 3x10', 'Face Pull 3x15', 'Bicep Curl 3x12'] },
          { day: 'Wednesday', focus: 'Legs A', exercises: ['Squat 4x8', 'Romanian Deadlift 3x10', 'Leg Press 3x12', 'Leg Curl 3x12', 'Calf Raise 4x15'] },
          { day: 'Thursday', focus: 'Push B', exercises: ['Incline Bench 4x10', 'Arnold Press 3x12', 'Cable Fly 3x12', 'Lateral Raise 3x15', 'Skull Crusher 3x12'] },
          { day: 'Friday', focus: 'Pull B', exercises: ['Rack Pull 4x6', 'Lat Pulldown 3x10', 'Cable Row 3x10', 'Hammer Curl 3x12', 'Rear Delt Fly 3x15'] },
          { day: 'Saturday', focus: 'Legs B + Cardio', exercises: ['Front Squat 3x10', 'Hack Squat 3x12', 'Walking Lunge 3x12', '20 min cardio'] }
        ]
      }
    },
    endomorph: {
      3: { name: 'Full Body Recomp', description: 'Endomorph recomp 3 days. Compound movements with cardio to lose fat and build muscle simultaneously.',
        days: [
          { day: 'Monday', focus: 'Full Body + Cardio', exercises: ['Squat 3x12', 'Bench Press 3x12', 'Bent Over Row 3x12', 'Overhead Press 3x12', '25 min cardio'] },
          { day: 'Wednesday', focus: 'Full Body + Cardio', exercises: ['Deadlift 3x10', 'Incline Press 3x12', 'Pull Up 3x8', 'Lateral Raise 3x15', '25 min cardio'] },
          { day: 'Friday', focus: 'Full Body + Cardio', exercises: ['Lunge 3x12', 'Dumbbell Press 3x12', 'Cable Row 3x12', 'Face Pull 3x15', '25 min cardio'] }
        ]
      },
      4: { name: 'Upper Lower Recomp', description: 'Upper lower recomp for endomorphs. High cardio focus alongside strength training.',
        days: [
          { day: 'Monday', focus: 'Upper', exercises: ['Bench Press 3x12', 'Bent Over Row 3x12', 'Overhead Press 3x12', 'Pull Up 3x8', 'Superset Arms 3x12'] },
          { day: 'Tuesday', focus: 'Lower + Cardio', exercises: ['Squat 3x12', 'Romanian Deadlift 3x12', 'Leg Press 3x15', 'Leg Curl 3x12', '30 min cardio'] },
          { day: 'Thursday', focus: 'Upper', exercises: ['Incline Press 3x12', 'Cable Row 3x12', 'Lateral Raise 3x15', 'Lat Pulldown 3x10', 'Face Pull 3x15'] },
          { day: 'Friday', focus: 'Lower + Cardio', exercises: ['Deadlift 3x10', 'Walking Lunge 3x12', 'Leg Extension 3x15', 'Calf Raise 4x15', '30 min cardio'] }
        ]
      },
      5: { name: 'PPL Recomp', description: 'PPL recomp for endomorphs with dedicated cardio session.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 3x12', 'Overhead Press 3x12', 'Incline Press 3x15', 'Lateral Raise 3x15', 'Tricep Pushdown 3x15'] },
          { day: 'Tuesday', focus: 'Pull', exercises: ['Deadlift 3x10', 'Pull Up 3x8', 'Bent Over Row 3x12', 'Face Pull 3x15', 'Bicep Curl 3x15'] },
          { day: 'Wednesday', focus: 'Cardio', exercises: ['20 min HIIT', '20 min steady cardio', 'Core circuit 3 rounds'] },
          { day: 'Friday', focus: 'Legs', exercises: ['Squat 3x12', 'Romanian Deadlift 3x12', 'Leg Press 3x15', 'Leg Curl 3x15', 'Calf Raise 4x15'] },
          { day: 'Saturday', focus: 'Full Body + Cardio', exercises: ['Squat 3x12', 'Push Up 3x15', 'Pull Up 3x8', 'Lunge 3x12', '25 min cardio'] }
        ]
      },
      6: { name: 'Maximum Recomp', description: 'Six day recomp for endomorphs. Aggressive approach to lose fat and build muscle at the same time.',
        days: [
          { day: 'Monday', focus: 'Push', exercises: ['Bench Press 3x12', 'Overhead Press 3x12', 'Incline Press 3x15', 'Lateral Raise 3x15', 'Tricep Dip 3x12'] },
          { day: 'Tuesday', focus: 'Cardio + Core', exercises: ['30 min HIIT', '15 min steady cardio', 'Core circuit 3 rounds'] },
          { day: 'Wednesday', focus: 'Pull', exercises: ['Deadlift 3x10', 'Pull Up 3x8', 'Cable Row 3x12', 'Face Pull 3x15', 'Bicep Curl 3x15'] },
          { day: 'Thursday', focus: 'Cardio', exercises: ['45 min steady state cardio', 'Stretching 15 min'] },
          { day: 'Friday', focus: 'Legs', exercises: ['Squat 3x12', 'Romanian Deadlift 3x12', 'Leg Press 3x15', 'Leg Curl 3x15', 'Calf Raise 4x15'] },
          { day: 'Saturday', focus: 'Full Body + Cardio', exercises: ['Deadlift 3x8', 'Push Up 3x15', 'Pull Up 3x8', 'Lunge 3x12', '20 min HIIT'] }
        ]
      }
    }
  },
  endurance: {
    ectomorph: {
      3: { name: 'Endurance Base', description: 'Build aerobic base for ectomorphs. 3 days of mixed cardio and strength endurance work.',
        days: [
          { day: 'Monday', focus: 'Cardio + Strength', exercises: ['30 min run', 'Squat 3x15', 'Push Up 3x20', 'Pull Up 3x10', 'Plank 3x60s'] },
          { day: 'Wednesday', focus: 'Cardio', exercises: ['40 min steady run', 'Core circuit 3 rounds', 'Stretching 15 min'] },
          { day: 'Friday', focus: 'Strength Endurance', exercises: ['35 min cycling', 'Lunge 3x15', 'Dumbbell Row 3x15', 'Shoulder Press 3x15', 'Plank 3x60s'] }
        ]
      },
      4: { name: 'Endurance Build', description: 'Four day endurance plan for ectomorphs. Mix of running, cycling and strength endurance.',
        days: [
          { day: 'Monday', focus: 'Run', exercises: ['40 min easy run', 'Core circuit 3 rounds'] },
          { day: 'Tuesday', focus: 'Strength Endurance', exercises: ['Squat 3x15', 'Push Up 3x20', 'Pull Up 3x10', 'Lunge 3x15', 'Plank 3x60s'] },
          { day: 'Thursday', focus: 'Intervals', exercises: ['10 min warmup', '6x400m intervals', '10 min cooldown'] },
          { day: 'Saturday', focus: 'Long Run', exercises: ['60 min easy run', 'Stretching 20 min'] }
        ]
      },
      5: { name: 'Endurance Peak', description: 'Five day endurance training for ectomorphs aiming for race fitness.',
        days: [
          { day: 'Monday', focus: 'Easy Run', exercises: ['35 min easy pace', 'Core circuit'] },
          { day: 'Tuesday', focus: 'Strength', exercises: ['Squat 3x15', 'Deadlift 3x10', 'Push Up 3x20', 'Pull Up 3x10', 'Core circuit'] },
          { day: 'Wednesday', focus: 'Tempo Run', exercises: ['10 min warmup', '20 min tempo pace', '10 min cooldown'] },
          { day: 'Friday', focus: 'Intervals', exercises: ['10 min warmup', '8x400m sprints', '10 min cooldown'] },
          { day: 'Saturday', focus: 'Long Run', exercises: ['75 min easy run', 'Stretching 20 min'] }
        ]
      },
      6: { name: 'Endurance Elite', description: 'Six day endurance plan for serious ectomorph athletes.',
        days: [
          { day: 'Monday', focus: 'Easy Run', exercises: ['40 min easy pace'] },
          { day: 'Tuesday', focus: 'Strength Endurance', exercises: ['Squat 3x15', 'Push Up 3x20', 'Pull Up 3x10', 'Lunge 3x15', 'Core circuit'] },
          { day: 'Wednesday', focus: 'Tempo', exercises: ['10 min warmup', '25 min tempo', '10 min cooldown'] },
          { day: 'Thursday', focus: 'Cross Training', exercises: ['45 min cycling', 'Core circuit 3 rounds'] },
          { day: 'Friday', focus: 'Intervals', exercises: ['10 min warmup', '10x400m', '10 min cooldown'] },
          { day: 'Saturday', focus: 'Long Run', exercises: ['90 min easy run', 'Stretching 20 min'] }
        ]
      }
    },
    mesomorph: {
      3: { name: 'Endurance Base', description: 'Mesomorphs build endurance fast. 3 day base building plan.',
        days: [
          { day: 'Monday', focus: 'Run + Strength', exercises: ['35 min run', 'Squat 3x15', 'Push Up 3x20', 'Pull Up 3x10', 'Core circuit'] },
          { day: 'Wednesday', focus: 'Cardio', exercises: ['45 min steady run', 'Stretching 15 min'] },
          { day: 'Friday', focus: 'Strength Endurance', exercises: ['30 min cycling', 'Deadlift 3x12', 'Bench Press 3x15', 'Barbell Row 3x15', 'Core circuit'] }
        ]
      },
      4: { name: 'Endurance Build', description: 'Four day endurance build for mesomorphs.',
        days: [
          { day: 'Monday', focus: 'Run', exercises: ['45 min easy run', 'Core circuit'] },
          { day: 'Tuesday', focus: 'Strength', exercises: ['Squat 4x12', 'Deadlift 3x10', 'Push Up 3x20', 'Pull Up 3x10', 'Plank 3x60s'] },
          { day: 'Thursday', focus: 'Intervals', exercises: ['10 min warmup', '8x400m', '10 min cooldown'] },
          { day: 'Saturday', focus: 'Long Run', exercises: ['70 min easy run', 'Stretching 20 min'] }
        ]
      },
      5: { name: 'Endurance Peak', description: 'Five day endurance plan for mesomorphs.',
        days: [
          { day: 'Monday', focus: 'Easy Run', exercises: ['40 min easy pace', 'Core circuit'] },
          { day: 'Tuesday', focus: 'Strength', exercises: ['Squat 4x12', 'Deadlift 3x10', 'Bench Press 3x15', 'Pull Up 3x10', 'Core circuit'] },
          { day: 'Wednesday', focus: 'Tempo Run', exercises: ['10 min warmup', '25 min tempo', '10 min cooldown'] },
          { day: 'Friday', focus: 'Intervals', exercises: ['10 min warmup', '10x400m', '10 min cooldown'] },
          { day: 'Saturday', focus: 'Long Run', exercises: ['80 min easy run', 'Stretching 20 min'] }
        ]
      },
      6: { name: 'Endurance Elite', description: 'Six day endurance plan for mesomorph athletes.',
        days: [
          { day: 'Monday', focus: 'Easy Run', exercises: ['45 min easy pace'] },
          { day: 'Tuesday', focus: 'Strength', exercises: ['Squat 4x12', 'Push Up 3x20', 'Pull Up 3x10', 'Deadlift 3x10', 'Core circuit'] },
          { day: 'Wednesday', focus: 'Tempo', exercises: ['10 min warmup', '30 min tempo', '10 min cooldown'] },
          { day: 'Thursday', focus: 'Cross Training', exercises: ['50 min cycling', 'Core circuit'] },
          { day: 'Friday', focus: 'Intervals', exercises: ['10 min warmup', '12x400m', '10 min cooldown'] },
          { day: 'Saturday', focus: 'Long Run', exercises: ['100 min easy run', 'Stretching 20 min'] }
        ]
      }
    },
    endomorph: {
      3: { name: 'Endurance Base', description: 'Endomorphs building endurance. Start slow, build consistently. Fat burning cardio plus strength.',
        days: [
          { day: 'Monday', focus: 'Walk Run + Strength', exercises: ['30 min walk run intervals', 'Squat 3x15', 'Push Up 3x15', 'Bent Over Row 3x15', 'Core circuit'] },
          { day: 'Wednesday', focus: 'Cardio', exercises: ['40 min brisk walk or easy jog', 'Stretching 15 min'] },
          { day: 'Friday', focus: 'Strength Endurance', exercises: ['30 min cycling', 'Lunge 3x15', 'Dumbbell Row 3x15', 'Shoulder Press 3x15', 'Core circuit'] }
        ]
      },
      4: { name: 'Endurance Build', description: 'Four day endurance build for endomorphs. Gradual progression.',
        days: [
          { day: 'Monday', focus: 'Cardio', exercises: ['40 min easy jog or walk run', 'Core circuit'] },
          { day: 'Tuesday', focus: 'Strength', exercises: ['Squat 3x15', 'Push Up 3x15', 'Pull Up 3x8', 'Lunge 3x15', 'Plank 3x45s'] },
          { day: 'Thursday', focus: 'Intervals', exercises: ['10 min warmup walk', '6x200m jog intervals', '10 min cooldown'] },
          { day: 'Saturday', focus: 'Long Cardio', exercises: ['60 min easy pace walk jog', 'Stretching 15 min'] }
        ]
      },
      5: { name: 'Endurance Build Plus', description: 'Five day endurance plan for endomorphs ready to push harder.',
        days: [
          { day: 'Monday', focus: 'Easy Cardio', exercises: ['35 min easy jog', 'Core circuit'] },
          { day: 'Tuesday', focus: 'Strength', exercises: ['Squat 3x15', 'Deadlift 3x12', 'Push Up 3x15', 'Pull Up 3x8', 'Core circuit'] },
          { day: 'Wednesday', focus: 'Tempo', exercises: ['10 min warmup', '15 min steady pace', '10 min cooldown'] },
          { day: 'Friday', focus: 'Intervals', exercises: ['10 min warmup', '6x400m', '10 min cooldown'] },
          { day: 'Saturday', focus: 'Long Cardio', exercises: ['70 min easy jog', 'Stretching 20 min'] }
        ]
      },
      6: { name: 'Endurance Elite', description: 'Six day endurance plan for endomorphs committed to major change.',
        days: [
          { day: 'Monday', focus: 'Easy Cardio', exercises: ['40 min easy jog'] },
          { day: 'Tuesday', focus: 'Strength', exercises: ['Squat 3x15', 'Push Up 3x15', 'Pull Up 3x8', 'Deadlift 3x10', 'Core circuit'] },
          { day: 'Wednesday', focus: 'Tempo', exercises: ['10 min warmup', '20 min tempo', '10 min cooldown'] },
          { day: 'Thursday', focus: 'Cross Training', exercises: ['45 min cycling or swimming', 'Core circuit'] },
          { day: 'Friday', focus: 'Intervals', exercises: ['10 min warmup', '8x400m', '10 min cooldown'] },
          { day: 'Saturday', focus: 'Long Cardio', exercises: ['80 min easy jog', 'Stretching 20 min'] }
        ]
      }
    }
  },
  mobility: {
    ectomorph: {
      3: { name: 'Mobility Foundation', description: 'Ectomorphs often have tight joints. 3 day mobility plan to build flexibility and movement quality.',
        days: [
          { day: 'Monday', focus: 'Upper Body Mobility', exercises: ['Shoulder CARs 2x10', 'Thoracic Rotation 3x10', 'Door Stretch 3x30s', 'Band Pull Apart 3x15', 'Neck Circles 2x10'] },
          { day: 'Wednesday', focus: 'Lower Body Mobility', exercises: ['Hip CARs 2x10', 'Pigeon Pose 2x60s', 'Couch Stretch 2x60s', 'Ankle Circles 2x15', 'Hamstring Stretch 3x30s'] },
          { day: 'Friday', focus: 'Full Body Flow', exercises: ['Cat Cow 3x10', 'World Greatest Stretch 2x5', 'Deep Squat Hold 3x30s', 'Shoulder Rotations 2x10', 'Yoga Flow 20 min'] }
        ]
      },
      4: { name: 'Mobility Build', description: 'Four day mobility plan for ectomorphs building full body flexibility.',
        days: [
          { day: 'Monday', focus: 'Spine and Hips', exercises: ['Cat Cow 3x10', 'Hip CARs 2x10', 'Pigeon Pose 2x60s', 'Spinal Twist 3x30s', 'Child Pose 3x45s'] },
          { day: 'Tuesday', focus: 'Shoulders and Chest', exercises: ['Shoulder CARs 2x10', 'Doorway Stretch 3x30s', 'Band Pull Apart 3x15', 'Overhead Reach 3x10', 'Wall Slide 3x10'] },
          { day: 'Thursday', focus: 'Legs and Ankles', exercises: ['Couch Stretch 2x60s', 'Hamstring Stretch 3x30s', 'Calf Stretch 3x30s', 'Ankle Circles 2x15', 'Squat to Stand 3x10'] },
          { day: 'Saturday', focus: 'Full Body Yoga Flow', exercises: ['Sun Salutation 3 rounds', 'Warrior sequence', 'Balance poses', 'Deep stretching 20 min'] }
        ]
      },
      5: { name: 'Mobility Plus Strength', description: 'Five day plan combining mobility work with light strength training for ectomorphs.',
        days: [
          { day: 'Monday', focus: 'Upper Mobility + Strength', exercises: ['Shoulder CARs 2x10', 'Push Up 3x10', 'Band Pull Apart 3x15', 'Doorway Stretch 3x30s', 'Bicep Curl 3x12'] },
          { day: 'Tuesday', focus: 'Lower Mobility', exercises: ['Hip CARs 2x10', 'Pigeon Pose 2x60s', 'Couch Stretch 2x60s', 'Hamstring Stretch 3x30s', 'Ankle CARs 2x10'] },
          { day: 'Wednesday', focus: 'Yoga Flow', exercises: ['Sun Salutation 5 rounds', 'Standing balance poses', 'Floor stretches 20 min'] },
          { day: 'Friday', focus: 'Lower Mobility + Strength', exercises: ['Hip CARs 2x10', 'Squat 3x12', 'Lunge 3x10', 'Couch Stretch 2x60s', 'Calf Raise 3x15'] },
          { day: 'Saturday', focus: 'Full Body Flow', exercises: ['Cat Cow 3x10', 'World Greatest Stretch 2x5', 'Deep Squat Hold 3x30s', 'Foam Rolling 15 min'] }
        ]
      },
      6: { name: 'Daily Mobility', description: 'Six day daily mobility practice for ectomorphs wanting maximum flexibility and movement quality.',
        days: [
          { day: 'Monday', focus: 'Spine', exercises: ['Cat Cow 3x10', 'Thoracic Rotation 3x10', 'Child Pose 3x45s', 'Spinal Twist 3x30s'] },
          { day: 'Tuesday', focus: 'Hips', exercises: ['Hip CARs 2x10', 'Pigeon Pose 2x60s', 'Couch Stretch 2x60s', 'Hip Flexor Stretch 3x30s'] },
          { day: 'Wednesday', focus: 'Shoulders', exercises: ['Shoulder CARs 2x10', 'Doorway Stretch 3x30s', 'Band Pull Apart 3x15', 'Wall Slide 3x10'] },
          { day: 'Thursday', focus: 'Legs', exercises: ['Hamstring Stretch 3x30s', 'Calf Stretch 3x30s', 'Quad Stretch 3x30s', 'Ankle CARs 2x10'] },
          { day: 'Friday', focus: 'Full Body Yoga', exercises: ['Sun Salutation 5 rounds', 'Warrior sequence', 'Balance poses', 'Deep stretching'] },
          { day: 'Saturday', focus: 'Recovery Flow', exercises: ['Foam Rolling 20 min', 'Light stretching 20 min', 'Breathing exercises 10 min'] }
        ]
      }
    },
    mesomorph: {
      3: { name: 'Mobility Foundation', description: 'Mesomorphs benefit greatly from mobility work to complement their strength. 3 day plan.',
        days: [
          { day: 'Monday', focus: 'Upper Mobility', exercises: ['Shoulder CARs 2x10', 'Thoracic Rotation 3x10', 'Doorway Stretch 3x30s', 'Band Pull Apart 3x15', 'Wall Slide 3x10'] },
          { day: 'Wednesday', focus: 'Lower Mobility', exercises: ['Hip CARs 2x10', 'Pigeon Pose 2x60s', 'Couch Stretch 2x60s', 'Hamstring Stretch 3x30s', 'Ankle Circles 2x15'] },
          { day: 'Friday', focus: 'Full Body Flow', exercises: ['World Greatest Stretch 2x5', 'Deep Squat Hold 3x30s', 'Cat Cow 3x10', 'Yoga Flow 20 min'] }
        ]
      },
      4: { name: 'Mobility Build', description: 'Four day mobility plan for mesomorphs adding flexibility to their athleticism.',
        days: [
          { day: 'Monday', focus: 'Spine and Hips', exercises: ['Cat Cow 3x10', 'Hip CARs 2x10', 'Pigeon Pose 2x60s', 'Spinal Twist 3x30s'] },
          { day: 'Tuesday', focus: 'Shoulders', exercises: ['Shoulder CARs 2x10', 'Doorway Stretch 3x30s', 'Band Pull Apart 3x15', 'Wall Slide 3x10'] },
          { day: 'Thursday', focus: 'Legs', exercises: ['Couch Stretch 2x60s', 'Hamstring Stretch 3x30s', 'Calf Stretch 3x30s', 'Squat to Stand 3x10'] },
          { day: 'Saturday', focus: 'Yoga Flow', exercises: ['Sun Salutation 3 rounds', 'Warrior sequence', 'Deep stretching 25 min'] }
        ]
      },
      5: { name: 'Mobility Plus', description: 'Five day mobility plan for mesomorphs wanting serious flexibility gains.',
        days: [
          { day: 'Monday', focus: 'Spine', exercises: ['Cat Cow 3x10', 'Thoracic Rotation 3x10', 'Child Pose 3x45s', 'Spinal Twist 3x30s'] },
          { day: 'Tuesday', focus: 'Hips', exercises: ['Hip CARs 2x10', 'Pigeon Pose 2x60s', 'Couch Stretch 2x60s', 'Hip Flexor Stretch 3x30s'] },
          { day: 'Wednesday', focus: 'Shoulders', exercises: ['Shoulder CARs 2x10', 'Doorway Stretch 3x30s', 'Band Pull Apart 3x15', 'Overhead Reach 3x10'] },
          { day: 'Friday', focus: 'Legs', exercises: ['Hamstring Stretch 3x30s', 'Calf Stretch 3x30s', 'Ankle CARs 2x10', 'Quad Stretch 3x30s'] },
          { day: 'Saturday', focus: 'Full Body Yoga', exercises: ['Sun Salutation 5 rounds', 'Balance poses', 'Deep stretching 25 min'] }
        ]
      },
      6: { name: 'Daily Mobility', description: 'Six day daily mobility for mesomorphs wanting elite movement quality.',
        days: [
          { day: 'Monday', focus: 'Spine', exercises: ['Cat Cow 3x10', 'Thoracic Rotation 3x10', 'Child Pose 3x45s'] },
          { day: 'Tuesday', focus: 'Hips', exercises: ['Hip CARs 2x10', 'Pigeon Pose 2x60s', 'Couch Stretch 2x60s'] },
          { day: 'Wednesday', focus: 'Shoulders', exercises: ['Shoulder CARs 2x10', 'Doorway Stretch 3x30s', 'Band Pull Apart 3x15'] },
          { day: 'Thursday', focus: 'Legs', exercises: ['Hamstring Stretch 3x30s', 'Calf Stretch 3x30s', 'Ankle CARs 2x10'] },
          { day: 'Friday', focus: 'Full Body Yoga', exercises: ['Sun Salutation 5 rounds', 'Balance poses', 'Deep stretching'] },
          { day: 'Saturday', focus: 'Recovery', exercises: ['Foam Rolling 20 min', 'Light stretching 20 min', 'Breathing 10 min'] }
        ]
      }
    },
    endomorph: {
      3: { name: 'Mobility Foundation', description: 'Endomorphs benefit from mobility to improve movement and reduce injury risk. 3 day starter plan.',
        days: [
          { day: 'Monday', focus: 'Upper Mobility', exercises: ['Shoulder Rolls 2x10', 'Doorway Stretch 3x30s', 'Thoracic Rotation 3x10', 'Neck Stretch 3x30s'] },
          { day: 'Wednesday', focus: 'Lower Mobility', exercises: ['Hip CARs 2x10', 'Seated Hamstring Stretch 3x30s', 'Ankle Circles 2x15', 'Knee to Chest 3x30s'] },
          { day: 'Friday', focus: 'Full Body Flow', exercises: ['Cat Cow 3x10', 'Child Pose 3x45s', 'Seated Spinal Twist 3x30s', 'Gentle Yoga Flow 20 min'] }
        ]
      },
      4: { name: 'Mobility Build', description: 'Four day mobility plan for endomorphs improving flexibility and joint health.',
        days: [
          { day: 'Monday', focus: 'Spine', exercises: ['Cat Cow 3x10', 'Child Pose 3x45s', 'Spinal Twist 3x30s', 'Thoracic Rotation 3x10'] },
          { day: 'Tuesday', focus: 'Hips', exercises: ['Hip CARs 2x10', 'Seated Pigeon 2x60s', 'Knee to Chest 3x30s', 'Hip Flexor Stretch 3x30s'] },
          { day: 'Thursday', focus: 'Shoulders', exercises: ['Shoulder Rolls 2x10', 'Doorway Stretch 3x30s', 'Cross Body Stretch 3x30s', 'Wall Slide 3x10'] },
          { day: 'Saturday', focus: 'Full Body', exercises: ['Gentle Yoga Flow 30 min', 'Foam Rolling 15 min', 'Breathing exercises 10 min'] }
        ]
      },
      5: { name: 'Mobility Plus', description: 'Five day mobility for endomorphs committed to improving flexibility.',
        days: [
          { day: 'Monday', focus: 'Spine', exercises: ['Cat Cow 3x10', 'Child Pose 3x45s', 'Spinal Twist 3x30s'] },
          { day: 'Tuesday', focus: 'Hips', exercises: ['Hip CARs 2x10', 'Seated Pigeon 2x60s', 'Hip Flexor Stretch 3x30s'] },
          { day: 'Wednesday', focus: 'Shoulders', exercises: ['Shoulder Rolls 2x10', 'Doorway Stretch 3x30s', 'Band Pull Apart 3x15'] },
          { day: 'Friday', focus: 'Legs', exercises: ['Seated Hamstring Stretch 3x30s', 'Calf Stretch 3x30s', 'Ankle Circles 2x15'] },
          { day: 'Saturday', focus: 'Yoga Flow', exercises: ['Gentle Yoga 30 min', 'Foam Rolling 15 min'] }
        ]
      },
      6: { name: 'Daily Mobility', description: 'Six day daily mobility for endomorphs wanting maximum improvement in movement quality.',
        days: [
          { day: 'Monday', focus: 'Spine', exercises: ['Cat Cow 3x10', 'Child Pose 3x45s', 'Spinal Twist 3x30s'] },
          { day: 'Tuesday', focus: 'Hips', exercises: ['Hip CARs 2x10', 'Seated Pigeon 2x60s', 'Hip Flexor Stretch 3x30s'] },
          { day: 'Wednesday', focus: 'Shoulders', exercises: ['Shoulder Rolls 2x10', 'Doorway Stretch 3x30s', 'Cross Body Stretch 3x30s'] },
          { day: 'Thursday', focus: 'Legs', exercises: ['Seated Hamstring Stretch 3x30s', 'Calf Stretch 3x30s', 'Ankle Circles 2x15'] },
          { day: 'Friday', focus: 'Yoga Flow', exercises: ['Gentle Yoga 30 min'] },
          { day: 'Saturday', focus: 'Recovery', exercises: ['Foam Rolling 20 min', 'Light stretching 20 min', 'Breathing 10 min'] }
        ]
      }
    }
  }
}

const dayOptions = [3, 4, 5, 6]

const WorkoutSplit = () => {
  const { user } = useAuth()
  const [daysPerWeek, setDaysPerWeek] = useState(null)
  const [split, setSplit] = useState(null)
  const [generated, setGenerated] = useState(false)

  const goal = user?.goal || ''
  const bodyType = user?.bodyType || ''

  const handleGenerate = () => {
    if (!daysPerWeek) return
    if (!goal || !bodyType) return

    const result = splitData[goal]?.[bodyType]?.[daysPerWeek]
    if (result) {
      setSplit(result)
      setGenerated(true)
    }
  }

  const focusColor = (focus) => {
    if (focus.toLowerCase().includes('push')) return 'var(--accent-blue)'
    if (focus.toLowerCase().includes('pull')) return 'var(--accent-green)'
    if (focus.toLowerCase().includes('leg')) return 'var(--accent-purple)'
    if (focus.toLowerCase().includes('upper')) return 'var(--accent-blue)'
    if (focus.toLowerCase().includes('lower')) return 'var(--accent-peach)'
    if (focus.toLowerCase().includes('cardio')) return 'var(--accent-yellow)'
    if (focus.toLowerCase().includes('full')) return 'var(--accent-green)'
    if (focus.toLowerCase().includes('yoga') || focus.toLowerCase().includes('mobility')) return 'var(--accent-purple)'
    return 'var(--accent-green)'
  }

  return (
    <div className="split-page">
      <Navbar />
      <div className="split-layout">
        <Sidebar />
        <main className="split-main">

          <div className="animate-fade-in">
            <h1 className="section-title">Weekly Workout Split Generator</h1>
            <p className="section-subtitle">Your goal and body type are read from your profile. Just pick how many days you can train and get your perfect weekly plan.</p>
          </div>

          {(!goal || !bodyType) && (
            <div className="card split-warning animate-fade-in">
              <p>Please complete your profile first. Go to your profile and set your goal and body type to use this feature.</p>
            </div>
          )}

          {goal && bodyType && (
            <div className="card split-profile-summary animate-fade-in">
              <div className="split-profile-item">
                <p className="split-profile-label">Your Goal</p>
                <p className="split-profile-value">{goal.replace('_', ' ')}</p>
              </div>
              <div className="split-divider"></div>
              <div className="split-profile-item">
                <p className="split-profile-label">Body Type</p>
                <p className="split-profile-value">{bodyType}</p>
              </div>
              <div className="split-divider"></div>
              <div className="split-profile-item">
                <p className="split-profile-label">Activity Level</p>
                <p className="split-profile-value">{user?.activityLevel?.replace('_', ' ') || 'not set'}</p>
              </div>
            </div>
          )}

          {goal && bodyType && (
            <div className="card animate-fade-in">
              <h3 className="card-section-title">How many days per week can you train?</h3>
              <div className="days-selector">
                {dayOptions.map(d => (
                  <button
                    key={d}
                    className={`day-btn ${daysPerWeek === d ? 'active' : ''}`}
                    onClick={() => { setDaysPerWeek(d); setGenerated(false); setSplit(null) }}
                  >
                    {d} days
                  </button>
                ))}
              </div>
              <button
                className="btn-primary generate-btn"
                onClick={handleGenerate}
                disabled={!daysPerWeek}
              >
                Generate My Split
              </button>
            </div>
          )}

          {generated && split && (
            <div className="split-result animate-fade-in">
              <div className="card split-header-card">
                <h2 className="split-name">{split.name}</h2>
                <p className="split-description">{split.description}</p>
                <div className="split-tags">
                  <span className="badge badge-green">{goal.replace('_', ' ')}</span>
                  <span className="badge badge-blue">{bodyType}</span>
                  <span className="badge badge-purple">{daysPerWeek} days per week</span>
                </div>
              </div>

              <div className="split-days-grid">
                {split.days.map((day, i) => (
                  <div key={i} className="split-day-card card">
                    <div className="split-day-header">
                      <div className="split-day-number">{i + 1}</div>
                      <div>
                        <p className="split-day-name">{day.day}</p>
                        <p className="split-day-focus" style={{ color: focusColor(day.focus) }}>{day.focus}</p>
                      </div>
                    </div>
                    <ul className="split-exercises">
                      {day.exercises.map((ex, j) => (
                        <li key={j} className="split-exercise-item">
                          <span className="split-ex-dot" style={{ backgroundColor: focusColor(day.focus) }}></span>
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="card split-note">
                <h4>How to use this plan</h4>
                <p>Follow this split for 4 to 6 weeks before changing it. Progressive overload is key — increase weight or reps each week. Take at least one full rest day between sessions when possible. Deload every 4 to 6 weeks by cutting volume in half.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default WorkoutSplit