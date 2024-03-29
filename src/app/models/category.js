// Requirements of model Category //
const mongoose = require('../database')

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category
