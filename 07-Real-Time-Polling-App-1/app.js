const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors());
app.use(express.json());

app.use("/api/polls", require("./routes/pollRoutes"))

module.exports = app;