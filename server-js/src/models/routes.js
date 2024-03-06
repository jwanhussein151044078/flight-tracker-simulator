'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class routes extends Model {
    static associate(models) {
      this.hasMany(models.flights,{foreignKey:'route_id',as :'flights'});
    }
  }
  routes.init({
    route: {
      type: DataTypes.GEOMETRY('LINESTRING',4326),
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'routes',
    tableName : 'routes',
    timestamps : false,
  });
  return routes;
};