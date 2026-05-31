import app from './app.js'
import connectDB from './db/db.js'
import dotenv from 'dotenv'
dotenv.config({
    path: './env'
})

connectDB()

app.listen(3000,()=>{
    console.log('server is running');
})