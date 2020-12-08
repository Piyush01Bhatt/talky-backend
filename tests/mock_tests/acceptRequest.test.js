const request = require('supertest')
const { app } = require('../test_utils/testApp')
const mongoose = require('mongoose')
const FriendsModel = require('../../models/dbFriends')
const FriendListModel = require('../..//models/dbFriendList')
const { UserModel } = require('../..//models/dbUser.js')
const { dummyToMe, dummyUsers } = require('../test_utils/dummyUsers')

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
    await FriendListModel.deleteMany()
    await UserModel.insertMany(dummyUsers)
    await FriendsModel.insertMany(dummyToMe)
  } catch (err) {
    console.log(err.message)
  }
})

afterAll((done) => {
  mongoose.disconnect(done)
})

test('Should accept request', async () => {
  const response = await request(app)
    .post('/friends/accept_request')
    .send({
      userId: '5f6b42673ffbaf4af3827907',
      friendId: '5fa4ed0f8da64e3dbd0ed37d'
    })
  expect(response.statusCode).toBe(201)
  expect(response.body.success).toBe(true)
  expect(response.body.message).toBe('request accepted successfully')

  // checking entry to friend list collection
  const savedList = await FriendListModel.find({}).exec()
  expect(savedList.length).toBe(2)
  console.log(savedList)
})
