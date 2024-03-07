'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flights extends Model {
    static associate(models) {
      this.belongsTo(models.routes,{foreignKey:'route_id',as:'route'});
      this.hasMany(models.trails,{foreignKey:'flight_id',as :'trail'});
    }
  }
  flights.init({
    coordinates: {
      type: DataTypes.GEOGRAPHY('POINT',4326),
      allowNull: false,
    },
    route_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name:{
      type: DataTypes.STRING,
    },
    aircraft_model:{
      type: DataTypes.STRING,
    },
    aircraft_type:{
      type: DataTypes.STRING,
    },
    capacity:{
      type: DataTypes.INTEGER,
    },
    pilot:{
      type: DataTypes.STRING,
    },
    destination:{
      type: DataTypes.STRING,
    },
    speed:{
      type: DataTypes.DOUBLE,
    },
    bearings:{
      type: DataTypes.DOUBLE,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'flights',
    tableName : 'flights',
    timestamps : false,
  });
  return flights;
};