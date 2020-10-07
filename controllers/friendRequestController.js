const TalkyError = require('../utils/talkyError.js')
const { checkFriendRequest, saveFriendRequest } = require('../helpers/friendRequestHelper.js')
const FriendsModel = require('../models/dbFriends.js')

// friend request route
/**
 * @param req
 * @param res
 */

async function friendRequestController (req, res) {
  try {
    checkFriendRequest(req)
    await saveFriendRequest(req)
    const fromUser = await FriendsModel.findOne({ _id: req.body.fo_id })
    if (!fromUser) {
      throw new Error('cannot query user')
    }
    res.io.to(req.body.u_id).emit('received-friend-request', {
      message: 'received request',
      from: fromUser.name,
      id: fromUser._id,
      status: fromUser.status
    })
    res.negotiate({
      status: 201,
      body: {
        success: true,
        message: 'friend request sent'
      }
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new TalkyError(err.message, 500))
  }
}

module.exports = friendRequestController
