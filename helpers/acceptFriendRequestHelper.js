const FriendsModel = require('../models/dbFriends.js')
const FriendListModel = require('../models/dbFriendList')
const { UserModel } = require('../models/dbUser.js')
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
    reqBody.userId &&
    reqBody.friendId
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
      u_id: reqBody.userId,
      fo_id: reqBody.friendId
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

async function addToFriendList (friendInfo) {
  try {
    const fInfo = await UserModel.findOne({ _id: friendInfo.fo_id }).exec()
    const friendList = [
      {
        name: friendInfo.name,
        status: friendInfo.status,
        friendId: friendInfo.u_id,
        userId: friendInfo.fo_id
      },
      {
        name: fInfo._doc.name,
        status: fInfo._doc.status,
        friendId: fInfo._doc._id,
        userId: friendInfo.u_id
      }
    ]
    await FriendListModel.insertMany(friendList)
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

module.exports = {
  checkRequest,
  acceptRequest,
  addToFriendList
}
