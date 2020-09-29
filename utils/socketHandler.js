import { acceptFriendRequest } from "./acceptReqEventHandler.js"

export function socketHandler(socket){
    const id = socket.handshake.query.id
    socket.join(id)
    console.log(`New WebSocket Connection from ${id}`)
    
    socket.on('on-message',(data)=>{
        console.log(data)
        socket.emit('on-received','got ya!!!!')
    })

    socket.on('send-message',(message)=>{
        console.log('send-message event reveived')
        console.log(message)
        socket.to(message.to).emit('received-message',{
            name:message.name,
            message:message.msg
        })
        console.log('sent the message')
    })

    /*socket.on('accept-friend-request'),async (request)=>{
        acceptFriendRequest(request,socket)
    }*/
}


