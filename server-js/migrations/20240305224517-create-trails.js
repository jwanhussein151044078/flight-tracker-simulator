'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('trails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      trail: {
        type: DataTypes.GEOMETRY('LINESTRING',4326),
      },
      flight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'flights',
            key: 'id'
        }
      },
    },{schema:'flight_tracker'});
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('trails',{schema:'flight_tracker'});
  }
};