const userRouter = require('./routes/userRoute')
const friendsRouter = require('./routes/friendsRoute')

// api routes
const appRoutes = (app, io) => {
  /** default route */
  app.get('/', (req, res) => {
    console.log('/ route')
    return res.status(200).send('welcome to talky')
  })

  /** login,register and auth route */
  app.use('/user', userRouter)

  /** friend routes */
  app.use('/friends', friendsRouter)
}

/** exporting app */
module.exports = appRoutes
