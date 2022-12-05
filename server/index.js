import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import UserRoutes from './routes/users.js'
import VideoRoutes from './routes/videos.js'
import CommentRoutes from './routes/comments.js'
import AuthRoutes from './routes/auth.js'
import cookieParser from 'cookie-parser'


const app=express()
dotenv.config()

const connect =()=>{
    mongoose.connect(process.env.MONGO).then(()=>{
        console.log('connected to db')
    }).catch((err)=>{throw err})
}
app.use(cookieParser())
app.use(express.json())
app.use('/api/auth',AuthRoutes)
app.use('/api/user',UserRoutes)
app.use('/api/videos',VideoRoutes)
app.use('/api/comments',CommentRoutes)

app.use((err,req,res,next)=>{
    const status=err.status || 500;
    const message=err.message || "something went wrong"
    return res.status(status).json({
        success:false,
        status,
        message,
    })
})

app.listen(8000,()=>{
    connect()
    console.log('connected to server 8000');
})