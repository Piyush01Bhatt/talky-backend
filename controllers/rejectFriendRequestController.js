const TalkyError = require('../utils/talkyError')
const { checkRequest, rejectRequest } = require('../helpers/rejectFriendRequestHelper')

async function rejectFriendRequestController (req, res) {
  try {
    checkRequest(req)
    await rejectRequest(req)
    res.negotiate({
      status: 200,
      body: {
        success: true,
        message: 'request rejected successfully'
      }
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new TalkyError(err.message, 500))
  }
}

module.exports = rejectFriendRequestController
