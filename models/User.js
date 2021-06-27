const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  const {
    BIGINT, STRING, DATE
  } = DataTypes

  const User = sequelize.define('users',{
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
    password: {
      type: STRING,
      allowNull: false,
    },
    email: {
    type: STRING(50),
    allowNull: false,
    unique: true
    },
    phone: {
      type: STRING(50),
    },
    role: {
      type: STRING(20),
      defaultValue: 'user'
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
},{
    timestamps: false,
    tableName: 'users',
    
    hooks: {
      // Encriptando password antes de salvar o user
      beforeCreate: function(user, options){
        user.password = bcrypt.hashSync(user.password,10);
        console.log(user.password)
      }
    }
  })

  User.associate = function (models) {
    User.hasMany(models.Order)
    User.hasMany(models.Address)
    User.hasMany(models.Review)
  }

  User.addScope('excludePassword', {
    attributes:{
      exclude: ['password']
    }
  })

  User.beforeBulkUpdate(user => {
    user.attributes.updateTime = new Date();
    return user;
  })

  // Verificação da palavra passe
  User.prototype.comparePassword = async function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password)
  }

  // Geração de Token
  User.prototype.getJWToken = function () {
    return jwt.sign({userId: this.id},
        process.env.JWT_SECRET ,
        {expiresIn: process.env.JWT_EXPIRES_TIME});
  }

  return User
}