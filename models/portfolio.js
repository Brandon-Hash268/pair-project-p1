'use strict';
const {
  Model
} = require('sequelize');
const { logger } = require('sequelize/lib/utils/logger');
module.exports = (sequelize, DataTypes) => {
  class Portofolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portofolio.belongsTo(models.User,{
        onDelete: 'CASCADE',
      });
      Portofolio.belongsTo(models.Stock,{
        onDelete: 'CASCADE',
      });

    }
    static totalMoney(price,totalStock){
      return +price * +totalStock

    }
    static async Total(id){
      try {
        let porto = await Portofolio.findAll({
          where:{UserId:id}
        })
  
        let value = 0
        porto.forEach(e => {
          value += e.totalValue
          // console.log(value);
          
        });
        return value
      } catch (error) {
        console.log(error);
        
        
      }
    }
  }
  Portofolio.init({
    UserId: DataTypes.INTEGER,
    StockId: DataTypes.INTEGER,
    totalValue: DataTypes.INTEGER,
    totalStock: {
      type:DataTypes.INTEGER,
      validate:{
        min:{
          args:[0],
          msg:`You dont own Any stock`
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Portofolio',
  });
  Portofolio.beforeCreate((e, options) => {
    return sequelize.models.Stock.findByPk(e.StockId)
      .then(stock => {
        if (stock) {
          e.totalValue = Number(e.totalStock) * Number(stock.price);
        }
      })
      .catch(error => {
        throw new Error("Error fetching stock details: " + error.message);
      });
  });
  return Portofolio;
};