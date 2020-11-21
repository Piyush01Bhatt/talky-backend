const mongoose = require('mongoose')

const talkyUserSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: "Hey I'm using talky" },
  date: { type: Date, default: Date.now() }
})

const talkyTempUserSchema = mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, expires: 900, default: Date.now() }
})

const TempUserModel = mongoose.model('tempusers', talkyTempUserSchema)
const UserModel = mongoose.model('users', talkyUserSchema)

module.exports = {
  TempUserModel,
  UserModel
}
