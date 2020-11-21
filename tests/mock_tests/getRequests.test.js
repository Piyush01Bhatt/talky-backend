const request = require('supertest')
const { app } = require('../test_utils/testApp')
const mongoose = require('mongoose')
const FriendsModel = require('../../models/dbFriends')
const { UserModel } = require('../../models/dbUser')
const { dummyUsers, dummyToMe } = require('../test_utils/dummyUsers')

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
  } catch (err) {
    console.log(err.message)
  }
})

afterAll((done) => {
  mongoose.disconnect(done)
})

test('get requests', async () => {
  const response = await request(app)
    .get('/friends/get_requests/5f6b42673ffbaf4af3827907/1/30')
    .send()

  // assert for response code
  expect(response.statusCode).toBe(200)
})
