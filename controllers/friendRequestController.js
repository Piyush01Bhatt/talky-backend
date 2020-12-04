const TalkyError = require('../utils/talkyError.js')
const { checkFriendRequest, saveFriendRequest } = require('../helpers/friendRequestHelper.js')
const { UserModel } = require('../models/dbUser.js')

/**
 * friendRequestController module
 * @category controllers
 * @module friendRequestController
 */

/**
 * Saves the request and fires a request socket event
 * @function friendRequestController
 * @param {Object} req - Http Request Object
 * @param {Object} res - Http Response Object
 * @returns {void}
 * @throws {TalkyError} for missing request or any internal error with error code
 * @static
 */

async function friendRequestController (req, res) {
  try {
    checkFriendRequest(req)
    await saveFriendRequest(req)
    const fromUser = await UserModel.findOne({ _id: req.body.fo_id })
    if (!fromUser) {
      throw new TalkyError('cannot query user', 500)
    }
    /** emit request event */
    res.io.to(req.body.u_id).emit('received-friend-request', {
      message: 'received request',
      from: fromUser.name,
      id: fromUser._id,
      status: fromUser.status,
      isOnline: fromUser.isOnline
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
