'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkDelete({schema:'flight_tracker',tableName:'trails'}, null,{});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete({schema:'flight_tracker',tableName:'trails'}, null,{});
  }
};
