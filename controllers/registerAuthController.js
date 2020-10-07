const { checkRegisterAuthRequest, findUser, findTempUser, verifyOtp } = require('../helpers/registerAuthHelper.js')
const { UserModel } = require('../models/dbUser.js')
const TalkyError = require('../utils/talkyError.js')

async function registerAuthController (req, res) {
  try {
    checkRegisterAuthRequest(req)
    await findUser(req)
    const userData = req.body
    const dbData = await findTempUser(userData)
    const dbOtp = dbData.otp
    verifyOtp(dbOtp, userData.otp)
    const permUser = {
      name: dbData.name,
      email: dbData.email,
      password: dbData.password
    }
    // create new user
    await UserModel.create(permUser)
    return res.negotiate({
      status: 201,
      body: {
        success: true,
        message: 'user created successfully'
      }
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new TalkyError(err.message, 500))
  }
}

module.exports = registerAuthController
