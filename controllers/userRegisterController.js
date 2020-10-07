const { checkAlreadyExists, checkRegisterRequest } = require('../helpers/registerHelper.js')
const { TempUserModel } = require('../models/dbUser')
const genOtp = require('../utils/otpGen')
const sendMail = require('../utils/sendMail')
const TalkyError = require('../utils/talkyError.js')
const crypto = require('crypto')

async function userRegisterController (req, res) {
  // route to create a temp data of user with otp
  try {
    checkRegisterRequest(req)
    await checkAlreadyExists(req)
    const userData = req.body
    await TempUserModel.findOneAndRemove({ email: userData.email }).exec()
    const hash = crypto
      .createHash('md5')
      .update(userData.password)
      .digest('hex')
    const otp = genOtp()
    userData.password = hash
    userData.otp = otp
    const tempUser = await TempUserModel.create(userData)
    if (!tempUser) {
      throw new TalkyError('error creating user', 500)
    }
    sendMail(tempUser.email, 'verification otp', tempUser.otp)
    return res.negotiate({
      status: 201,
      body: {
        success: true,
        message: 'Created'
      }
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new TalkyError(err.message, 500))
  }
}

module.exports = userRegisterController
