const request = require('supertest')
const { app } = require('../test_utils/testApp')
const { dummyToMe } = require('../test_utils/dummyUsers')
const mongoose = require('mongoose')
const FriendsModel = require('../../models/dbFriends')

beforeEach(async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/talky', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  await FriendsModel.deleteMany()
  await FriendsModel.insertMany(dummyToMe)
})

afterEach((done) => {
  mongoose.disconnect(done)
})

test('Should reject request', async () => {
  const dbCheck = await FriendsModel.findOne({u_id: '5f6b42673ffbaf4af3827907', fo_id: '5fa4ed0f8da64e3dbd0ed37d'}).exec()
  expect(dbCheck).not.toBe(null)
  const response = await request(app)
    .post('/friends/reject_request')
    .send({
      userId: '5f6b42673ffbaf4af3827907',
      friendId: '5fa4ed0f8da64e3dbd0ed37d'
    })
  expect(response.statusCode).toBe(200)

  const dbCheck2 = await FriendsModel.findOne({u_id: '5f6b42673ffbaf4af3827907', fo_id: '5fa4ed0f8da64e3dbd0ed37d'}).exec()
  expect(dbCheck2).toBe(null)
})
