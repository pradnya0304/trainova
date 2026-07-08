const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error.middleware')

dotenv.config()
connectDB()

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/user', require('./routes/user.routes'))
app.use('/api/workout', require('./routes/workout.routes'))
app.use('/api/exercise', require('./routes/exercise.routes'))
app.use('/api/nutrition', require('./routes/nutrition.routes'))
app.use('/api/progress', require('./routes/progress.routes'))
app.use('/api/community', require('./routes/community.routes'))
app.use('/api/supplement', require('./routes/supplement.routes'))


app.use(errorHandler)

app.get('/', (req, res) => {
  res.send('Trainova API running')
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))