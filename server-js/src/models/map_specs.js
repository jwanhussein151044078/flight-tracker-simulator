'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class map_specs extends Model {
        static associate(models) {}
    }
    map_specs.init({
        zoom: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        center: {
          type: DataTypes.GEOMETRY('POINT',3857),
          allowNull: false,
        },
        style: {
          type: DataTypes.STRING,
          allowNull: false,
        }
    }, {
        sequelize,
        modelName : 'map_specs',
        tableName : 'map_specs',
        timestamps : false,
    });
    return map_specs;
};