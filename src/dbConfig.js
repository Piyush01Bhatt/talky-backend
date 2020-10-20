const mongoose = require('mongoose')

const setDbConfig = () => {
  mongoose.connect(process.env.DB_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
}

const db = mongoose.connection

module.exports = {
  setDbConfig,
  db
}
