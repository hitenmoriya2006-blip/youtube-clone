import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import userRoutes from './routes/user.route.js'
import videoRoutes from './routes/video.route.js'
import subscriptionRoute from './routes/subscription.route.js'
import likeRoute from './routes/like.route.js'
import commmentRoute from './routes/comment.route.js'
import dashboardRoute from './routes/dashboard.route.js'
import playlistRoutes from './routes/playlist.route.js'

const app = express()

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json({limit: '16kb'}))
app.use(express.urlencoded({extended:true,limit:'16kb'}))
app.use(express.static("public"))
app.use(cookieParser())

app.use('/api/v1/users',userRoutes)
app.use('/api/v1/videos',videoRoutes)
app.use('/api/v1/subscription',subscriptionRoute)
app.use('/api/v1/like',likeRoute)
app.use('/api/v1/comment',commmentRoute)
app.use('/api/v1/dashboard',dashboardRoute)
app.use('/api/v1/playlist',playlistRoutes)

export default app 