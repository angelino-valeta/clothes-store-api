module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT, STRING, DATE
  } = DataTypes

  const Category = sequelize.define('categories',{
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      allowNull: false
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
    timestamps: false,
    tableName: 'categories',
  })

  return Category
}