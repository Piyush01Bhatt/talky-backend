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
    const currPage = req.params.curr_page
    const prevPage = req.params.prev_page
    const friends = await getToMeRequestedFriends(uId, currPage, prevPage)
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
