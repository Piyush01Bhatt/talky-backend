const TalkyError = require('../utils/talkyError')
const { checkRequest, getToMeRequestedFriends } = require('../helpers/toMeRequestedHelper')

/**
 * controller to get the friends from whom request was received and accepted
 * @category controllers
 * @module toMeRequestedController
 */

async function toMeRequestedController (req, res) {
  try {
    checkRequest(req)
    const uId = req.params.id
    const page = req.params.page
    const limit = req.params.limit
    const friends = await getToMeRequestedFriends(uId, parseInt(page), parseInt(limit))
    res.negotiate({
      status: 200,
      body: {
        success: true,
        message: 'gotcha! your friends',
        data: friends
      }
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new TalkyError(err.message, 500))
  }
}

module.exports = toMeRequestedController
