'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Stock.hasMany(models.Transaction);
      Stock.hasMany(models.Portofolio);
    }
    get formattedName(){
      return `${this.companyName} (${this.code})`
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
  return Stock;
};

// action button,pindah img,container,navbar(navbar template)