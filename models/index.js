const Sequelize = require('sequelize')

// Pegando informações da base de dados
const user = process.env.DB_USER || 'root'
const password = process.env.DB_PASSWORD || 'root'
const host = process.env.DB_HOST || 'localhost'
const database = process.env.DB_DATABSE || 'yourDatabase'
const dialect = process.env.DB_DIALECT || 'mysql'

console.log(user,password)

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect
})

const db = {};

// Medels
db.User = require('./User')(sequelize, Sequelize.DataTypes)
db.Product = require('./Product')(sequelize, Sequelize.DataTypes)
db.Category = require('./Category')(sequelize, Sequelize.DataTypes)
db.ProductImage = require('./ProductImage')(sequelize, Sequelize.DataTypes)
db.Review = require('./Review')(sequelize, Sequelize.DataTypes)
db.Address = require('./Address')(sequelize, Sequelize.DataTypes)
db.Wishlist = require('./WishList')(sequelize, Sequelize.DataTypes)
db.Order = require('./Order')(sequelize, Sequelize.DataTypes)
db.OrderItem = require('./OrderItem')(sequelize, Sequelize.DataTypes)
db.Payment = require('./Payment')(sequelize, Sequelize.DataTypes)


Object.keys(db).forEach((modelName) => {
  if('associate' in db[modelName]){
    db[modelName].associate(db)
  }
})

db.Sequelize = Sequelize
db.sequelize = sequelize

module.exports = db
