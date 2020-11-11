const express = require('express')
const friendRequestController = require('../controllers/friendRequestController')
const acceptFriendRequestController = require('../controllers/acceptFriendRequestController')
const fromMeRequestedController = require('../controllers/fromMeRequestedController')
const toMeRequestedController = require('../controllers/toMeRequestedController')

const friendsRouter = express.Router()

/** friend request route */
friendsRouter.post('/friend_request', friendRequestController)

/** accept friend request */
friendsRouter.post('/accept_request', acceptFriendRequestController)

/** get from me requested friends */
friendsRouter.get('/from_me_requested/:id/:page/:limit', fromMeRequestedController)

/** get to me requested friends */
friendsRouter.get('/to_me_requested/:id/:page/:limit', toMeRequestedController)

module.exports = friendsRouter
