module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT, DATE
  } = DataTypes

  const Wishlist = sequelize.define('wishesList',{
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
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
    tableName: 'wishesList',
  })

  // Relacionamento de tabelas
  Wishlist.associate = (models) => {
    Wishlist.belongsTo(models.User,{onDelete: 'cascade'} )
    Wishlist.belongsTo(models.Product, {onDelete: 'cascade'})
  }

  return Wishlist
}