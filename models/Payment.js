module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT, STRING, DATE, BOOLEAN
  } = DataTypes

  const Payment = sequelize.define('payments',{
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: BIGINT,
      allowNull: false,
    },
    status: {
      type: BOOLEAN,
      defaultValue: 0,
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
  },{
    timestamps: false,
    tableName: 'payments',
    
  })

  Payment.associate = function (models) {
    Payment.belongsTo(models.Order, {onDelete: 'cascade'})
  }

  return Payment
}