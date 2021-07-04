const express = require('express')
const router = express.Router()

const {
  createOrderItem,
  getOrderItem,
  deleteOrderItem
} = require('../controllers/orderItemsController')

const {
  isAuthenticatedUser
} = require('../middlewares/auth')

router.post('/new', isAuthenticatedUser, createOrderItem)

router.route('/:id')
  .get(isAuthenticatedUser, getOrderItem)
  .delete(isAuthenticatedUser, deleteOrderItem)

module.exports = router