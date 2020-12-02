const { checkGetUsersRequest, getFriendRequestInfo, queryDb } = require('../helpers/getUsersHelper')
const TalkyError = require('../utils/talkyError')

/**
 * getUsersController module
 * @category controllers
 * @module getUsersController
 */

/**
 * Gets the registered users
 * @function getUsersController
 * @param {Object} req - Http Request Object
 * @param {Object} res - Http Response Object
 * @returns {void}
 * @throws {TalkyError} for missing request or any internal error with error code
 * @static
 */

async function getUsersController (req, res) {
  try {
    checkGetUsersRequest(req)
    const dbUsers = await queryDb(req)
    const newDbUsers = await getFriendRequestInfo(dbUsers, req.params.id)
    return res.negotiate({
      status: 200,
      body: {
        success: true,
        data: newDbUsers,
        message: 'found users'
      }
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new TalkyError(err.message, 500))
  }
}

module.exports = getUsersController
