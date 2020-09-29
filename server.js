//importing
import express from "express"
import mongoose from 'mongoose'
import cors from 'cors'
import bodyParser from 'body-parser'
import socket from 'socket.io'
import http from 'http'
import {socketHandler} from "./socket_handlers/socketHandler.js"
import dotenv from "dotenv"
import appRoutes from './routes.js'

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

// app routes
appRoutes(app)




