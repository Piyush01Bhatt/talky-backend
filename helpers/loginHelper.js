const crypto = require('crypto')
const { UserModel } = require('../models/dbUser.js')
const TalkyError = require('../utils/talkyError.js')

function checkLoginRequest (req) {
  const reqBody = req.body
  if (!(reqBody && (reqBody.email && reqBody.password))) {
    throw new TalkyError('Missing Request', 400)
  }
}

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
