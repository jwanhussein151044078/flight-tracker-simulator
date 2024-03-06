'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      coordinates: {
        type: DataTypes.GEOMETRY('POINT',4326),
        allowNull: false,
      },
      route_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'routes',
            key: 'id'
        }
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
    },{schema:'flight_tracker'});
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('flights',{schema:'flight_tracker'});
  }
};