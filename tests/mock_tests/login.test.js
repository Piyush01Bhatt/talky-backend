const request = require('supertest')
const { app } = require('../test_utils/testApp')
const mongoose = require('mongoose')
const { UserModel } = require('../../models/dbUser')
const crypto = require('crypto')

const hash = crypto
  .createHash('md5')
  .update('hello@1234')
  .digest('hex')

const userOne = {
  name: 'Piyush',
  email: 'piyush@gmail.com',
  password: hash
}

beforeEach(async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/talky', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  await UserModel.deleteMany()
  await new UserModel(userOne).save()
})

afterEach((done) => {
  mongoose.disconnect(done)
})

test('Should login a user', async () => {
  const response = await request(app).post('/user/login').send({
    email: 'piyush@gmail.com',
    password: 'hello@1234'
  })
  // assert for response code
  expect(response.statusCode).toBe(200)
  // assert for response object
  expect(response.body.success).toBe(true)
  expect(response.body.message).toBe('user found')
  expect(response.body.name).toBe(userOne.name)
  expect(response.body.email).toBe(userOne.email)
})

test('Should login a user', async () => {
  const response = await request(app).post('/user/login').send({
    email: 'piyush@gmail.com',
    password: 'fuckoff'
  })
  // assert for response code
  expect(response.statusCode).toBe(400)
  // assert for response body
  expect(response.body.success).toBe(false)
})
