const request = require('supertest')
const app = require('../test_utils/testApp')
const mongoose = require('mongoose')
const { UserModel, TempUserModel } = require('../../models/dbUser')
const crypto = require('crypto')

const hash = crypto
  .createHash('md5')
  .update('hello@1234')
  .digest('hex')

const tempUser = {
  name: 'Piyush',
  password: hash,
  email: 'piyush.bhatt@gmail.com',
  otp: '348029'
}

beforeEach(async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/talky', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  await UserModel.deleteMany()
  await TempUserModel.deleteMany()
  await new TempUserModel(tempUser).save()
})

afterEach((done) => {
  mongoose.disconnect(done)
})

test('Should authorise registration by verifying otp', async () => {
  const response = await request(app).post('/user/auth').send({
    email: "piyush.bhatt@gmail.com",
    otp: "348029"
  })

  // assert for response code
  expect(response.statusCode).toBe(201)
  // assert for response body
  expect(response.body.success).toBe(true)
  expect(response.body.message).toBe('user created successfully')
})

test('Should not authorise registration due to wrong otp', async () => {
  const response = await request(app).post('/user/auth').send({
    email: 'piyush.bhatt@gmail.com',
    otp: '334034'
  })

  // assert for response code
  expect(response.statusCode).toBe(400)
  expect(response.body.success).toBe(false)
  expect(response.body.message).toBe('wrong otp')
})
