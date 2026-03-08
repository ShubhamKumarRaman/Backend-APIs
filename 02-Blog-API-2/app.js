const express = require('express')
const app = express()

//Import routes
const blogRoutes = require("./routes/blogRoutes")
const userRoutes = require("./routes/userRoutes")

//Middleware
app.use(express.json());

//Mount routes
app.use('/api/v1', blogRoutes);
app.use('/api/v1', userRoutes);

//Default Route
app.get('/', (req,res)=>{
    res.send("Blog API is running successfully");
})

//Export app
module.exports = app;