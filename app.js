const express = require('express')
const cors = require('cors')
const app = express()
const cookieParser = require('cookie-parser')

const errorMiddleware = require('./middlewares/errors')

app.use(express.json());
app.use(cookieParser())
app.use(cors())

// importar todas rotas
const auth = require('./routes/auth')
const users = require('./routes/users')
const products = require('./routes/product')
const categories = require('./routes/category')
const addresses = require('./routes/address')
const order = require('./routes/order')
const reviews = require('./routes/reviews')
const wishlist = require('./routes/wishList')
const orderItem = require('./routes/orderItems')

// URL BASE API  
const API = '/api/v1/'

app.use(API + 'auth', auth)
app.use(API, users)
app.use(API, products)
app.use(API, categories)
app.use(API, addresses)
app.use(API, order)
app.use(API, reviews)
app.use(API + 'wishlist', wishlist)
app.use(API + 'orderItem', orderItem)

// Middleware para tratamento de erros
app.use(errorMiddleware)

module.exports = app