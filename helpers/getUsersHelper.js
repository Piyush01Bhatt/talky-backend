const { UserModel } = require('../models/dbUser.js')
const FriendsModel = require('../models/dbFriends.js')
const TalkyError = require('../utils/talkyError.js')
/**
 * @param  {} req Request object
 * @description ye functions
 */
function checkGetUsersRequest (req) {
  const reqBody = req.body
  console.log(reqBody)
  if (!(reqBody &&
    (reqBody.queryName &&
      reqBody.last_id &&
      reqBody.u_id &&
      reqBody.num))
  ) {
    throw new TalkyError('missing request', 400)
  }
}

async function queryDb (req) {
  try {
    const reqBody = req.body
    let dbUsers
    if (reqBody.last_id === 'fake') {
      dbUsers = await UserModel.find({ name: reqBody.queryName }, { password: 0 }, { limit: reqBody.num }).exec()
    } else {
      dbUsers = await UserModel.find({ name: reqBody.queryName, _id: { $gt: reqBody.last_id } }, { password: 0 }, { limit: reqBody.num }).exec()
    }
    if (!dbUsers) {
      throw new TalkyError("can't query db", 500)
    }
    if (dbUsers.length < 1) {
      throw new TalkyError('empty array returned', 512)
    }
    return dbUsers
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

async function getFriendRequestInfo (dbUsers, uId) {
  try {
    console.log(dbUsers.length)
    for (let i = 0; i < dbUsers.length; i++) {
      const user = dbUsers[i]
      const friend = await FriendsModel.findOne({ u_id: user._id, fo_id: uId }).exec()
      if (!friend) {
        console.log('not friend')
        const pair = {
          requested: false,
          accepted: false
        }
        // dbUsers[i]["requested"] = false;
        // dbUsers[i]["accepted"]  = false;
        dbUsers[i] = { ...dbUsers[i]._doc, ...pair }
      } else {
        console.log('friend')
        const pair = {
          requested: true,
          accepted: friend.accepted
        }
        dbUsers[i] = { ...dbUsers[i]._doc, ...pair }
      }
    }
    return dbUsers
  } catch (e) {
    throw new TalkyError(e.message, 500)
  }
}

module.exports = {
  checkGetUsersRequest,
  getFriendRequestInfo,
  queryDb
}
