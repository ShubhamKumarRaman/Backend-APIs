const express = require('express')
const cors = require('cors')

const bookRoutes = require('./routes/book.routes')
const authRoutes = require('./routes/auth.routes')

const app = express();

app.use(express.json())
app.use(cors())

app.use('/api/books', bookRoutes)
app.use('/api/auth', authRoutes)

module.exports = app;