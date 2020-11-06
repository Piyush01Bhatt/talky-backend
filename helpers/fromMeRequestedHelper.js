const FriendsModel = require('../models/dbFriends.js')
const TalkyError = require('../utils/talkyError.js')

/**
 * Helper module for fromMeRequestedController
 * @category helpers
 * @module fromMeRequestedHelper
 */

/**
 * Checks if the request body is as expected
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} for missing request
 * @static
 */

function checkRequest (req) {
  const id = req.params.id
  const currPage = req.params.curr_page
  const prevPage = req.params.prev_page
  const num = parseInt(currPage)
  const prevNum = parseInt(prevPage)
  if (!(id && currPage && prevPage)) {
    throw new TalkyError('missing request', 400)
  }
  if (Number.isNaN(num) || Number.isNaN(prevNum)) {
    throw new TalkyError('pages should be int', 400)
  }
}

/**
 * gets the accepted requests sent by the user
 * @param {string} uId - user id
 * @param {number} currPage - current page size
 * @param {number} prevPage - previous page size
 * @returns {Array<Object>} an array of objects containing friends' info
 * @throws {TalkyError} for internal errors
 * @static
 */

async function getFromMeRequestedFriends (uId, currPage, prevPage) {
  try {
    const PAGE_SIZE = currPage
    const skip = prevPage
    const friends = await FriendsModel.find({ fo_id: uId, accepted: true })
      .skip(skip)
      .limit(PAGE_SIZE)
      .sort({ name: 1 })
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
