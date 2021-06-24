module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT,INTEGER, STRING, DATE, TEXT, FLOAT
  } = DataTypes

  const Product = sequelize.define('products',{
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
      type: FLOAT,
      allowNull: false,
    },
    stock: {
      type: INTEGER,
      allowNull: false,
    },
    image: STRING,
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
    timestamps: false,
    tableName: 'products',
  })

  // Relacionamento de tabelas
  Product.associate = (models) => {
    Product.belongsTo(models.Category)
  }

  return Product
}