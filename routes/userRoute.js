const express = require('express')
const userRegisterController = require('../controllers/userRegisterController')
const registerAuthController = require('../controllers/registerAuthController')
const loginController = require('../controllers/loginController')
const getUsersController = require('../controllers/getUsersController')

const userRouter = express.Router()

/** register user route */
userRouter.post('/register', userRegisterController)

/** auth route */
userRouter.post('/auth', registerAuthController)

/** login route */
userRouter.post('/login', loginController)

/** get_users route */
userRouter.get('/get_users/:id/:name/:page/:limit', getUsersController)

/** export user router */
module.exports = userRouter
