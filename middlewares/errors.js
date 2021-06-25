const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500
  let error = { ...err }

  error.message = err.message

  res.status(err.statusCode).json({
    success: false,
    error: err,
    message: error.message || 'Erro no servidor',
    stack: err.stack
  })

}