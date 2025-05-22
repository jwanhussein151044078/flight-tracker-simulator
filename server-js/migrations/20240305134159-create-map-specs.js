'use strict';
const { Sequelize } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('map_specs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      zoom:{
        type: DataTypes.DOUBLE,
        allowNull: false,
      },
      center: {
        type: DataTypes.GEOMETRY('POINT',4326),
        allowNull: false,
      },
      style: {
        type: DataTypes.STRING,
        allowNull: false,
      }
    },{schema:'flight_tracker'});
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('map_specs',{schema:'flight_tracker'});
  }
};