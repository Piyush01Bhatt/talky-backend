const FriendListModel = require('../models/dbFriendList')
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

async function getFriendList (uId, page, limit) {
  try {
    const PAGE_NUM = page
    const skip = (PAGE_NUM - 1) * limit
    const friends = await FriendListModel.find({ userId: uId })
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

module.exports = {
  checkRequest,
  getFriendList
}
