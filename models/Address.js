module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT, STRING, DATE
  } = DataTypes

  const Address = sequelize.define('addresses',{
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: BIGINT,
      allowNull: true,
    },
    fullName: {
      type: STRING,
      allowNull: false,
    },
    address: {
      type: STRING,
      allowNull: false,
    },
    city: {
      type: STRING(50),
      allowNull: false,
    },
    street: {
      type: STRING(50),
      allowNull: false,
    },
    country: {
      type: STRING(50),
      allowNull: false,
    },
    zipCode: {
      type: STRING(40),
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
  },{
    timestamps: true,
    tableName: 'addresses',
    
  })

  Address.associate = function (models) {
    Address.belongsTo(models.User, {onDelete: 'cascade'})
  }

  return Address
}