const FriendsModel = require('../models/dbFriends.js')
const TalkyError = require('../utils/talkyError.js')

/**
 * acceptFriendRequestHelper module
 * @category helpers
 * @module acceptFriendRequestHelper
 */

/**
 * Checks if the request body is as expected
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} for missing request
 * @static
 */

function checkRequest (req) {
  const reqBody = req.body
  if (!(reqBody &&
    reqBody.of_id &&
    reqBody.from_id
  )
  ) {
    throw new TalkyError('missing request', 400)
  }
}

/**
 * accepts request by making aceeptRequest boolean to true
 * @param {Object} req - Http request object
 * @returns {Object} the friend details with accepted property now true
 * @throws {TalkyError} for any internal error
 * @static
 */

async function acceptRequest (req) {
  try {
    const reqBody = req.body
    const friend = await FriendsModel.findOneAndUpdate({
      u_id: reqBody.from_id,
      fo_id: reqBody.of_id
    }, {
      accepted: true
    }, {
      new: true
    })
    if (!friend) {
      throw new TalkyError('no friend with such id to accept', 500)
    }
    return friend._doc
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

module.exports = {
  checkRequest,
  acceptRequest
}
