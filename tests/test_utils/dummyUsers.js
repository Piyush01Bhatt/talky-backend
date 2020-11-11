const crypto = require('crypto')

function getHash (val) {
  const hash = crypto
    .createHash('md5')
    .update(val)
    .digest('hex')
  return hash
}

const dummyUsers = [
  {
    name: 'Piyush',
    _id: '5f6b42673ffbaf4af3827907',
    email: 'piyushbolt@test.com',
    password: getHash('piyushbolt123') // me user
  },
  {
    name: 'Meethi',
    _id: '5fa4ed0f8da64e3dbd0ed367',
    email: 'meethibolt@test.com',
    password: getHash('meethibolt123') // sent req by me..accepted
  },
  {
    name: 'Pawan',
    email: 'pawanbolt@test.com',
    _id: '5fa4ed0f8da64e3dbd0ed369',
    password: getHash('pawanbolt123') // not sent request
  },
  {
    name: 'Anil',
    email: 'anilbolt@gmail.com',
    _id: '5fa4ed0f8da64e3dbd0ed36b',
    password: getHash('anilbolt123') // not sent request
  },
  {
    name: 'kinnu don',
    email: 'kinnubolt@test.com',
    _id: '5fa4ed0f8da64e3dbd0ed36d',
    password: getHash('kinnubolt123') // sent req by me..rejected
  },
  {
    name: 'kinnu Bhaskar',
    email: 'maadabolt@test.com',
    _id: '5fa4ed0f8da64e3dbd0ed36f',
    password: getHash('maadabolt123') // sent req by me.. accepted
  },
  {
    name: 'kinnu Billa',
    email: 'billabolt@test.com',
    _id: '5fa4ed0f8da64e3dbd0ed371',
    password: getHash('billabolt123') // not sent request
  },
  {
    name: 'kinnu dj',
    email: 'tedbolt@test.com',
    _id: '5fa4ed0f8da64e3dbd0ed373',
    password: getHash('tedbolt123') // not sent request
  },
  {
    name: 'kinnu comp',
    email: 'bhaadubolt@gmail.com',
    _id: '5fa4ed0f8da64e3dbd0ed375',
    password: getHash('bhaadubolt123') // not sent request
  },
  {
    name: 'kinnu',
    email: 'jiggubolt@gmail.com',
    _id: '5fa4ed0f8da64e3dbd0ed377',
    password: getHash('jiggubolt123') // not sent request
  },
  {
    name: 'Haddi',
    email: 'haddibolt@gmail.com',
    _id: '5fa4ed0f8da64e3dbd0ed379',
    password: getHash('haddibolt123') // sent request by me..rejected
  }, // TO ME
  {
    name: 'Saharsh',
    email: 'saharshbolt@test.com',
    _id: '5fa4ed0f8da64e3dbd0ed37c',
    password: getHash('saharshbolt123') // sent request to me .. accepted
  },
  {
    name: 'Pram',
    email: 'prambolt@test.com',
    _id: '5fa4ed0f8da64e3dbd0ed381',
    password: getHash('pawanbolt123') // not sent request
  },
  {
    name: 'kinnu djdon',
    email: 'ayushbolt@test.com',
    _id: '5fa4ed0f8da64e3dbd0ed382',
    password: getHash('ayushbolt123') // sent request to me .. accepted
  },
  {
    name: 'Ishaan',
    email: 'ishaanbolt@gmail.com',
    _id: '5fa4ed0f8da64e3dbd0ed37d',
    password: getHash('ishaanbolt123') // sent request to me .. rejected
  },
  {
    name: 'kinnu bj',
    email: 'dangwalbolt@gmail.com',
    _id: '5fa4ed0f8da64e3dbd0ed37e',
    password: getHash('dangwalbolt123') // sent request to me .. rejected
  }
]

const dummyFromMe = [
  {
    name: 'Meethi',
    u_id: '5fa4ed0f8da64e3dbd0ed367',
    fo_id: '5f6b42673ffbaf4af3827907',
    status: 'Hey I am using talky',
    accepted: true // sent req by me..accepted
  },
  {
    name: 'Haddi',
    accepted: false,
    u_id: '5fa4ed0f8da64e3dbd0ed379',
    fo_id: '5f6b42673ffbaf4af3827907',
    status: 'Hey I am using talky'// sent request by me..rejected
  }, // below for pagination
  {
    name: 'kinnu don',
    status: 'Hey I am using talky',
    u_id: '5fa4ed0f8da64e3dbd0ed36d',
    fo_id: '5f6b42673ffbaf4af3827907',
    accepted: false// sent req by me..rejected
  },
  {
    name: 'kinnu Bhaskar',
    status: 'Hey I am using talky',
    u_id: '5fa4ed0f8da64e3dbd0ed36f',
    fo_id: '5f6b42673ffbaf4af3827907',
    accepted: true // sent req by me.. accepted
  }
]

const dummyToMe = [
  {
    name: 'Piyush',
    status: 'Hey I am using talky',
    fo_id: '5fa4ed0f8da64e3dbd0ed37c', // Saharsh
    u_id: '5f6b42673ffbaf4af3827907',
    accepted: true// sent request to me .. accepted
  },
  {
    name: 'Piyush',
    fo_id: '5fa4ed0f8da64e3dbd0ed37d', // Ishaan
    u_id: '5f6b42673ffbaf4af3827907',
    status: 'Hey I am using talky',
    accepted: false // sent request to me .. rejected
  }, // below for pagination test
  {
    name: 'Piyush',
    fo_id: '5fa4ed0f8da64e3dbd0ed382', // kinnu djdon
    u_id: '5f6b42673ffbaf4af3827907',
    status: 'Hey I am using talky',
    accepted: true // sent request to me .. accepted
  },
  {
    name: 'Piyush',
    fo_id: '5fa4ed0f8da64e3dbd0ed37e', // kinnu bj
    u_id: '5f6b42673ffbaf4af3827907',
    status: 'Hey I am using talky',
    accepted: false // sent request to me .. rejected
  }
]

module.exports = {
  dummyUsers,
  dummyToMe,
  dummyFromMe
}
