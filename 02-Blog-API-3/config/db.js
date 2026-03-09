const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MongoDB URI is not defined in .env file");
        }

        const conn = await mongoose.connect(process.env.MONGO_URI, {
            autoIndex: false,
            serverSelectionTimeoutMS: 5000
        });
        console.log(`Mongodb connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed")
        console.error(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;