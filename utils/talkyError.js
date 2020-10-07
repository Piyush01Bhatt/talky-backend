class TalkyError extends Error {
  constructor (message, status, error = null) {
    super(message)
    this.status = status
    this.name = 'TalkyError'
    if (error && error instanceof Error) {
      // log error
    }
  }
}

module.exports = TalkyError
