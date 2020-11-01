const express = require('express')
const friendRequestController = require('../controllers/friendRequestController')
const acceptFriendRequestController = require('../controllers/acceptFriendRequestController')
const fromMeRequestedController = require('../controllers/fromMeRequestedController')

const friendsRouter = express.Router()

/** friend request route */
friendsRouter.post('/friend_request', friendRequestController)

/** accept friend request */
friendsRouter.post('/accept_request', acceptFriendRequestController)

/** get from me requested friends */
friendsRouter.get('/from_me_requested/:id/:num/:page', fromMeRequestedController)

module.exports = friendsRouter
