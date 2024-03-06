'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flights extends Model {
    static associate(models) {
      this.belongsTo(models.routes,{foreignKey:'route_id',as:'route'});
    }
  }
  flights.init({
    coordinates: {
      type: DataTypes.GEOMETRY('POINT',4326),
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
    }
  }, {
    sequelize,
    modelName: 'flights',
    tableName : 'flights',
    timestamps : false,
  });
  return flights;
};