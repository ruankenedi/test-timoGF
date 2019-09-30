const express = require('express')
const Category = require('../models/category')
const Product = require('../models/product')
const router = express.Router()
const mongoose = require('mongoose')

//////////////////////// BEGIN CATEGORY ////////////////////////
router.post('/category', async (req, res) => {
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

router.get('/categories', async (req, res) => {
  Category.find({}, (err, category) => {
    if (err) {
      return res.send({ error: 'Search failed!' })
    }

    res.send(category)
  })
})

router.put('/editCategory/:id', async (req, res) => {
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

router.delete('/deleteCategory/:id', async (req, res) => {
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
router.post('/product', async (req, res) => {
  const { name, description, value, category } = req.body;

  let categories = []

  try {
    categories = await Category.find({
      '_id': {
        $in: [
          ...category.map(subjectId => mongoose.Types.ObjectId(subjectId))
        ]
      }
    });
  } catch (_) {
    res.status(400).send({ error: 'Disciplinas não encontradas' })

    return
  }

  try {
    if (categories.length === category.length) {
      const courseInstance = await Course.create({
        name,
        description,
        value,
        categories
      })

      res.status(200).send({
        success: true,
        data: courseInstance
      });
    }
  } catch (err) {
    console.log({ err });
    res.status(400).send({ erro: 'Erro ao criar curso' })
  }
  // const { name, description, value, category } = req.body
  // console.log(category)

  // let _categories = []

  // try {
  //   _categories = await Category.find({
  //     '_id': {
  //       $in: [
  //         category
  //       ]
  //     }
  //   });
  // } catch (_) {
  //   res.send({ error: 'Categories not found!' })

  //   return
  // }

  // try {
  //   if (_categories.length === category.length) {
  //     const productInstance = await Product.create({
  //       name,
  //       description,
  //       value,
  //       category
  //     })
  //     console.log('PRODUCT CREATED!')

  //     res.status(200).send({
  //       success: true,
  //       data: productInstance
  //     });
  //   }
  // } catch (err) {
  //   console.log({ err });
  //   res.send({ erro: 'Error ao create product' })
  // }

  // try {
  //   if (await Product.findOne({ name })) {
  //     console.log('Product already exists!')
  //     return res.send({ error: 'Product already exists!' })
  //   }

  //   const productInstance = await Product.create({
  //     name,
  //     description,
  //     value
  //   })
  //   console.log('PRODUCT CREATED!')

  //   return res.send({
  //     success: true,
  //     data: productInstance
  //   })

  // } catch (error) {
  //   console.log('Register Failed!')
  //   return res.send({ error: 'Register Failed!' })

  // }
})
//////////////////////// END PRODUCT ////////////////////////


module.exports = app => app.use('/auth', router);
