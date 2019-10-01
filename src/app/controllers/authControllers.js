const express = require('express')
const Category = require('../models/category')
const Product = require('../models/product')
const router = express.Router()
const mongoose = require('mongoose')

//////////////////////// BEGIN CATEGORY ////////////////////////
router.post('/category', async (req, res) => { // create category //
  const { name } = req.body

  try {
    if (await Category.findOne({ name })) {
      console.log('Category already exists!')
      return res.send({ error: 'Category already exists!' })
    }

    const categoryInstance = await Category.create({
      name
    })

    return res.send({
      success: true,
      data: categoryInstance
    })

  } catch (error) {
    console.log('Register Failed!')
    return res.send({ error: 'Register Failed!' })

  }
})

router.get('/categories', async (req, res) => { // Search categories //
  Category.find({}, (err, category) => {
    if (err) {
      return res.send({ error: 'Search failed!' })
    }

    res.send(category)
  })
})

router.put('/editCategory/:id', async (req, res) => { // Edit category //
  const { name } = req.body

  try {
    const categoryInstance = await Category.findByIdAndUpdate(req.params.id, { $set: req.body })
    console.log('UPDATED!')

    return res.send({
      success: true,
      data: categoryInstance
    })
  } catch (error) {
    console.log('Updated Failed!')
    return res.send({ error: 'Updated Failed!' })
  }
})

router.delete('/deleteCategory/:id', async (req, res) => { // Delete category //
  const { name } = req.body

  try {
    const categoryInstance = await Category.findByIdAndDelete(req.params.id, { $set: req.body })
    console.log('DELETE!')

    return res.send({
      success: true,
      data: categoryInstance
    })
  } catch (error) {
    console.log('Updated Failed!')
    return res.send({ error: 'Updated Failed!' })
  }
})
//////////////////////// END CATEGORY ////////////////////////

//////////////////////// BEGIN PRODUCT ////////////////////////
router.post('/product', async (req, res) => { // Create product //
  const { name, description, value, category } = req.body;

  let _categories = []

  try {
    _categories = await Category.find({
      '_id': {
        $in: [
          ...category.map(categoryId => mongoose.Types.ObjectId(categoryId))
        ]
      }
    });
  } catch (_) {
    res.send({ error: 'Categories not found!' })

    return
  }

///////************************POPULATE */
  try {
    if (_categories.length === category.length) {
      const productInstance = await Product.create({
        name,
        description,
        value,
        category
      })

      res.status(200).send({
        success: true,
        data: productInstance
      });
    }
  } catch (err) {
    console.log({ err });
    res.send({ erro: 'Error ao create categories!' })
  }
})

router.get('/products', async (req, res) => { // Search products //
  Product.find({}, (err, product) => {
    if (err) {
      return res.send({ error: 'Search failed!' })
    }

    res.send(product)
  })
})

router.put('/editProduct/:id', async (req, res) => { // Edit product //
  const { name, description, value, category } = req.body

  try {
    const productInstance = await Product.findByIdAndUpdate(req.params.id, { $set: req.body })
    console.log(producInstance);

    console.log('UPDATED!')

    return res.send({
      success: true,
      data: productInstance
    })
  } catch (error) {
    console.log('Updated Failed!')
    return res.send({ error: 'Updated Failed!' })
  }
})

// router.delete('/deleteProduct/:id', async (req, res) => { // Delete product //
//   const { name, description, value, category } = req.body

//   try {
//     const productInstance = await Product.findByIdAndDelete(req.params.id, { $set: req.body })
//     console.log('DELETE!')

//     return res.send({
//       success: true,
//       data: productInstance
//     })
//   } catch (error) {
//     console.log('Updated Failed!')
//     return res.send({ error: 'Updated Failed!' })
//   }
// })

//////////////////////// END PRODUCT ////////////////////////


module.exports = app => app.use('/auth', router);
