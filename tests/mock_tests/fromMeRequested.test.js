const request = require('supertest')
const app = require('../test_utils/testApp')
const mongoose = require('mongoose')
const FriendsModel = require('../../models/dbFriends')
const dummyFromMe = require('../test_utils/dummyFromMe')

beforeAll(async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/talky', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  try {
    await FriendsModel.deleteMany()
    await FriendsModel.insertMany(dummyFromMe)
  } catch (err) {
    console.log(err.message)
  }
})

afterAll((done) => {
  mongoose.disconnect(done)
})

test('Should return from me friends', async () => {
  // request 1
  const response = await request(app)
    .get('/friends/from_me_requested/5f6b42673ffbaf4af3827907/4/0')
    .send()
  // assert for response code
  expect(response.statusCode).toBe(200)
  // assert for response body
  expect(response.body.success).toBe(true)
  expect(response.body.data.length).toBe(4)

  // request 2
  const response2 = await request(app)
    .get('/friends/from_me_requested/5f6b42673ffbaf4af3827907/5/4')
    .send()
    // assert for response code
  expect(response2.statusCode).toBe(200)
  // assert for response body
  expect(response2.body.success).toBe(true)
  expect(response2.body.data.length).toBe(5)

  // request 3
  const response3 = await request(app)
    .get('/friends/from_me_requested/5f6b42673ffbaf4af3827907/3/9')
    .send()
    // assert for response code
  expect(response3.statusCode).toBe(200)
  // assert for response3 body
  expect(response3.body.success).toBe(true)
  expect(response3.body.data.length).toBe(1)
  console.log(response3.body.data)
})
