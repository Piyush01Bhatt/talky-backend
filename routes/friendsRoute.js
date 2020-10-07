const express = require('express')
const friendRequestController = require('../controllers/friendRequestController')

const friendsRouter = express.Router()

/** friend request route */
friendsRouter.post('/friend_request', friendRequestController)

module.exports = friendsRouter
