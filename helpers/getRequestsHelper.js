const FriendsModel = require('../models/dbFriends.js')
const { UserModel } = require('../models/dbUser.js')
const TalkyError = require('../utils/talkyError.js')

function checkRequest (req) {
  const id = req.params.id
  const page = req.params.page
  const limit = req.params.limit
  if (!(id && page && limit)) {
    throw new TalkyError('missing request', 400)
  }
  if (!(parseInt(page) && parseInt(limit))) {
    throw new TalkyError('pages and limit should be integer', 400)
  }
}

async function getRequests (uId, page, limit) {
  try {
    const PAGE_NUM = page
    const skip = (PAGE_NUM - 1) * limit
    const friends = await FriendsModel.find({ u_id: uId, accepted: false })
      .skip()
      .limit()
      .sort({ date: -1 })
    return friends
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

async function addSentUserInfo (friends) {
  try {
    for (let i = 0; i < friends.length; i++) {
      const foId = friends[i].fo_id
      const sentUser = await UserModel.findOne({ _id: foId }).exec()
      const sentUserInfo = {
        sentUserName: sentUser.name,
        sentUserStatus: sentUser.status
      }
      friends[i] = {
        ...friends[i]._doc,
        ...sentUserInfo
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
  checkRequest,
  getRequests,
  addSentUserInfo
}
