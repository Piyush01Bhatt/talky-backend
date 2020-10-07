const { TempUserModel, UserModel } = require('../models/dbUser.js')
const TalkyError = require('../utils/talkyError.js')

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

async function findUser (req) {
  try {
    const dbUser = await UserModel.findOne({ email: req.email }).exec()
    if (dbUser) {
      throw new TalkyError('User already exists', 200)
    }
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

async function findTempUser (reqBody) {
  try {
    const dbData = await TempUserModel.findOne({
      email: reqBody.email
    }).exec()
    if (!dbData) {
      throw new TalkyError('not registered', 200)
    }
    return dbData._doc
  } catch (err) {
    if (err instanceof TalkyError) {
      throw err
    }
    throw new TalkyError(err.message, 500)
  }
}

function verifyOtp (dbOtp, reqOtp) {
  if (!(dbOtp === reqOtp)) {
    throw new TalkyError('wrong otp', 200)
  }
}

module.exports = {
  checkRegisterAuthRequest,
  findUser,
  findTempUser,
  verifyOtp
}
