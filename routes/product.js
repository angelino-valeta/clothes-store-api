const express = require('express')
const router = express.Router()
const fileUpload = require('../middlewares/file-upload')

const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getNewsProduct,
  getRecommendation,
  getProductsIsFeatured,
  getProductsFeaturedIn
} = require('../controllers/productController')

const {
  isAuthenticatedUser,
  authorize
} = require('../middlewares/auth')

router.get('/products', getProducts)
router.get('/products/isFeatured', getProductsIsFeatured)
router.get('/products/news', getNewsProduct)
router.get('/products/featuredIn', getProductsFeaturedIn)
router.get('/products/recomendation/:categoryId', getRecommendation, )
router.get('/product/:id', getProduct)

// Admin routers
router.route('/admin/product/new').post(fileUpload.single('image'), isAuthenticatedUser, authorize('admin'), createProduct)
router.route('/admin/product/:id')
  .put(fileUpload.single('image'), isAuthenticatedUser, authorize('admin'), updateProduct)
  .delete(isAuthenticatedUser, authorize('admin'), deleteProduct)

module.exports = router