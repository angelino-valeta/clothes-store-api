module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT,
    STRING,
    DATE,
    BOOLEAN
  } = DataTypes

  const Payment = sequelize.define('payments', {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: BIGINT,
      allowNull: false,
      validate: {
        isNumeric: true,
      }
    },
    status: {
      type: STRING,
      defaultValue: 'Sucesso'
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
    tableName: 'payments',

  })

  Payment.associate = (models) => {
    Payment.belongsTo(models.Order);

  };

  return Payment
}