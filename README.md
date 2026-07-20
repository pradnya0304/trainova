# Trainova — Health and Fitness Web Application

Trainova is a full-stack MERN web application that serves as a complete personal fitness companion. It combines workout planning, nutrition tracking, body analysis, progress monitoring and smart fitness tools into one clean platform built around the user's body type and goals.

---

## Live Demo

Frontend: https://trainova-fitness.vercel.app  
Backend: https://trainova-server.onrender.com

---

## Tech Stack

**Frontend**
- React with Vite
- React Router DOM for client side routing
- Axios for API requests
- Recharts for data visualization
- React Hot Toast for notifications
- React Icons for iconography
- CSS with custom properties for theming

**Backend**
- Node.js with Express
- MongoDB with Mongoose ODM
- JSON Web Tokens for authentication
- Bcryptjs for password hashing
- Axios for external API calls

**Database**
- MongoDB Atlas (cloud hosted)

**Deployment**
- Frontend deployed on Vercel
- Backend deployed on Render
- Database hosted on MongoDB Atlas

---

## Features

### Core Features

**Authentication**
- User registration and login with JWT
- Protected routes for authenticated users
- Persistent sessions using localStorage

**Body Profile**
- Set age, height, weight, gender, body type and activity level
- Select fitness goal from muscle gain, fat loss, recomposition, endurance or mobility
- Choose body type from ectomorph, mesomorph or endomorph
- Profile data auto populates across all features

**BMI and Body Stats Calculator**
- Auto filled from saved profile
- Calculates BMI with category and color indicator
- Calculates BMR using Mifflin St Jeor equation
- Calculates TDEE based on activity level
- Recommended daily macros based on goal

**Workout Planner**
- Create custom workout plans with name, goal, day and duration
- Add exercises from dropdown list seeded from database
- Option to type custom exercise names manually
- Set sets, reps and weight per exercise
- Delete workouts
- Custom rest timer with user defined minutes and seconds

**Exercise Library**
- Full exercise database seeded from backend
- Filter by muscle group, difficulty and equipment
- Search exercises by name
- Each exercise shows instructions, tips and tags

**Nutrition Planner**
- Set daily calorie and macro targets
- Create meal plans with foods and macros per meal
- Donut chart showing macro split visually
- Supports standard, vegetarian, vegan, keto and paleo diet types

**Progress Tracker**
- Log weight entries with date and notes
- Three view modes: Chart, Transformation Timeline and All Entries
- Weight over time line chart
- Transformation Timeline showing journey from start weight to goal weight with percentage progress
- Entry by entry timeline showing weight change between each log

**Recovery Guide**
- Evidence based recovery tips covering sleep, hydration, deload weeks, foam rolling and protein timing
- Post workout stretching routine with 8 exercises
- Deload week planner with volume, intensity and frequency guidance

**Supplements Guide**
- 12 supplements ranked by evidence level
- Each entry includes benefits, dosage, timing and evidence rating
- Data seeded from backend database
- No sponsored content

**Dark Mode**
- Full dark mode support with a single toggle in the navbar
- Pastel soft color theme in light mode
- All CSS variables swap automatically using data-theme attribute

---

### Unique Features

**Weekly Workout Split Generator**
- Reads goal and body type automatically from user profile
- User selects number of training days per week from 3 to 6
- Generates a complete weekly plan with named split, description and day by day exercise breakdown
- Covers all 5 goals and all 3 body types with unique plans for each combination
- Color coded by workout focus such as push, pull, legs, cardio and mobility

**Calorie Tracker**
- User types food name in plain text
- Instant calorie and macro calculation using a built in food database of over 100 foods
- Supports portion specification such as "chicken breast 200g", "2 eggs", "oats 80g", "milk 250ml"
- Supports grams, kg, ml, litres, cups, tbsp, tsp, pieces and slices
- Shows total calories, protein, carbs and fat for the day
- Macro breakdown bar chart
- Includes Indian foods such as dal, roti, paneer, biryani, idli, dosa, khichdi and more

**Workout Streak Tracker**
- GitHub style 52 week activity grid
- Each day you log a workout or progress entry counts as an active day
- Shows current streak, longest streak, total active days and consistency percentage
- Hover over any cell to see the date and activity status
- Motivational tips on how to build and maintain streaks

**Transformation Timeline**
- Merged into the Progress Tracker page as a separate tab
- Visual journey bar showing start weight, current position and goal weight
- Progress percentage calculated dynamically
- Full chronological timeline of every weight entry with weight change shown between entries
- Entries tagged as Starting Point or Latest

---

## Project Structure
trainova/
├── client/ React frontend
│ ├── src/
│ │ ├── pages/ One folder per page with JSX and CSS
│ │ ├── components/ Shared reusable components
│ │ ├── context/ Auth and Theme context providers
│ │ ├── hooks/ Custom React hooks
│ │ ├── services/ Axios API service functions
│ │ ├── utils/ BMI, TDEE and macro calculators
│ │ └── styles/ Global CSS and theme variables
│ └── package.json
│
└── server/ Node Express backend
├── config/ Database connection
├── controllers/ Route handler logic
├── middleware/ Auth and error middleware
├── models/ Mongoose schemas
├── routes/ Express route definitions
└── utils/ Seed scripts and helper functions

---

## Getting Started Locally

**Prerequisites**
- Node.js installed
- MongoDB running locally or a MongoDB Atlas connection string

**Clone the repository**

git clone https://github.com/YOUR_USERNAME/trainova.git
cd trainova


**Setup the backend**

cd server
npm install
Create a `.env` file inside the server folder:

PORT=5000
MONGO_URI=mongodb://localhost:27017/trainova
JWT_SECRET=your_jwt_secret


Run the backend:

npm run dev


Seed the database:

node utils/seedExercises.js
node utils/seedSupplements.js
