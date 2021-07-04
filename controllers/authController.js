const { User, Address } = require('../models')
const sendToken = require('../utils/jwtToken')
const ErrorHandler = require('../utils/errorHandler')
const bcrypt = require('bcryptjs')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors')

// Registrar User  => api/v1/auth/register
exports.register = catchAsyncErrors(async (req, res, next) => {
  
  const { name, email ,password, phone } = req.body

  const user = await User.create({ name, email, password, phone })
  
  sendToken(user, 200, res)

}) 

// Login User   => /api/v1/auth/login
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

// Get usuário lougado    => /api/v1/auth/me
exports.getMe = catchAsyncErrors(async (req, res, next) => {
  
  const user = await User.findByPk(req.user.id)
  
  res.status(200).json({
    success: true,
    data: user
  })
})

// Logout User   => /api/v1/auth/logout 
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  })

  res.status(200).json({
    success: true,
    message: 'logged out'
  })
})


// Update User Perfil  => /api/v1/auth/update
exports.updatePerfile = catchAsyncErrors(async (req, res, next) => {

  const data = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone
  }

  user = await User.update(data, {
    where: {
      id: req.user.id
    }
  })

  res.status(200).json({
    success: true,
    data: user
  })
})

// Update User password  => /api/v1/auth/password/update
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findByPk(req.user.id)

  if(!user){
    return next(new ErrorHandler('Usuário não encontrado', 404))
  }

  let newPassword = req.body.newPassword 

  const isPasswordMatched = await user.comparePassword(req.body.password)

  if(!isPasswordMatched){
    return next(new ErrorHandler('Password  actual incorrecta.', 401))
  }

  newPassword = bcrypt.hashSync(newPassword,10)
  

  user.password = newPassword

  await user.save()

  // user = await User.update(password, {
  //   where: {
  //     id: req.user.id
  //   }
  // })

  sendToken(user, 200, res)
})

// Delete User  => /api/v1/auth/deleteAccount/
exports.deleteAccount = catchAsyncErrors(async (req, res, next) => {

  const user = await User.findByPk(req.user.id)

  if(!user){
    return next(new ErrorHandler('Usuário não encontrado', 404))
  }

  await user.destroy()

  res.status(200).json({
    success: true,
    message: 'Usuário deletado'
  })
})



