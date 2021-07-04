const { User, Address } = require('../models')
const bcrypt = require('bcryptjs')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


// Get Users   => /api/v1/admin/users
exports.getUsers = catchAsyncErrors(async (req, res) => {

  const users = await User.findAll({
    attributes: {
      exclude: [
        'password',
      ]
    },
    include: {
      model: Address,
      attributes: [
        'address',
        'city',
        'street',
        'country',
        'zipCode'
      ]
    }
  })

  res.status(200).json({
    success: true,
    count: users.length,
    data: users
  })
})

// Get Users  => /api/v1/admin/user/:id
exports.getUser = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params

  const user = await User.findByPk(id,{
    attributes: {
      exclude: ['password']
    },
    include: {
      model: Address,
      attributes: [
        'address',
        'city',
        'street',
        'country',
        'zipCode'
      ]
    }
  })

  if(!user){
    return next(new ErrorHandler('Usuário não encontrado', 404))
  }

  res.status(200).json({
    success: true,
    data: user
  })
})

// Create User  => /api/v1/admin/users
exports.createUser = catchAsyncErrors(async (req, res) => {

  const data = req.body

  const user = await User.create(data)

  res.status(201).json({
    success: true,
    data: user
  })
})

// Update User  => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res,next) => {

  const { id } = req.params
  const data = req.body

  if(data.password){
    data.password = bcrypt.hashSync(data.password,10)
  }
  
  let user = await User.findByPk(id)

  if(!user){
    return next(new ErrorHandler('Usuário não encontrado', 404))
  }

  user = await User.update(data, {
    where: {
      id
    }
  })

  res.status(200).json({
    success: true,
    data: user
  })
})

// Delete User  => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {

  const { id } = req.params
 
  const user = await User.findByPk(id)

  if(!user){
    return next(new ErrorHandler('Usuário não encontrado', 404))
  }

  await user.destroy()

  res.status(200).json({
    success: true,
    message: 'Usuário deletado'
  })
})

