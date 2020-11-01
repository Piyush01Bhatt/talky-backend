const TalkyError = require('../utils/talkyError')
const { checkRequest, getFromMeRequestedFriends } = require('../helpers/fromMeRequestedHelper')

/**
 * controller to get the friends that were requested
 * @category controllers
 * @module fromMeRequestedController
 */

/**
 * gets the friends that were requested by the user
 * @param {Object} req - Http request object
 * @param {Object} res - Http response object
 * @returns {none}
 * @throws {TalkyError} for any internal errors
 * @static
 */
async function fromMeRequestedController (req, res) {
  try {
    checkRequest(req)
    const num = parseInt(req.params.num)
    const uId = req.params.id
    const page = req.params.page
    const friends = await getFromMeRequestedFriends(uId, num, page)
    res.negotiate({
      status: 200,
      body: {
        success: true,
        message: 'gotcha your friends!!',
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

module.exports = fromMeRequestedController
