const TalkyError = require('../utils/talkyError')
const { checkRequest, getRequests } = require('../helpers/getRequestsHelper')

async function getRequestsController (req, res) {
  try {
    checkRequest(req)
    const uId = req.params.id
    const page = req.params.page
    const limit = req.params.limit
    const friends = await getRequests(uId, parseInt(page), parseInt(limit))
    res.negotiate({
      status: 200,
      body: {
        success: true,
        message: 'gotcha! your requests',
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

module.exports = getRequestsController
