const { checkLoginRequest, checkPassword, findUser } = require('../helpers/loginHelper.js')
const TalkyError = require('../utils/talkyError.js')

async function loginController (req, res) {
  try {
    checkLoginRequest(req)
    const userData = await findUser(req)
    const { password, ...resolvedUser } = checkPassword(userData, req.body.password)
    return res.negotiate({
      status: 200,
      body: {
        ...resolvedUser,
        message: 'user found'
      }
    })
  } catch (err) {
    if (err instanceof TalkyError) {
      return res.negotiate(null, err)
    }
    return res.negotiate(null, new TalkyError(err.message, 500))
  }
}

module.exports = loginController
