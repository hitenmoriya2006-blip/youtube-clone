import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import videoRoutes from './routes/video.route.js'
const app = express()

app.use(cors())

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/v1/users',userRoutes)
app.use('/api/v1/videos',videoRoutes)

export default app


