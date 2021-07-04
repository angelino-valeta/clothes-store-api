const express = require('express')
const router = express.Router()

const { 
  createOrder,
  getOrder,
  myOrders,
  getOrders,
  updateStatusOrder,
  deleteOrder
 } = require('../controllers/orderController')

const { isAuthenticatedUser, authorize } = require('../middlewares/auth')

router.post('/order/new', isAuthenticatedUser, createOrder)

router.get('/order/:id', isAuthenticatedUser, getOrder)

router.get('/orders/me', isAuthenticatedUser, myOrders)

// Admin
router.get('/admin/orders', isAuthenticatedUser, authorize('admin'), getOrders)

router.route('/admin/order/:id')
  .put(isAuthenticatedUser, authorize('admin'), authorize('admin'), updateStatusOrder)
  .delete(isAuthenticatedUser, authorize('admin'), authorize('admin'), deleteOrder)

module.exports = router