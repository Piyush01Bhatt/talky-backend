const { checkGetUsersRequest, getFriendRequestInfo, queryDb } = require('../helpers/getUsersHelper')
const TalkyError = require('../utils/talkyError')

async function getUsersController(req, res) {
  try {
    checkGetUsersRequest(req)
    const dbUsers = await queryDb(req)
    const lastId = dbUsers[dbUsers.length - 1]._id
    const newDbUsers = await getFriendRequestInfo(dbUsers, req.u_id)
    res.negotiate({
      status: 200,
      body: {
        success: true,
        data: newDbUsers,
        last_id: lastId,
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
