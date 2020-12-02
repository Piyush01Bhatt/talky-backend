const TalkyError = require('../utils/talkyError')
const { checkRequest, getFriendList, checkIfOnline } = require('../helpers/getFriendListHelper')

async function getFriendListController (req, res) {
  try {
    checkRequest(req)
    const uId = req.params.id
    const page = req.params.page
    const limit = req.params.limit
    const friendList = await getFriendList(uId, parseInt(page), parseInt(limit))
    const newFriendList = await checkIfOnline(friendList)
    res.negotiate({
      status: 200,
      body: {
        success: true,
        message: 'gotcha! your friends',
        data: newFriendList
      }
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new TalkyError(err.message, 500))
  }
}

module.exports = getFriendListController
