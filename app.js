const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser())


// importar todas rotas
const auth = require('./routes/auth')

// Configurando as rotas 
app.use('/api/v1/', auth)

// Middleware para tratamento de erros
app.use(errorMiddleware)

module.exports = app
