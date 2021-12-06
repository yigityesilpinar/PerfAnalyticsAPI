'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AnalyticsEntry extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  AnalyticsEntry.init({
    analyzeSessionUUID: DataTypes.STRING,
    analyzeStartAt: DataTypes.DATE,
    ttfb: DataTypes.DECIMAL,
    fcp: DataTypes.DECIMAL,
    requestTime: DataTypes.DECIMAL,
    responseTime: DataTypes.DECIMAL,
    dnsLookUp: DataTypes.DECIMAL,
    connectionTime: DataTypes.DECIMAL,
    tlsTime: DataTypes.DECIMAL,
    domContentLoad: DataTypes.DECIMAL,
    redirectTime: DataTypes.DECIMAL,
    redirectCount: DataTypes.DECIMAL,
    unloadTime: DataTypes.DECIMAL,
    domInteractive: DataTypes.DECIMAL,
    domComplete: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'AnalyticsEntry',
  });
  return AnalyticsEntry;
};