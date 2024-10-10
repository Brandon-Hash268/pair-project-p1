'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      // Define associations
      Stock.hasMany(models.Transaction, {
        onDelete: 'CASCADE',
        hooks: true // Ensure hooks are enabled for cascading
      });
      Stock.hasMany(models.Portofolio, {
        onDelete: 'CASCADE',
        hooks: true // Ensure hooks are enabled for cascading
      });
    }

    get formattedName() {
      return `${this.companyName} (${this.code})`;
    }
  }

  Stock.init({
    companyName: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imgUrl: DataTypes.STRING,
    code: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Stock',
  });

  // Remove the beforeDestroy hook as it's redundant with CASCADE
  return Stock;
};
