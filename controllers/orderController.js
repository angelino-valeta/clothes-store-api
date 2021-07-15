const {
  Order,
  User,
  Product
} = require('../models')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Criar Order  => /api/v1/order/new
exports.createOrder = catchAsyncErrors(async (req, res, next) => {

  const {
    addressId,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  } = req.body

  // if (!orderItems) {
  //   return next(new ErrorHandler('Carrinho vazio', 400))
  // }

  const order = Order.create({
    //orderItems,
    addressId,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paidAt: Date.now(),
    addressId,
    userId: req.user.id
  })

  res.status(201).json({
    success: true,
  })

})

// Get order  => /api/v1/order/:id
exports.getOrder = catchAsyncErrors(async (req, res, next) => {

  const {
    id
  } = req.params

  const order = await Order.findByPk(id, {
    include: {
      model: User,
      attributes: [
        'name',
        'email'
      ]
    }
  })

  if (!order) {
    return next(new ErrorHandler('Encomenda não encontrada', 404))
  }

  res.status(200).json({
    success: true,
    data: order
  })

})

// Get orders do user  => /api/v1/order/me
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

  const userId = req.user.id

  const order = await Order.findOne({
    where: {
      userId
    }
  })

  res.status(200).json({
    success: true,
    data: order
  })

})

// Get orders   => /api/v1/admin/orders
exports.getOrders = catchAsyncErrors(async (req, res, next) => {

  const orders = await Order.findAll()

  let totalAmount = 0

  orders.forEach(order => {
    totalAmount += orders.totalPrice
  })

  res.status(200).json({
    success: true,
    count: orders.length,
    totalAmount,
    data: orders
  })

})

// Update status order   => /api/v1/admin/order/:id
exports.updateStatusOrder = catchAsyncErrors(async (req, res, next) => {

  const {
    id
  } = req.params

  const orderStatus = req.body.orderStatus

  const order = await Order.findByPk(id)

  if (!order) {
    return next(new ErrorHandler('Encomenda não encontrada', 404))
  }

  if (order.orderItems === 'Entregado') {
    return next(new ErrorHandler('Esta encomenda já foi entregue.', 400))
  }

  order.orderItems.forEach(async item => {
    await updateStock(item.productId, item.quantity)
  })

  order.orderStatus = orderStatus
  order.deliverAt = Date.now()

  await order.save()

  res.status(200).json({
    success: true
  })

})

async function updateStock(id, quantity) {

  const product = await Product.findByPk(id)

  product.stock = product.stock - quantity
}

// Delete order  => /api/v1/admin/order/:id
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

  const {
    id
  } = req.params

  const order = await Order.findByPk(id)

  if (!order) {
    return next(new ErrorHandler('Encomenda não encontrada', 404))
  }

  await order.destroy()

  res.status(200).json({
    success: true,
    message: 'Encomenda deletada'
  })

})