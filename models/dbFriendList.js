const mongoose = require('mongoose')

const friendListSchema = mongoose.Schema({
  name: { type: String, required: true },
  status: { type: String },
  date: { type: Date, default: Date.now() },
  friendId: { type: String, required: true },
  userId: { type: String, required: true }
})

const FriendListModel = mongoose.model('friendList', friendListSchema)

module.exports = FriendListModel
