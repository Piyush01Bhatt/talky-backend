const request = require('supertest')
const { app } = require('../test_utils/testApp')
const mongoose = require('mongoose')
const FriendListModel = require('../../models/dbFriendList')
const dummyFriendlist = require('../test_utils/dummyFriendlist')

beforeAll(async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/talky', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  try {
    await FriendListModel.deleteMany()
    await FriendListModel.insertMany(dummyFriendlist)
  } catch (err) {
    console.log(err.message)
  }
})

afterAll((done) => {
  mongoose.disconnect(done)
})

test('get friend list', async () => {
  const response = await request(app)
    .get('/friends/get_friendlist/5f6b42673ffbaf4af3827907/1/30')
    .send()
  console.log(response.body)
  // assert for response code
  expect(response.statusCode).toBe(200)
  expect(response.body.data.length).toBe(4)
})
