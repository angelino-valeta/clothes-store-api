module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT, INTEGER, STRING, DATE
  } = DataTypes

  const Review = sequelize.define('reviews',{
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: BIGINT,
      allowNull: true,
    },
    userId: {
      type: BIGINT,
      allowNull: true,
    },
    comment: {
      type: STRING,
      allowNull: false
    },
    rating: {
      type: INTEGER,
      allowNull: false,
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
    }
  },{
    timestamps: false,
    tableName: 'reviews',
  })

  // Relacionamento de tabelas
  Review.associate = (models) => {
    Review.belongsTo(models.User)
    Review.belongsTo(models.Product, {onDelete: 'cascade'})
  }

  return Review
}