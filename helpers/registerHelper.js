const { UserModel } = require('../models/dbUser.js')
const TalkyError = require('../utils/talkyError')

/**
  * registerHelper module
  * @category helpers
  * @module registerHelper
  */

/**
 * Checks if the request body is as expected
 * @function checkRegisterRequest
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} for missing request with error code
 * @static
 */

function checkRegisterRequest (req) {
  const reqBody = req.body
  if (!(reqBody && reqBody.name && reqBody.password && reqBody.email)) {
    throw new TalkyError('missing request', 400)
  }
}

/**
 * Checks if user already exists
 * @function checkAlreadyExists
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} if user already exists or any internal error
 * @static
 */

async function checkAlreadyExists (req) {
  try {
    const userData = req.body
    const dbData = await UserModel.findOne({ email: userData.email }).exec()
    if (dbData) {
      throw new TalkyError('user already exists', 514)
    }
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

module.exports = {
  checkAlreadyExists,
  checkRegisterRequest
}
