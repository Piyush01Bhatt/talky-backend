// const request = require('supertest')
const { server } = require('../test_utils/testApp')
const mongoose = require('mongoose')
const { UserModel } = require('../../models/dbUser')
const FriendsModel = require('../../models/dbFriends')
const io = require('socket.io-client')
const { agent } = require('supertest')
const { dummyUsers } = require('../test_utils/dummyUsers')

jest.setTimeout(10000)

const request = agent(server)
let newSocket

beforeAll(async (done) => {
  mongoose.connect('mongodb://127.0.0.1:27017/talky', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  try {
    await FriendsModel.deleteMany()
    await UserModel.deleteMany()
    await new UserModel(dummyUsers[0]).save()

    server.listen(8001, () => {
      console.log(`Listening on localhost:${8001}`)
      newSocket = io(
        'http://localhost:8001',
        {
          query: {
            id: '5fa4ed0f8da64e3dbd0ed367'
          }
        }
      )
      done()
    })
  } catch (err) {
    console.log(err.message)
  }
})

afterAll((done) => {
  newSocket.disconnect()
  server.close()
  mongoose.disconnect()
  done()
})

test('should save friend request and emit io event', async () => {
  newSocket.once('received-friend-request', (requestInfo) => {
    console.log(requestInfo)
  })
  // request
  const response = await request
    .post('/friends/friend_request')
    .send({
      name: 'Meethizz',
      u_id: '5fa4ed0f8da64e3dbd0ed367',
      fo_id: '5f6b42673ffbaf4af3827907',
      status: 'Hey I am using talky'
    })
  console.log(response.body)
  expect(response.statusCode).toBe(201)
  // socket event
})
