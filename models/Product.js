const { DOUBLE, FLOAT } = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT,INTEGER, STRING, DATE, TEXT, DOUBLE
  } = DataTypes

  const Product = sequelize.define('products',{
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
      type: BIGINT,
      allowNull: false,
    },
    name: {
      type: STRING,
      allowNull: false
    },
    description: {
      type: TEXT,
      allowNull: false
    },
    price: {
      type: DOUBLE,
      allowNull: false,
      defaultValue: 0
    },
    stock: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    ratings:{
      type: FLOAT,
      defaultValue: 0
    },
    numOfReviews:{
      type: INTEGER,
      defaultValue: 0
    },
    createdAt: {
    type: DATE,
    allowNull: false,
    defaultValue: new Date(),
    },
    updatedAt: {
      type: DATE,
      allowNull: false,
      defaultValue: new Date(),
    }
  },{
    tableName: 'products',
  })

  // Relacionamento de tabelas
  Product.associate = (models) => {
    Product.belongsTo(models.Category)
  }

  return Product
}