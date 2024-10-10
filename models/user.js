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
      User.hasOne(models.UserProfile, {
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Transaction, {
        onDelete: 'CASCADE',
      });
      User.hasMany(models.Portofolio, {
          onDelete: 'CASCADE',
      });
    }
  }
  User.init({
    email: {
      type:DataTypes.STRING,
      unique:{
        args:true,
        msg:`User with that email already exist`
      },
      validate:{
        notEmpty:{
          args:true,
          msg:`Please fill the Email`
        },
        isEmail:{
          args:true,
          msg:`Please fill Email with Email`
        }
      }

    },
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        notEmpty:{
          args:true,
          msg:`Please fill the Password`
        },
        len:{
          args:[8,255],
          msg:`Minimal Password length is 8`
        }
      },
    },
    role:{
      type: DataTypes.STRING,
      allowNull: false,
    },
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