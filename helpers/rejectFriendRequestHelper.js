const FriendsModel = require('../models/dbFriends')
const TalkyError = require('../utils/talkyError')

function checkRequest (req) {
  if (!(req.body && req.body.userId && req.body.friendId)) {
    throw new TalkyError('missing request', 400)
  }
}

async function rejectRequest (req) {
  try {
    const reqBody = req.body
    await FriendsModel.findOneAndRemove({
      u_id: reqBody.userId,
      fo_id: reqBody.friendId
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

module.exports = {
  checkRequest,
  rejectRequest
}
