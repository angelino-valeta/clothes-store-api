const {
  OrderItem,
  Product
} = require('../models')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Criar Order Items  => /api/v1/orderItems/new
exports.createOrderItem = catchAsyncErrors(async (req, res, next) => {

  const data = req.body

  const orderItems = OrderItem.create(data)

  res.status(201).json({
    success: true,
    data: orderItems
  })

})

// Get orderItems  => /api/v1/orderItems
exports.getOrderItem = catchAsyncErrors(async (req, res) => {

  const {
    id
  } = req.params

  const orderItems = await OrderItem.findAll({
    where: {
      orderId: id
    },
    include: {
      model: Product,
      attributes: [
        'id',
        'name',
        'price',
        'image'
      ]
    }
  })

  res.status(200).json({
    success: true,
    data: orderItems
  })
})

exports.deleteOrderItem = catchAsyncErrors(async (req, res, next) => {
  const {
    id
  } = req.params

  const orderItem = await OrderItem.findByPk(id)

  if (!orderItem) {
    return next(new ErrorHandler('Não existe items para deletar', 404))
  }

  await orderItem.destroy()

  res.status(200).json({
    success: true,
    message: 'Item da encomenda deletado'
  })

})