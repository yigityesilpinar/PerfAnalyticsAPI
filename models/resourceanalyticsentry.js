'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ResourceAnalyticsEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  ResourceAnalyticsEntry.init({
    analyzeSessionUUID: DataTypes.STRING,
    analyzeStartTimestamp: DataTypes.DECIMAL,
    initiatorType: DataTypes.STRING,
    name: DataTypes.STRING,
    requestTime: DataTypes.DECIMAL,
    responseTime: DataTypes.DECIMAL,
    fetchTime: DataTypes.DECIMAL,
    redirectTime: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'ResourceAnalyticsEntry',
  });
  return ResourceAnalyticsEntry;
};