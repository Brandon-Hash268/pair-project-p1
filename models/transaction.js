'use strict';
const {
  Model
} = require('sequelize');
const moment = require("moment")
module.exports = (sequelize, DataTypes) => {
  class Transaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transaction.belongsTo(models.User,{
        onDelete: 'CASCADE',
      });
      Transaction.belongsTo(models.Stock,{
        onDelete: 'CASCADE',
      });

    }
    get date(){
      return moment(this.transactionDate).format('YYYY-MM-DD')
    }
  }
  Transaction.init({
    UserId: DataTypes.INTEGER,
    StockId: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    type: DataTypes.STRING,
    transactionDate: DataTypes.DATE,
    totalStock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transaction',
  });
  return Transaction;
};

// req.session.user.id => untuk ambil akun 
