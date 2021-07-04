module.exports = function (sequelize, DataTypes) {
  const {
    DOUBLE,
    DATE,
    BIGINT,
    STRING,
    FLOAT
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
      validate: {
        isNumeric: true,
      }
    },
    addressId: {
      type: BIGINT,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },
    orderStatus: {
      type: STRING,
      defaultValue: 'Processando', // Enviando, Entregado
    },
    paidAt: {
      type: DATE
    },
    itemsPrice: {
      type: FLOAT,
      defaultValue: 0,
      validate: {
        isFloat: true
      }
    },
    shippingPrice: {
      type: FLOAT,
      defaultValue: 0,
    },
    taxPrice: {
      type: FLOAT,
      defaultValue: 0,
      validate: {
        isFloat: true
      }
    },
    totalPrice: {
      type: DOUBLE,
      defaultValue: 0,
      validate: {
        isNumeric: true
      }
    },
    deliverAt: {
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

  Order.beforeBulkUpdate(order => {
    order.attributes.updateTime = new Date();
    return order;
  })

  return Order
}