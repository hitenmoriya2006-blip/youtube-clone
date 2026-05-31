import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

async function connectDB (){
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB is connnected');
    } catch (error) {
        console.log(`MongoDBB Error: ${error}`);
        throw error
    }
}
export default connectDB