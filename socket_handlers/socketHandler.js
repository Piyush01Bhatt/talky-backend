
const { UserModel } = require('../models/dbUser')

function socketHandler (socket) {
  const id = socket.handshake.query.id
  socket.join(id)

  socket.on('on-message', (data) => {
    socket.emit('on-received', 'got ya!!!!')
  })

  socket.on('online', async (message) => {
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
    socket.to(message.to_id).emit('received-message', {
      from_name: message.from_name,
      to_name: message.to_name,
      to_id: message.to_id,
      from_id: message.from_id,
      message: message.msg,
      timestamp: message.timestamp
    })
  })
}

module.exports = socketHandler
