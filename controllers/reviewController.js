const {
  Review,
  Product,
  User
} = require('../models')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Post - criar Review  => /api/v1/review/new
exports.createReview = catchAsyncErrors(async (req, res, next) => {

  const data = {
    comment: req.body.comment,
    rating: parseInt(req.body.rating),
    userId: req.user.id,
    productId: req.body.productId
  }

  const review = await Review.create(data)

  res.status(201).json({
    success: true,
    data: review
  })
})

// Get Reviews  => /api/v1/reviews/:productId
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {

  const {
    productId
  } = req.params
  console.log(productId)
  const review = await Review.findAll({
    where: {
      productId
    },
    include: [{
      model: User,
      attributes: [
        'name'
      ]
    }, {
      model: Product,
      attributes: [
        'ratings',
        'numOfReviews'
      ]
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  })

  res.status(200).json({
    success: true,
    data: review
  })
})

// Get User review  => /api/v1/review/:userId
exports.getUserReviews = catchAsyncErrors(async (req, res, next) => {

  const {
    userId
  } = req.params

  const review = await Review.findAll({
    where: {
      userId
    },
    include: [{
      model: Product,
      attributes: [
        'name',
        'ratings',
        'image',
        'numOfReviews'
      ]
    }],
    order: [
      ['createdAt', 'DESC']
    ]
  })

  res.status(200).json({
    success: true,
    data: review
  })
})

// Update Review  => /api/v1/review/:id
exports.updateReview = catchAsyncErrors(async (req, res, next) => {

  const {
    id
  } = req.params

  const data = {
    comment: req.body.comment,
    rating: parseInt(req.body.rating),
    userId: req.user.id,
    productId: req.body.productId
  }

  const review = await Review.update(data, {
    where: {
      id
    }
  })

  res.status(200).json({
    success: true,
    data: review
  })
})

// Delete Review  => /api/v1/review/:id
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {

  const {
    id
  } = req.params

  const review = await Review.findByPk(id)

  if (!review) {
    return next(new ErrorHandler('Review não encontrado', 404))
  }

  await review.destroy()

  res.status(200).json({
    success: true,
    message: 'Review deletado'
  })
})