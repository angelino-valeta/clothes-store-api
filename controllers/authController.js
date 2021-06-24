const { User } = require('../models')

const catchAsyncErrors = require('../middlewares/catchAsyncErrors')


// Registrar usuário  => api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  
  const { name, email ,password } = req.body

  const user = await User.create({ name, email, password })

  res.status(200).json({
    sucess: true,
    user
  })

}) 