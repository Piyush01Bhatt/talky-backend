// importing
const express = require('express')
const socket = require('socket.io')
const http = require('http')
const socketHandler = require('../../socket_handlers/socketHandler')
const dotenv = require('dotenv')
const appRoutes = require('../../src/routes')
const useMiddlewares = require('../../src/appMiddlewares')
const { setDbConfig } = require('../../src/dbConfig')
const mongoose = require('mongoose')

dotenv.config('./test.env')

//console.log(process.env.NODE_ENV)

const app = express()
const server = http.createServer(app)
const io = socket(server)

// middlewares
useMiddlewares(app, io)

// DB
//setDbConfig()

// socket
io.on('connection', socketHandler)

// app routes
appRoutes(app, io)

module.exports = app
