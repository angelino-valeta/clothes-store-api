const express = require('express')
const router = express.Router()

const {
  createReview,
  getProductReviews,
  getUserReviews,
  updateReview,
  deleteReview,

} = require('../controllers/reviewController')

const {
  isAuthenticatedUser
} = require('../middlewares/auth')

router.post('/review/new', isAuthenticatedUser, createReview)
router.get('/reviews/:productId', getProductReviews)
router.get('/review/:userId', getUserReviews)
router.route('/review/:id')
  .put(isAuthenticatedUser, updateReview)
  .delete(isAuthenticatedUser, deleteReview)


module.exports = router