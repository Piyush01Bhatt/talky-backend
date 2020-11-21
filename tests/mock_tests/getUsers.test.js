const request = require('supertest')
const { app } = require('../test_utils/testApp')
const mongoose = require('mongoose')
const FriendsModel = require('../../models/dbFriends')
const { UserModel } = require('../../models/dbUser')
const { dummyUsers, dummyToMe, dummyFromMe } = require('../test_utils/dummyUsers')

beforeAll(async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/talky', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  try {
    await FriendsModel.deleteMany()
    await UserModel.deleteMany()
    await UserModel.insertMany(dummyUsers)
    await FriendsModel.insertMany(dummyToMe)
    await FriendsModel.insertMany(dummyFromMe)
  } catch (err) {
    console.log(err.message)
  }
})

afterAll((done) => {
  mongoose.disconnect(done)
})

test('get user who was requested and accepted', async () => {
  const response = await request(app)
    .get('/user/get_users/5f6b42673ffbaf4af3827907/Meethi/1/10')
    .send()

  // assert for response code
  expect(response.statusCode).toBe(200)
  // assert for response body
  expect(response.body.success).toBe(true)
  expect(response.body.data.length).toBe(1)
  // assert for data
  expect(response.body.data[0].name).toBe('Meethi')
  expect(response.body.data[0].received).toBe(false)
  expect(response.body.data[0].requested).toBe(true)
  expect(response.body.data[0].accepted).toBe(true)
})

test('get user who was requested and rejected', async () => {
  const response = await request(app)
    .get('/user/get_users/5f6b42673ffbaf4af3827907/Haddi/1/10')
    .send()

  // assert for response code
  expect(response.statusCode).toBe(200)
  // assert for response body
  expect(response.body.success).toBe(true)
  expect(response.body.data.length).toBe(1)
  // assert for data
  expect(response.body.data[0].name).toBe('Haddi')
  expect(response.body.data[0].received).toBe(false)
  expect(response.body.data[0].requested).toBe(true)
  expect(response.body.data[0].accepted).toBe(false)
})

// to me requested
test('get user who requested me and accepted', async () => {
  const response = await request(app)
    .get('/user/get_users/5f6b42673ffbaf4af3827907/Saharsh/1/10')
    .send()

  // assert for response code
  expect(response.statusCode).toBe(200)
  // assert for response body
  expect(response.body.success).toBe(true)
  expect(response.body.data.length).toBe(1)
  // assert for data
  expect(response.body.data[0].name).toBe('Saharsh')
  expect(response.body.data[0].received).toBe(true)
  expect(response.body.data[0].requested).toBe(false)
  expect(response.body.data[0].accepted).toBe(true)
})

test('get user who requested me and rejected', async () => {
  const response = await request(app)
    .get('/user/get_users/5f6b42673ffbaf4af3827907/Ishaan/1/10')
    .send()

  // assert for response code
  expect(response.statusCode).toBe(200)
  // assert for response body
  expect(response.body.success).toBe(true)
  expect(response.body.data.length).toBe(1)
  // assert for data
  expect(response.body.data[0].name).toBe('Ishaan')
  expect(response.body.data[0].received).toBe(true)
  expect(response.body.data[0].requested).toBe(false)
  expect(response.body.data[0].accepted).toBe(false)
})

// not requested user
test('get user not requested or received', async () => {
  const response = await request(app)
    .get('/user/get_users/5f6b42673ffbaf4af3827907/Pawan/1/10')
    .send()

  // assert for response code
  expect(response.statusCode).toBe(200)
  // assert for response body
  expect(response.body.success).toBe(true)
  expect(response.body.data.length).toBe(1)
  // assert for data
  expect(response.body.data[0].name).toBe('Pawan')
  expect(response.body.data[0].received).toBe(false)
  expect(response.body.data[0].requested).toBe(false)
  expect(response.body.data[0].accepted).toBe(false)
})

// pagination test

test('get user named kinnu for pagination', async () => {
  // request 1 ... page 1
  const response = await request(app)
    .get('/user/get_users/5f6b42673ffbaf4af3827907/kinnu/1/3')
    .send()
  expect(response.statusCode).toBe(200)
  expect(response.body.data.length).toBe(3)
  // request 2 ... page 2
  const response2 = await request(app)
    .get('/user/get_users/5f6b42673ffbaf4af3827907/kinnu/2/3')
    .send()
  expect(response2.statusCode).toBe(200)
  // request 3 ... page 1 again
  const response3 = await request(app)
    .get('/user/get_users/5f6b42673ffbaf4af3827907/kinnu/1/3')
    .send()
  expect(response3.statusCode).toBe(200)
})
