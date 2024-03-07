'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trails extends Model {
    static associate(models) {
      this.belongsTo(models.flights,{foreignKey:'flight_id',as:'flight'});
    }
  }
  trails.init({
    trail: {
      type: DataTypes.GEOGRAPHY('LINESTRING',4326),
    },
    flight_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'trails',
    tableName : 'trails',
    timestamps : false,
  });
  return trails;
};