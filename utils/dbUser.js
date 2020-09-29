import mongoose from 'mongoose'

const talkyUserSchema = mongoose.Schema({
    name    : { type: String, required:true},
    password: { type: String, required:true},
    email   : { type: String, required:true},
    status  : {type: String, default:"Hey I'm using talky"},
    date    : { type: Date  , default:Date.now()}
})

const talkyTempUserSchema = mongoose.Schema({
    name    : { type: String, required:true},
    password: { type: String, required:true},
    email   : { type: String, required:true},
    otp     : { type: String, required:true},
    createdAt: {type:Date, expires:600, default:Date.now()}
});

export  const TempUserModel = mongoose.model('tempusers', talkyTempUserSchema)
export  const UserModel = mongoose.model('users', talkyUserSchema)