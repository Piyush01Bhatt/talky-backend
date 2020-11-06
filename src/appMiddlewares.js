const cors = require('cors')
const bodyParser = require('body-parser')
const negotiate = require('../middlewares/negotiateResponse')

const useMiddlewares = (app, io) => {
  /** set negotiate method to response */
  app.use((req, res, next) => {
    res.negotiate = negotiate
    next()
  })
  /** set io to response */
  app.use((req, res, next) => {
    res.io = io
    next()
  })
  /** set bodyparser */
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  /** set cors */
  app.use(cors())
}

/** exporting middlewares */
module.exports = useMiddlewares
