'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnalyticsAccount extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AnalyticsAccount.init({
    perfAnalyticsId: DataTypes.STRING,
    accountName: DataTypes.STRING,
    allowedDomains: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AnalyticsAccount',
  });
  return AnalyticsAccount;
};