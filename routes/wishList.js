const express = require('express')
const router = express.Router()

const {
  createWishlist,
  getWishlist,
  getWishlistItem,
  removeWishlistItem,
  deleteWishItemByProduct,

} = require('../controllers/wishListController')

const {
  isAuthenticatedUser
} = require('../middlewares/auth')

router.post('/new', isAuthenticatedUser, createWishlist)
router.get('/', isAuthenticatedUser, getWishlist)
router.get('/item/:productId', isAuthenticatedUser, getWishlistItem)
router.delete('/item/:productId', isAuthenticatedUser, removeWishlistItem)
router.delete('/:productId', isAuthenticatedUser, deleteWishItemByProduct)


module.exports = router