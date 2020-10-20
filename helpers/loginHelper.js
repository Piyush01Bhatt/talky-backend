const crypto = require('crypto')
const { UserModel } = require('../models/dbUser.js')
const TalkyError = require('../utils/talkyError.js')

/**
  * loginHelper module
  * @category helpers
  * @module loginHelper
  */

/**
 * Checks if the request body is as expected
 * @function checkLoginRequest
 * @param {Object} req - Http request object
 * @returns {void}
 * @throws {TalkyError} for missing request with error code
 * @static
 */

function checkLoginRequest (req) {
  const reqBody = req.body
  if (!(reqBody && (reqBody.email && reqBody.password))) {
    throw new TalkyError('Missing Request', 400)
  }
}

/**
 * Checks if the user exists in the database
 * @function findUser
 * @param {Object} req - Http request object
 * @returns {Object} userData._doc - User data returned by the mongoose user model
 * @throws {TalkyError} for no user or any internal error
 * @static
 */

async function findUser (req) {
  try {
    const reqBody = req.body
    const userData = await UserModel.findOne({ email: reqBody.email }).exec()
    if (!userData) {
      throw new TalkyError('No user found', 512)
    }
    return userData._doc
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

/**
 * Checks if the requested password matches with the stored password
 * @function checkPassword
 * @param {Object} dbUser - the returned user from mongoose user model
 * @param {string} passwd - requested password
 * @returns {Object} dbUser - User data returned by the mongoose model
 * @throws {TalkyError} for password not matched or any internal error
 * @static
 */

function checkPassword (dbUser, passwd) {
  try {
    const hash = crypto
      .createHash('md5')
      .update(passwd)
      .digest('hex')

    if (hash === dbUser.password) {
      console.log('password matched')
      return dbUser
    } else {
      throw new TalkyError('Password not Matched', 512)
    }
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

module.exports = {
  checkLoginRequest,
  findUser,
  checkPassword
}
