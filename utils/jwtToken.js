// Criar, enviar e salvar token em  cookie
const sendToken = (user, statusCode, res) => {

  //Criar token
  const token = user.getJWToken()

  // Options para cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIMES * 24 * 60 * 1000
    ),
    httpOnly: true
  }
  
  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
    user
  })

}

module.exports = sendToken
