const { Address } = require('../models')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Criar Address  => /api/v1/address/new
exports.createAddress = catchAsyncErrors(async (req, res, next) => {
  
  const data = {
    userId: req.user.id,
    fullName: req.body.fullName || req.user.name,
    address: req.body.address,
    city: req.body.city,
    street: req.body.street,
    country: req.body.country,
    zipCode: req.body.zipCode
  }

  const address = await Address.create(data)
  
  res.status(201).json({
    success: true,
    data: address
  })
})

// Buscar todos addresses do user  => /api/v1/addresses
exports.getAddresses = catchAsyncErrors(async (req, res) => {

  const userId = req.user.id

  const addresses = await Address.findAll({ where: { userId } })

  res.status(200).json({
    success: true,
    count: addresses.length,
    data: addresses
  })
})

// Buscar Address default do user   => /api/v1/address/my
exports.getAddressDefault = catchAsyncErrors(async (req, res, next) => {

  const userId = req.user.id

  const address = await Address.findOne({ where: { userId } })

  if(!address){
    return next(new ErrorHandler('Endereço não encontrado', 404))
  }

  res.status(200).json({
    success: true,
    data: address
  })
})

// Atualizar address   => /api/v1/address/:id
exports.updateAddress= catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params
  const data = req.body

  let address = await Address.findByPk(id)

  if(!address){
    return next(new ErrorHandler('Endereço não encontrado', 404))
  }
 
  address = await Address.update(data,{
    where: {
      id
    }
  })

  res.status(200).json({
    success: true,
    data: address
  })
})

// Delete address   => /api/v1/address/:id
exports.deleteAddress = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params

  const address = await Address.findByPk(id)

  if(!address){
    return next(new ErrorHandler('Endereço não encontrado', 404))
  }

  await address.destroy()

  res.status(200).json({
    success: true,
    message: 'Endereço deletado'
  })
})
