const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser())

const pathAPI = '/api/v1/'

// importar todas rotas
const auth = require('./routes/auth')
const product = require('./routes/product')
const category = require('./routes/category')
const address = require('./routes/address')

// Configurando rotas 
app.use(pathAPI, auth)
app.use(pathAPI, product)
app.use(pathAPI, category)
app.use(pathAPI, address)

// Middleware para tratamento de erros
app.use(errorMiddleware)

module.exports = app
