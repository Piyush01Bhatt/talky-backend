const express = require('express')
const friendRequestController = require('../controllers/friendRequestController')
const acceptRequestController = require('../controllers/acceptFriendRequestController')
const getRequestsController = require('../controllers/getRequestsController')
const getFriendListController = require('../controllers/getFriendlistController')

const friendsRouter = express.Router()

/** send friend request route */
friendsRouter.post('/friend_request', friendRequestController)

/** accept friend request route */
friendsRouter.post('/accept_request', acceptRequestController)

/** get friend requests route */
friendsRouter.get('/get_requests/:id/:page/:limit', getRequestsController)

/** get friend list route */
friendsRouter.get('/get_friendlist/:id/:page/:limit', getFriendListController)

module.exports = friendsRouter
