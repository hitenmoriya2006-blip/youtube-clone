const mongoose = require('mongoose')
require('dotenv').config()

async function connectDB (){
    await mongoose.connect(process.env.MONGO_URL)
    console.log('MongoDB is connnected');
}

module.exports = connectDB