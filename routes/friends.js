import express from "express"
import { checkFriendRequest, saveFriendRequest } from "../utils/friendRequestHandler.js";
import FriendsModel from "../utils/dbFriends.js";
export const friendsRouter = express.Router();

// friend request route
friendsRouter.post(
    '/friend_request',
    checkFriendRequest,
    async (req,res)=>{
        try{
            const newFriend = await saveFriendRequest(req.body)
            const fromUser  = await FriendsModel.findOne({_id:req.body.fo_id})
            if(!fromUser){
                throw new Error('cannot query user')
            }
            res.io.to(req.body.u_id).emit('received-friend-request',{
                message: "received request",
                from   : fromUser.name,
                id     : fromUser._id,
                status : fromUser.status
            })
        }catch(e){
            return new Error(e.message)
        }
    }
)