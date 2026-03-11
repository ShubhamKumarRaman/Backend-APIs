const express = require('express')
require('dotenv').config();

const {connectRedis} = require('./config/redis')
const weatherRoutes = require('./routes/weatherRoutes')

const app = express();

app.use(express.json());
app.use('/api/weather',weatherRoutes);

const PORT = process.env.PORT || 5000;

async function startServer(){
    await connectRedis();
    app.listen(PORT,()=>{
        console.log(`Server is running on port : ${PORT}`)
    })
}

startServer();