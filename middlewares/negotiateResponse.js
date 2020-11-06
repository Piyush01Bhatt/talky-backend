const TalkyError = require('../utils/talkyError.js')

function negotiate (data, err = null) {
  if (data) {
    this.status(data.status)
    this.send({
      success: true,
      ...data.body
    })
  } else if (err instanceof TalkyError) {
    this.status(err.status)
    this.send({
      success: false,
      message: err.message
    })
  } else {
    this.status(500)
    this.send({
      body: {
        success: false,
        message: err.message
      }
    })
  }
}

module.exports = negotiate
