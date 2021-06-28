const { User, Address } = require('../models')
const sendToken = require('../utils/jwtToken')
const ErrorHandler = require('../utils/errorHandler')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Registrar User  => api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  
  const { name, email ,password, phone } = req.body

  const user = await User.create({ name, email, password, phone })
  
  sendToken(user, 200, res)

}) 

// Login User   => /api/v1/login
exports.login = catchAsyncErrors(async (req, res, next) => {

  const { email ,password } = req.body

  // Verificar se existe password e email
  if(!email || !password){
    return next(new ErrorHandler('Por favor digite a password e o email ', 400))
  }

  // Procurar user na database
  const user = await User.findOne({ where: { email }})

  if(!user){
    return next(new ErrorHandler('Usuário não encontrado', 401))
  }

  const isPasswordMatched = await user.comparePassword(password)

  if(!isPasswordMatched){
    return next(new ErrorHandler('Password incorrecta.', 401))
  }
  sendToken(user, 200, res)
})

// Logout User   => /api/v1/logout 
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', null,{
    expires: new Date(Date.now()),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: 'logged out'
  })
})


// Admin

// Get Users   => /api/v1/admin/users
exports.getUsers = catchAsyncErrors(async (req, res) => {

  const users = await User.findAll({
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

  res.status(200).json({
    success: true,
    count: users.length,
    users
  })
})

// Get Users  => /api/v1/admin/user/:id
exports.getUser = catchAsyncErrors(async (req, res) => {

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
    user
  })
})

// Update User  => /api/v1/admin/user/:id
exports.updateUser = catchAsyncErrors(async (req, res) => {

  const { id } = req.params
  const data = req.body

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
    user
  })
})

// Delete User  => /api/v1/admin/user/:id
exports.deleteUser = catchAsyncErrors(async (req, res) => {

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

