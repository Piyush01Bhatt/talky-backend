import FriendsModel from "../db_models/dbFriends.js"

export async function acceptFriendRequest(request, socket) {
    try {
        if(checkRequest(request)){
            
        }
    } catch (e) {
        console.log(e.message)
    }
}

function checkRequest(req) {
    if (req &&
        req.id) {
        return true
    } else {
        return new Error('empty request')
    }
}

async function queryFriendsCollection(request){
    const friend = await FriendsModel.findByIdAndUpdate()
}