const { UserModel } = require('../models/dbUser.js')
const FriendsModel = require('../models/dbFriends.js')
const TalkyError = require('../utils/talkyError.js')

/**
  * getUsersHelper module
  * @category helpers
  * @module getUsersHelper
  */

/**
 * Checks if the request body is as expected
 * @function checkGetUsersRequest
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} for missing request with error code
 * @static
 */

function checkGetUsersRequest(req) {
  const id = req.params.id
  const page = req.params.page
  const limit = req.params.limit
  const name = req.params.name
  if (!(id &&
    page &&
    limit &&
    name)
  ) {
    throw new TalkyError('missing request', 400)
  }

  if (!(parseInt(page) && parseInt(limit))) {
    throw new TalkyError('page and limit should be a valid integer', 400)
  }
}

/**
 * Queries database to fetch the users with the requested name
 * @function queryDb
 * @param {Object} req - Http request object
 * @returns {Array<Object>} array of objects containing registered users
 * @throws {TalkyError} for any internal error or no user found
 * @static
 */

async function queryDb(req) {
  try {
    const PAGE_SIZE = parseInt(req.params.page)
    const limit = parseInt(req.params.limit)
    const pageMul = (PAGE_SIZE === 1) ? limit : (limit - 1)
    const skip = (PAGE_SIZE - 1) * pageMul
    const regStr = '^' + req.params.name
    const regex = new RegExp(regStr)
    const dbUsers = await UserModel.find({ name: regex })
      .select({ password: 0 })
      .skip(skip)
      .limit(limit)
      .sort({ name: 1 })
      .exec()
    if (!dbUsers) {
      throw new TalkyError("can't query db", 500)
    }
    if (dbUsers.length < 1) {
      throw new TalkyError('empty array returned', 500)
    }
    return dbUsers
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

/**
 * Adds the friend-request status for the returned users from queryDb
 * @function getFriendRequestInfo
 * @param {Object} dbUsers - Http request object
 * @param {string} uId - user id the user that requested the server
 * @returns {Array<Object>} an array of user objects with added info of friend-request status
 * @throws {TalkyError} for any internal error
 * @static
 */

async function getFriendRequestInfo (dbUsers, uId) {
  try {
    for (let i = 0; i < dbUsers.length; i++) {
      const user = dbUsers[i]
      // check if user itself
      if (user._id.toString() === uId) {
        const selfPair = {
          isSelf: true,
          received: false,
          requested: false,
          accepted: false
        }
        dbUsers[i] = { ...dbUsers[i]._doc, ...selfPair }
      } else {
        // check if already send a friend request
        const friend = await FriendsModel.findOne({ u_id: user._id, fo_id: uId }).exec()
        if (!friend) {
          // check if received a request
          const pair = await checkIfReceivedRequest(user, uId)
          dbUsers[i] = { ...dbUsers[i]._doc, ...pair }
        } else {
          const pair = {
            isSelf: false,
            received: false,
            requested: true,
            accepted: friend.accepted
          }
          dbUsers[i] = { ...dbUsers[i]._doc, ...pair }
        }
      }
    }
    return dbUsers
  } catch (e) {
    throw new TalkyError(e.message, 500)
  }
}

/**
 * Checks if friend request is received from the queried user
 * @function checkIfReceivedRequest
 * @param {Object} user - user object
 * @param {string} uId - user-id of the user that requested the server
 * @returns {Object} with the properties showing if any request received
 * @throws {TalkyError} for any internal error
 * @inner
 */

async function checkIfReceivedRequest(user, uId) {
  try {
    const receivedReq = await FriendsModel.findOne({ u_id: uId, fo_id: user._id }).exec()
    if (receivedReq) {
      return {
        received: true,
        requested: false,
        isSelf: false,
        accepted: receivedReq.accepted
      }
    } else {
      return {
        isSelf: false,
        received: false,
        requested: false,
        accepted: false
      }
    }
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

module.exports = {
  checkGetUsersRequest,
  getFriendRequestInfo,
  queryDb
}
