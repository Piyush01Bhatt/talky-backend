const TalkyError = require('../utils/talkyError.js')
const { checkRequest, acceptRequest } = require('../helpers/acceptFriendRequestHelper.js')

/**
 * acceptFriendRequestController module
 * @category controllers
 * @module acceptFriendRequestController
 */

/**
 * Accepts friend request
 * @param {Object} req - Http Request Object
 * @param {Object} res - Http Response Object
 * @returns {void}
 * @throws {TalkyError} for missing request or any internal errors
 * @static
 */

async function acceptFriendRequestController (req, res) {
  try {
    checkRequest(req)
    const friend = await acceptRequest(req)
    res.negotiate({
      status: 201,
      body: {
        success: true,
        message: 'request accepted successfully',
        ...friend
      }
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new TalkyError(err.message, 500))
  }
}

module.exports = acceptFriendRequestController
