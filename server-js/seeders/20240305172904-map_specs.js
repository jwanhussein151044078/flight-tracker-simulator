'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({schema:'flight_tracker',tableName:'map_specs'}, null,{});
    return queryInterface.bulkInsert({schema:'flight_tracker',tableName:'map_specs'}, [{
      id : 1,
      center: 'point (28.9784 41.0082)',
      style: 'mapbox://styles/mapbox/standard',
      zoom: 8.5,
    }],{schema:'flight_tracker'});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete({schema:'flight_tracker',tableName:'map_specs'}, null,{});
  }
};
