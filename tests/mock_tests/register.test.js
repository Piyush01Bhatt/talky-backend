const request = require('supertest')
const app = require('../test_utils/testApp')
const mongoose = require('mongoose')
const { UserModel, TempUserModel } = require('../../models/dbUser')

jest.setTimeout(30000)

beforeEach(async () => {
  mongoose.connect('mongodb://127.0.0.1:27017/talky', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  await UserModel.deleteMany()
  await TempUserModel.deleteMany()
})

afterEach((done) => {
  mongoose.disconnect(done)
})

test('Should temporary register a user', async () => {
  const response = await request(app).post('/user/register').send({
    name: 'Piyush',
    password: 'pass123',
    email: 'piyush.bhatt@gmail.com'
  })
  expect(response.statusCode).toBe(201)
})

