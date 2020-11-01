const FriendsModel = require('../models/dbFriends.js')
const TalkyError = require('../utils/talkyError.js')

/**
 * Helper module for fromMeRequestedController
 * @category helpers
 * @module friendRequestHelper
 */

/**
 * Checks if the request body is as expected
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} for missing request
 * @static
 */

function checkRequest (req) {
  const num = req.params.num
  const id = req.params.id
  const page = req.params.page
  if (!(num && id && page && parseInt(num) && parseInt(page))) {
    throw new TalkyError('missing num', 400)
  }
}

/**
 * gets the accepted requests sent by the user
 * @param {string} uId - user id
 * @param {number} num - page size
 * @param {number} page - page number
 * @returns {Array<Object>} an array of objects containing friends' info
 * @throws {TalkyError} for internal errors
 * @static
 */

async function getFromMeRequestedFriends (uId, num, page) {
  try {
    const PAGE_SIZE = num
    const skip = (page - 1) * PAGE_SIZE
    const friends = await FriendsModel.find({ fo_id: uId, accepted: true })
      .skip(skip)
      .limit(PAGE_SIZE)
      .sort({date: -1})
    return friends
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

module.exports = {
  checkRequest,
  getFromMeRequestedFriends
}
