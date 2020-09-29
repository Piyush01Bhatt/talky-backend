import mongoose from 'mongoose'

const talkyFriendsSchema = mongoose.Schema ({
    name       : { type: String, required:true },
    status     : { type: String },
    date       : { type: Date, default:Date.now()},
    u_id       : { type: String, required:true },
    fo_id      : { type: String, required:true },
    accepted   : { type: Boolean, default:false}
})

const FriendsModel = mongoose.model('friends', talkyFriendsSchema)

export default FriendsModel