const fs = require('fs')
const {
  Product,
  Category
} = require('../models')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Criar Product  => /api/v1/admin/product/new
exports.createProduct = catchAsyncErrors(async (req, res, next) => {

  const {
    name,
    description,
    categoryId,
    price,
    stock,
    isFeatured,
    featuredIn,
    ratings,
    numOfReviews,
  } = req.body

  const product = await Product.create({
    name,
    description,
    categoryId,
    price,
    stock,
    isFeatured,
    featuredIn,
    ratings,
    numOfReviews,
    image: req.file.path
  })

  res.status(201).json({
    success: true,
    product
  })
})

// Buscar todos products   => /api/v1/products
exports.getProducts = catchAsyncErrors(async (req, res) => {

  const products = await Product.findAll({
    include: {
      model: Category,
      attributes: [
        'name'
      ]
    }
  })

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  })
})

// Get Novidades products    => /api/v1/products/news
exports.getNewsProduct = catchAsyncErrors(async (req, res) => {

  const limit = req.query.limit || 4

  const products = await Product.findAll({
    limit: parseInt(limit),
    order: [
      ['createdAt', 'DESC']
    ],
    attributes: [
      'id',
      'name',
      'image',
      'price',
      'stock',
      'ratings',
      'categoryId'
    ]
  })

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  })
})

// Get Recomendation products    => /api/v1/products/recomendation/:categoryId
exports.getRecommendation = catchAsyncErrors(async (req, res) => {

  const limit = req.query.limit || 4

  const products = await Product.findAll({
    limit: parseInt(limit),
    where: {
      categoryId: req.params.categoryId
    },
    order: [
      ['createdAt', 'DESC']
    ],
    attributes: [
      'id',
      'name',
      'image',
      'price',
      'ratings',
      'categoryId'
    ]
  })

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  })
})


// Buscar products em Destaques   => /api/v1/products/isFeatured
exports.getProductsIsFeatured = catchAsyncErrors(async (req, res) => {

  const limit = req.query.limit || 4

  const products = await Product.findAll({
    limit: parseInt(limit),
    where: {
      isFeatured: 1
    },
    attributes: [
      'id',
      'name',
      'image',
      'price'
    ]
  })

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  })
})

// Buscar products Destacado em   => /api/v1/products/featuredIn
exports.getProductsFeaturedIn = catchAsyncErrors(async (req, res) => {

  const limit = req.query.limit || 4

  const products = await Product.findAll({
    limit: parseInt(limit),
    where: {
      featuredIn: 1
    },
    attributes: [
      'id',
      'name',
      'image',
      'price'
    ]
  })

  res.status(200).json({
    success: true,
    count: products.length,
    data: products
  })
})

// Buscar um product   => /api/v1/product/:id
exports.getProduct = catchAsyncErrors(async (req, res, next) => {

  const {
    id
  } = req.params

  const product = await Product.findByPk(id, {
    include: {
      model: Category,
      attributes: [
        'name'
      ]
    }
  })

  if (!product) {
    return next(new ErrorHandler('Produto não encontrado', 404))
  }

  res.status(200).json({
    success: true,
    data: product
  })
})

// Atualizar product   => /api/v1/admin/product/:id
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  const {
    id
  } = req.params
  const data = req.body

  let product = await Product.findByPk(id)

  if (!product) {
    return next(new ErrorHandler('Produto não encontrado', 404))
  }

  product = await Product.update(data, {
    where: {
      id
    }
  })

  res.status(200).json({
    success: true,
    data: product
  })
})

// Delete product   => /api/v1/admin/products/:id
exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  const {
    id
  } = req.params

  const product = await Product.findByPk(id)


  console.log(product)

  if (!product) {
    return next(new ErrorHandler('Produto não encontrado', 404))
  }

  const imagePath = product.image

  await product.destroy()

  fs.unlink(imagePath, err => {
    console.log(err);
  })

  res.status(200).json({
    success: true,
    message: 'Produto deletado'
  })
})