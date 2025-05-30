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
        type: DataTypes.GEOGRAPHY('LINESTRING',4326),
      },
      flight_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: 'flights',
            key: 'id'
        },
        onDelete: 'CASCADE'
      },
    },{schema:'flight_tracker'});
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('trails',{schema:'flight_tracker'});
  }
};