const bcrypt = require('bcryptjs');

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

  return User
}