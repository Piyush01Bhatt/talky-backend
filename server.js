//importing
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import {userRouter} from './routes/user.js'
import {friendsRouter} from './routes/friends.js'
import socket from 'socket.io'
import http from 'http'
import {socketHandler} from "./utils/socketHandler.js"
import dotenv from "dotenv"

dotenv.config()

const app  = express();
const server = http.createServer(app);
const io = socket(server)
const port = process.env.PORT || 8001

//middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(cors())
// DB
mongoose.connect(process.env.DB_URL,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify:false
})

const db = mongoose.connection

db.once('open', ()=>{
    console.log('DB connected')   
    server.listen(port, () => console.log(`Listening on localhost:${port}`))
})

//socket 

io.on('connection', socketHandler)

// api routes
app.get('/', (req,res)=>{
    console.log('/ route')
    return res.status(200).send("hello world")
})

app.use("/user", userRouter)

/** friend routes */
friendsRouter.use((req,res,next)=>{
    res.io = io;
    next();
})
app.use("/friends", friendsRouter)


