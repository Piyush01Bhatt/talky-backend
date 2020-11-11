const FriendsModel = require('../models/dbFriends.js')
const TalkyError = require('../utils/talkyError.js')

/**
  * friendRequestHelper module
  * @category helpers
  * @module friendRequestHelper
  */

/**
 * Checks if the request body is as expected
 * @function checkFriendRequest
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} for missing request with error code
 * @static
 */

function checkFriendRequest (req) {
/**
 * u_id : id of the person to whom friend request is sent
 * name : name of the person to whom friend request is sent
 * status: status of the person to whom friend request is sent
 * fo_id : id of the person from whom friend request was sent
 */
  const reqBody = req.body
  if (!(reqBody &&
    reqBody.u_id &&
    reqBody.name &&
    reqBody.status &&
    reqBody.fo_id)
  ) {
    throw new TalkyError('missing request', 400)
  }
}

/**
 * Saves the friend request to the database
 * @function saveFriendRequest
 * @param {Object} req - Http request object
 * @returns {Object} the saved request object
 * @throws {TalkyError} for any internal error
 * @static
 */

async function saveFriendRequest (req) {
  try {
    const reqBody = req.body
    const friend = await FriendsModel.findOne({
      u_id: reqBody.u_id,
      fo_id: reqBody.fo_id
    }).exec()
    if (friend) {
      throw new TalkyError('already requested', 400)
    }
    const newFriend = await FriendsModel.create({
      name: reqBody.name,
      status: reqBody.status,
      u_id: reqBody.u_id,
      fo_id: reqBody.fo_id
    })
    if (!newFriend) {
      throw new TalkyError('error creating friend', 500)
    }
    return newFriend
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

module.exports = {
  checkFriendRequest,
  saveFriendRequest
}
