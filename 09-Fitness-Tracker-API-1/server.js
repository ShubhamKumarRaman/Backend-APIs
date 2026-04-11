const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')

dotenv.config();

const app = express();

//Middleware
app.use(express.json())

connectDB();

//Routes
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/workouts', require('./routes/workout.routes'))
app.use('/api/reports', require('./routes/report.routes'))

//health Check route
app.get('/', (req, res) => {
    res.send("API is running")
})

//Global error handler
app.use((err, req, res, next) => {
    res.status(500).josn({
        message: err.message
    })
})

//start server
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})