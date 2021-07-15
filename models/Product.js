const {
  DOUBLE,
  FLOAT
} = require("sequelize")

module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT,
    INTEGER,
    STRING,
    DATE,
    TEXT,
    DOUBLE,
    BOOLEAN
  } = DataTypes

  const Product = sequelize.define('products', {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    categoryId: {
      type: BIGINT,
      allowNull: true,
    },
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Digite o nome do produto'
        },
      }
    },
    image: {
      type: STRING,
      allowNull: false
    },
    description: {
      type: TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Digite uma descrição do produto'
        },
      }
    },
    price: {
      type: DOUBLE,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isNumeric: {
          msg: 'Digite um número'
        },
      }
    },
    stock: {
      type: INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isInt: {
          msg: 'Digite um número inteiro'
        },
      }
    },
    isFeatured: {
      type: BOOLEAN,
      defaultValue: 0,
    },
    featuredIn: {
      type: BOOLEAN,
      defaultValue: 0,
    },
    ratings: {
      type: FLOAT,
      defaultValue: 0,
      validate: {
        isFloat: {
          msg: 'Digite um número'
        },
      }
    },
    numOfReviews: {
      type: INTEGER,
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
  }, {
    tableName: 'products',
  })

  // Relacionamento de tabelas
  Product.associate = (models) => {
    Product.belongsTo(models.Category, {
      onDelete: 'cascade'
    })
  }

  return Product
}