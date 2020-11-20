const request = require('supertest')
const { app } = require('../test_utils/testApp')
const mongoose = require('mongoose')
const FriendsModel = require('../../models/dbFriends')
const dummyToMe = require('../test_utils/dummyToMe')

beforeAll(async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/talky', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  try {
    await FriendsModel.deleteMany()
    await FriendsModel.insertMany(dummyToMe)
  } catch (err) {
    console.log(err.message)
  }
})

afterAll((done) => {
  mongoose.disconnect(done)
})

test('Should return to me friends', async () => {
  // request 1
  const response = await request(app)
    .get('/friends/to_me_requested/5f6b42673ffbaf4af3827907/1/4')
    .send()
  // assert for response code
  expect(response.statusCode).toBe(200)
  // assert for response body
  expect(response.body.success).toBe(true)
  expect(response.body.data.length).toBe(4)

  // request 2
  const response2 = await request(app)
    .get('/friends/to_me_requested/5f6b42673ffbaf4af3827907/2/4')
    .send()
    // assert for response code
  expect(response2.statusCode).toBe(200)
  // assert for response body
  expect(response2.body.success).toBe(true)
  expect(response2.body.data.length).toBe(4)

  // request 3
  const response3 = await request(app)
    .get('/friends/to_me_requested/5f6b42673ffbaf4af3827907/3/4')
    .send()
    // assert for response code
  expect(response3.statusCode).toBe(200)
  // assert for response3 body
  expect(response3.body.success).toBe(true)
  expect(response3.body.data.length).toBe(2)
})
