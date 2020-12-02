
const { UserModel } = require('../models/dbUser')

function socketHandler (socket) {
  const id = socket.handshake.query.id
  socket.join(id)
  console.log(`New WebSocket Connection from ${id}`)

  socket.on('on-message', (data) => {
    console.log(data)
    socket.emit('on-received', 'got ya!!!!')
  })

  socket.on('online', async (message) => {
    console.log(`${id} is online`)
    socket.broadcast.emit('socket-online', {
      id
    })
    await UserModel.findOneAndUpdate({
      _id: id
    }, {
      isOnline: true
    }, {
      new: true
    })
  })

  socket.on('disconnect', async (reason) => {
    console.log(`socket ${id} disconnected`)
    socket.broadcast.emit('socket-offline', {
      id
    })
    await UserModel.findOneAndUpdate({
      _id: id
    }, {
      isOnline: false
    }, {
      new: true
    })
  })

  socket.on('send-message', (message) => {
    console.log('send-message event reveived')
    console.log(message)
    socket.to(message.to_id).emit('received-message', {
      from_name: message.from_name,
      to_name: message.to_name,
      to_id: message.to_id,
      from_id: message.from_id,
      message: message.msg,
      timestamp: message.timestamp
    })
    console.log('sent the message')
  })
}

module.exports = socketHandler
