const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')


app.use(express.json());
app.use(cookieParser())


// importar todas rotas
const auth = require('./routes/auth')

// Configurando as rotas 
app.use('/api/v1/', auth)




module.exports = app
