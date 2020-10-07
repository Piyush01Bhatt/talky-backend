function getRandomInt (max) {
  return Math.floor(Math.random() * Math.floor(max))
}

function genOtp () {
  const nums = []
  for (let i = 0; i < 6; i++) {
    nums.push(getRandomInt(10))
  }
  return nums.join('')
}

module.exports = genOtp
