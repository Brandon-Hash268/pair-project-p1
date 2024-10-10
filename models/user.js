'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.UserProfile);
      User.hasMany(models.Transaction);
      User.hasMany(models.Portfolio);
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(e =>{
    const salt = bcrypt.genSaltSync(10)
    const hashed = bcrypt.hashSync(e.password, salt)
    e.password = hashed
  })
  return User;
};