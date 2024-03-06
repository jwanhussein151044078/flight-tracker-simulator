'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class trails extends Model {
    static associate(models) {
      
    }
  }
  trails.init({
    access_token: DataTypes.STRING,
    center: DataTypes.GEOMETRY,
    style: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'trails',
    tableName : 'trails',
    timestamps : false,
  });
  return trails;
};