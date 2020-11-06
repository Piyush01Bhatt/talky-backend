function getHash(val) {
  const hash = crypto
    .createHash('md5')
    .update(val)
    .digest('hex')
  return hash
}

const dummyUsers = [
  {
    name: 'Meethi',
    __id: '5fa4ed0f8da64e3dbd0ed367',
    email: 'meethibolt@test.com',
    password: getHash('meethibolt123') // sent req by me..accepted
  },
  {
    name: 'Pawan',
    email: 'pawanbolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed369',
    password: getHash('pawanbolt123') // not sent request
  },
  {
    name: 'Anil',
    email: 'anilbolt@gmail.com',
    __id: '5fa4ed0f8da64e3dbd0ed36b',
    password: getHash('anilbolt123') // not sent request
  },
  {
    name: 'kinnu don',
    email: 'kinnubolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed36d',
    password: getHash('kinnubolt123') // sent req by me..rejected
  },
  {
    name: 'kinnu Bhaskar',
    email: 'maadabolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed36f',
    password: getHash('maadabolt123') // sent req by me.. accepted
  },
  {
    name: 'kinnu Billa',
    email: 'billabolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed371',
    password: getHash('billabolt123') // not sent request
  },
  {
    name: 'kinnu dj',
    email: 'tedbolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed373',
    password: getHash('tedbolt123') // not sent request
  },
  {
    name: 'kinnu comp',
    email: 'bhaadubolt@gmail.com',
    __id: '5fa4ed0f8da64e3dbd0ed375',
    password: getHash('bhaadubolt123') // not sent request
  },
  {
    name: 'kinnu',
    email: 'jiggubolt@gmail.com',
    __id: '5fa4ed0f8da64e3dbd0ed377',
    password: getHash('jiggubolt123') // not sent request
  },
  {
    name: 'Haddi',
    email: 'haddibolt@gmail.com',
    __id: '5fa4ed0f8da64e3dbd0ed379',
    password: getHash('haddibolt123') // sent request by me..rejected
  }, // TO ME
  {
    name: 'Saharsh',
    email: 'saharshbolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed37c',
    password: getHash('saharshbolt123') // sent request to me .. accepted
  },
  {
    name: 'Pram',
    email: 'prambolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed381',
    password: getHash('pawanbolt123') // not sent request
  },
  {
    name: 'kinnu djdon',
    email: 'ayushbolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed382',
    password: getHash('ayushbolt123') // sent request to me .. accepted
  },
  {
    name: 'Ishaan',
    email: 'ishaanbolt@gmail.com',
    __id: '5fa4ed0f8da64e3dbd0ed37d',
    password: getHash('ishaanbolt123') // sent request to me .. rejected
  },
  {
    name: 'kinnu bj',
    email: 'dangwalbolt@gmail.com',
    __id: '5fa4ed0f8da64e3dbd0ed37e',
    password: getHash('dangwalbolt123') // sent request to me .. rejected
  }
]

const dummyFromMe = [
  {
    name: 'Meethi',
    __id: '5fa4ed0f8da64e3dbd0ed367',
    email: 'meethibolt@test.com',
    password: getHash('meethibolt123') // sent req by me..accepted
  },
  {
    name: 'Haddi',
    email: 'haddibolt@gmail.com',
    __id: '5fa4ed0f8da64e3dbd0ed379',
    password: getHash('haddibolt123') // sent request by me..rejected
  }, // below for pagination
  {
    name: 'kinnu don',
    email: 'kinnubolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed36d',
    password: getHash('kinnubolt123') // sent req by me..rejected
  },
  {
    name: 'kinnu Bhaskar',
    email: 'maadabolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed36f',
    password: getHash('maadabolt123') // sent req by me.. accepted
  },
]

const dummyToMe = [
  {
    name: 'Saharsh',
    email: 'saharshbolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed37c',
    password: getHash('saharshbolt123') // sent request to me .. accepted
  },
  {
    name: 'Ishaan',
    email: 'ishaanbolt@gmail.com',
    __id: '5fa4ed0f8da64e3dbd0ed37d',
    password: getHash('ishaanbolt123') // sent request to me .. rejected
  }, // below for pagination test
  {
    name: 'kinnu djdon',
    email: 'ayushbolt@test.com',
    __id: '5fa4ed0f8da64e3dbd0ed382',
    password: getHash('ayushbolt123') // sent request to me .. accepted
  },
  {
    name: 'kinnu bj',
    email: 'dangwalbolt@gmail.com',
    __id: '5fa4ed0f8da64e3dbd0ed37e',
    password: getHash('dangwalbolt123') // sent request to me .. rejected
  }
]

module.exports = {
  dummyUsers,
  dummyToMe,
  dummyFromMe
}
