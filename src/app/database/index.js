const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/timo', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})
mongoose.Promise = global.Promise

module.exports = mongoose
