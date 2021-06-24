module.exports = function (sequelize, DataTypes) {
  const {
    DOUBLE, DATE, BIGINT, STRING, FLOAT
  } = DataTypes

  const Order = sequelize.define('orders', {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: BIGINT,
      allowNull: false,
    },
    addressId: {
      type: BIGINT,
      allowNull: false,
    },
    orderStatus: {
      type: STRING,
      defaultValue: 'Processando', // Enviando, Entragado
    },
    paidAt: {
      type: DATE
    },
    itemsPrice:{
      type: FLOAT,
      defaultValue: 0,
    },
    shippingPrice:{
      type: FLOAT,
      defaultValue: 0,
    },
    totalPrice: {
      type: DOUBLE,
      defaultValue: 0,
    },
    deliverAt:{
      type: DATE
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
    },
  }, {

    timestamps: false,
    tableName: 'orders',
  })
  // Relacionamento de tabelas
  Order.associate = (models) => {
    Order.hasMany(models.OrderItem)
    Order.belongsTo(models.User)
    Order.belongsTo(models.Address)
  }

  return Order
}