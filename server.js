const app = require('./app')
const dotenv = require('dotenv')
const {
  sequelize
} = require('./models')


process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`);
  console.log(`Desligando o servidor devido a um erro ocorrido.`);
  process.exit(1)
})

// Configurando variaveis de ambiente
dotenv.config({
  path: './config/config.env'
});


const PORT = process.env.PORT || 5000

// Conectando a base de dados e o ligando o servidor 
sequelize.sync({
    force: false
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`)
    })
  })