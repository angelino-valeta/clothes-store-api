module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT, STRING, DATE
  } = DataTypes

  const ProductImage = sequelize.define('product_images',{
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
    imageName: {
      type: STRING,
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
    tableName: 'product_images',
  })

  // Relacionamento de tabelas
  ProductImage.associate = (models) => {
    ProductImage.belongsTo(models.Product, {onDelete: 'cascade'});
  }

  return ProductImage
}