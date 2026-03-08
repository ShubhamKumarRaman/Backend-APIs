require('dotenv').config();

const app = require('./app')
const connectDB = require('./config/database')

//Port 
const PORT = process.env.PORT || 5000;

//Connect to database
connectDB();

//Start Server
app.listen(PORT, ()=>{
    console.log(`Server is running successfully on port : ${PORT}`)
})