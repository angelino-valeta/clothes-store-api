const { User } = require('../models')
const jwt = require('jsonwebtoken')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncErrors = require('./catchAsyncErrors')

// Verificando se o usuário está autenticado 
exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]
  }
  

  if(!token){
    return next(new ErrorHandler('Acesso negado, deverás fazer login primeiro.', 401))
  }

  try {
     
    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    req.user = await User.findByPk(decoded.id)

    next()
  } catch (err) {
    return next(new ErrorHandler('Acesso negado, deverás fazer login primeiro.', 401))
  }
  
})

// configurado privilégio do usuário
exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `Acesso negado, não tens privilégio para acessar este recurso.`,
          403
        )
      )
    }
    next()
  }
};