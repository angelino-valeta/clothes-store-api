module.exports = function (sequelize, DataTypes) {

  const {
    DOUBLE, DATE, BIGINT, STRING, INTEGER
  } = DataTypes

  const OrderItem = sequelize.define('orderItems', {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      allowNull: false,
    },
    orderId: {
      type: BIGINT,
      allowNull: false,
    },
    productId: {
      type: BIGINT,
      allowNull: false,
    },
    image: {
      type: STRING,
      allowNull: false,
    },
    price: {
      type: DOUBLE,
      allowNull: false,
    },
    quantity: {
      type: INTEGER,
      allowNull: false,
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
    tableName: 'orderItems',
  })
  
  // Relacionamento de tabelas
  OrderItem.associate = function (models) {
    OrderItem.belongsTo(models.Order)
    OrderItem.belongsTo(models.Product)
  }

  OrderItem.beforeBulkUpdate(orderItem => {
    orderItem.attributes.updateTime = new Date();
    return orderItem;
  })

  return OrderItem
}