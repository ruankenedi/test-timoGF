// Requirements of model Product //
const mongoose = require('../database')

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String,
    require: true
  },
  value: {
    type: String,
    require: true
  },
  category: {
    type: [mongoose.Schema.Types.ObjectId], // code no reliable //
    require: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const Product = mongoose.model('Product', ProductSchema)

module.exports = Product
