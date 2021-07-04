const {
  Wishlist,
  Product
} = require('../models')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Criar Wishlist  => /api/v1/wishlist/new
exports.createWishlist = catchAsyncErrors(async (req, res, next) => {
  const userId = req.user.id
  const productId = req.body.productId

  const wishlistItem = await Wishlist.findOne({
    where: {
      userId,
      productId
    }
  })

  if (wishlistItem) {
    return next(new ErrorHandler('Este produto já existe na lista de desejos ', 400))
  }

  const wishlist = await Wishlist.create({
    userId,
    productId
  })
  res.status(201).json({
    success: true,
    data: wishlist
  })
})

// Get wishlist    => /api/v1/wishlist
exports.getWishlist = catchAsyncErrors(async (req, res, next) => {

  const userId = req.user.id

  const wishlist = await Wishlist.findAll({
    where: {
      userId
    },
    include: {
      model: Product,
      attributes: [
        'id',
        'name',
        'image',
        'price',
        'ratings',
        'numOfReviews'
      ]
    }
  })

  if (!wishlist) {
    return next(new ErrorHandler('Lista de desejos não encontrada', 404))
  }

  res.status(200).json({
    success: true,
    data: wishlist
  })
})

// Get item da wishlist    => /api/v1/wishlist/item
exports.getWishlistItem = catchAsyncErrors(async (req, res, next) => {

  const userId = req.user.id
  const {
    productId
  } = req.params

  const wishlistItem = await Wishlist.findOne({
    where: {
      userId,
      productId
    },
    include: {
      model: Product,
      attributes: [
        'id',
        'name',
        'image',
        'price',
        'ratings',
        'numOfReviews'
      ]
    }
  })

  if (!wishlistItem) {
    return next(new ErrorHandler('Item da lista de desejos não encontrado', 404))
  }

  res.status(200).json({
    success: true,
    data: wishlistItem
  })
})

// remover item da wishlist    => /api/v1/wishlist/item/:productId
exports.removeWishlistItem = catchAsyncErrors(async (req, res, next) => {

  const userId = req.user.id
  const {
    productId
  } = req.params

  const wishlistItem = await Wishlist.findOne({
    where: {
      userId,
      productId
    }
  })

  if (!wishlistItem) {
    return next(new ErrorHandler('Item da lista de desejos não encontrado', 404))
  }

  await wishlistItem.destroy()

  res.status(200).json({
    success: true,
    message: 'Item da lista de desejos deletado'
  })
})

// delete item da wishlist by product   => /api/v1/wishlist/:productId
exports.deleteWishItemByProduct = catchAsyncErrors(async (req, res, next) => {

  const userId = req.user.id
  const {
    productId
  } = req.params

  const wishlistItem = await Wishlist.findOne({
    where: {
      productId
    }
  })

  if (!wishlistItem) {
    return next(new ErrorHandler('Item da lista de desejos não encontrado', 404))
  }

  if (userId) {
    await Wishlist.destroy({
      where: {
        productId
      }
    })
  }

  res.status(200).json({
    success: true,
    message: 'Item da lista de desejos deletado'
  })
})