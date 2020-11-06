const { TempUserModel, UserModel } = require('../models/dbUser.js')
const TalkyError = require('../utils/talkyError.js')

/**
  * registerAuthHelper module
  * @category helpers
  * @module registerAuthHelper
  */

/**
 * Checks if the request body is as expected
 * @function checkRegisterAuthRequest
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} for missing request with error code
 * @static
 */

function checkRegisterAuthRequest (req) {
  const reqBody = req.body
  if (!(
    reqBody &&
    reqBody.email &&
    reqBody.otp
  )) {
    throw new TalkyError('missing request', 400)
  }
}

/**
 * Checks the database for if user already exists
 * @function findUser
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} if user already exists or any internal error
 * @static
 */

async function findUser (req) {
  try {
    const dbUser = await UserModel.findOne({ email: req.email }).exec()
    if (dbUser) {
      throw new TalkyError('User already exists', 400)
    }
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

/**
 * Finds user stored as unregistered for authorisation
 * @function findTempUser
 * @param {Object} reqBody - Body of http request
 * @returns {Object} info of unregistered user
 * @throws {TalkyError} if no unreqistered user exists or any internal error
 * @static
 */

async function findTempUser (reqBody) {
  try {
    const dbData = await TempUserModel.findOne({
      email: reqBody.email
    }).exec()
    if (!dbData) {
      throw new TalkyError('not registered', 400)
    }
    return dbData._doc
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

/**
 * Verifies otp
 * @function verifyOtp
 * @param {string} dbOtp - Otp stored in database
 * @param {string} reqOtp - Otp requested
 * @returns {void}
 * @throws {TalkyError} if otp not matches
 * @static
 */

function verifyOtp (dbOtp, reqOtp) {
  if (!(dbOtp === reqOtp)) {
    throw new TalkyError('wrong otp', 400)
  }
}

module.exports = {
  checkRegisterAuthRequest,
  findUser,
  findTempUser,
  verifyOtp
}
