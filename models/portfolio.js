'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Portofolio extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Portofolio.belongsTo(models.User);
      Portofolio.belongsTo(models.Stock);

    }
  }
  Portofolio.init({
    UserId: DataTypes.INTEGER,
    StockId: DataTypes.INTEGER,
    totalValue: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Portofolio',
  });
  return Portofolio;
};