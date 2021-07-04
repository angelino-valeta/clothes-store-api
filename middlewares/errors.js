const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  let error = {
    ...err
  }

  error.message = err.message

  // Tratando erros do SequelizeValidationError

  if (err.name === 'SequelizeValidationError') {
    const message = Object.values(err.errors).map(value => value.message)
    error = new ErrorHandler(message, 400)
  }

  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: error.message || 'Erro no servidor',
    stack: err.stack
  })

}