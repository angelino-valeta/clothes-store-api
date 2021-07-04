const bcrypt = require('bcryptjs')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const validator = require('validator')

module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT,
    STRING,
    DATE
  } = DataTypes

  const User = sequelize.define('users', {
    id: {
      type: BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Digite o seu nome'
        },
        len: {
          args: 6,
          msg: "O seu nome deve ter 6 ou mais letras"
        },

      }
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        len: {
          args: 6,
          msg: "A sua palavra passe deve ter pelo menos 6 characteres"
        },
      }
    },
    email: {
      type: STRING(50),
      allowNull: false,
      unique: {
        msg: 'Este email já existe, digite outro'
      },
      validate: {
        isEmail: {
          msg: 'Digite um email válido'
        }
      }
    },
    phone: {
      type: STRING(50),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Digite o seu número de telefone'
        }
      }
    },
    role: {
      type: STRING(20),
      defaultValue: 'user',
      validate: {
        isAlpha: {
          msg: 'Digite um valor válido'
        }
      }
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
    resetPasswordToken: STRING,
    resetPasswordExpire: DATE
  }, {
    timestamps: false,
    tableName: 'users',

    hooks: {
      // Encriptando password antes de salvar o user
      beforeCreate: function (user, options) {
        user.password = bcrypt.hashSync(user.password, 10);

      }
    }
  })

  User.associate = function (models) {
    User.hasMany(models.Address)
    User.hasMany(models.Review)
  }

  User.addScope('excludePassword', {
    attributes: {
      exclude: ['password']
    }
  })

  User.beforeBulkUpdate(user => {
    user.attributes.updateTime = new Date();
    return user;
  })

  // Verificação da palavra passe
  User.prototype.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
  }

  // Geração de Token
  User.prototype.getJWToken = function () {
    return jwt.sign({
        id: this.id
      },
      process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME
      }
    )
  }
  return User
}