// importing
const express = require('express')
const socket = require('socket.io')
const http = require('http')
const socketHandler = require('./socket_handlers/socketHandler')
const dotenv = require('dotenv')
const appRoutes = require('./src/routes.js')
const useMiddlewares = require('./src/appMiddlewares')
const { setDbConfig, db } = require('./src/dbConfig')

/**
 * @author Piyush Bhatt
 */

dotenv.config()

const app = express()
const server = http.createServer(app)
const io = socket(server)
const port = process.env.PORT || 8001

// middlewares
useMiddlewares(app, io)

// DB
setDbConfig()

// listen for server
db.once('open', () => {
  console.log('DB connected')
  server.listen(port, () => console.log(`Listening on localhost:${port}`))
})

// socket
io.on('connection', socketHandler)

// app routes
appRoutes(app, io)
