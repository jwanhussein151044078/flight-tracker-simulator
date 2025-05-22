'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkDelete({schema:'flight_tracker',tableName:'trails'}, null,{});
    await queryInterface.bulkDelete({schema:'flight_tracker',tableName:'flights'}, null,{});
    return queryInterface.bulkInsert({schema:'flight_tracker',tableName:'flights'}, [
      {
      //  id:1,
        coordinates:'point (28.45577862214253 40.765037549402024)',
        route_id:1,
        name:'FLIGHT 1',
        aircraft_model:'BOEING 737 MAX 7',
        aircraft_type:'Passenger Airliner',
        capacity:555,
        pilot:'Alexander Martinez',
        destination: 'Atatürk Airport, Istanbul',
        speed : 550.5
      },
      {
      //  id:2,
        coordinates:'point (28.45047811179981 40.69339200125887)',
        route_id:2,
        name: 'FLIGHT 2',
        aircraft_model:'AIRBUS A318',
        aircraft_type:'Passenger Airliner',
        capacity:552,
        pilot:'Mia Garcia',
        destination: 'Atatürk Airport, Istanbul',
        speed : 650.7
      },
      {
      //  id:3,
        coordinates:'point (28.994175293845046 40.68167322447897)',
        route_id:3,
        name:'FLIGHT 3',
        aircraft_model:'AIRBUS A319',
        aircraft_type:'Passenger Airliner',
        capacity:123,
        pilot:'Benjamin Anderson',
        destination: 'Sabiha Gökçen Airport, Istanbul',
        speed : 520.1
      },
      {
      //  id:4,
        coordinates:'point (29.29358462557917 40.893832010162726)',
        route_id:4,
        name:'FLIGHT 4',
        aircraft_model:'AIRBUS A330-200F',
        aircraft_type:'Passenger Airliner',
        capacity:321,
        pilot:'Ava Thompson',
        destination: 'Barcelona–El Prat Airport, Barcelona',
        speed : 750.5
      },
      {
      //  id:5,
        coordinates:'point (28.81125692489522 40.96658218536993)',
        route_id:5,
        name:'FLIGHT 5',
        aircraft_model:'AIRBUS A350-1000',
        aircraft_type:'Passenger Airliner',
        capacity:333,
        pilot: 'Ethan Wilson',
        destination: 'Charles de Gaulle Airport, Paris',
        speed : 750.5
      },
      {
      //  id:6,
        coordinates:'point (28.756538300258512 41.26371668232167)',
        route_id:6,
        name:'FLIGHT 6',
        aircraft_model:'BOEING 747-8I',
        aircraft_type:'Cargo Airliner',
        capacity:333,
        pilot: 'Sophia Rodriguez',
        destination: 'Amsterdam Airport Schiphol, Amsterdam',
        speed : 650.5
      },
      {
      //  id:7,
        coordinates:'point (28.72738656709771 41.26262985791013)',
        route_id:7,
        name:'FLIGHT 7',
        aircraft_model:'AIRBUS A319',
        aircraft_type:'Cargo Airliner',
        capacity:522,
        pilot: 'William Davis',
        destination: 'Amsterdam Airport Schiphol, Amsterdam',
        speed : 650.5
      },
      {
      //  id:8,
        coordinates:'point (28.60140462392161 41.499454341429725)',
        route_id:8,
        name:'FLIGHT 8',
        aircraft_model:'BOEING 777-300ER',
        aircraft_type:'Cargo Airliner',
        capacity:456,
        pilot: 'Olivia Brown',
        destination: 'Istanbul Airport, Istanbul',
        speed : 659.4
      },
      {
      //  id:9,
        coordinates:'point (28.436545719233038 41.17165790247546)',
        route_id:9,
        name:'FLIGHT 9',
        aircraft_model: 'AIRBUS A319',
        aircraft_type:'Cargo Airliner',
        capacity:131,
        pilot: 'Daniel Martinez',
        destination: 'Istanbul Airport, Istanbul',
        speed : 659.4
      },
      {
      //  id:10,
        coordinates:'point (28.9317569539092 40.98288316213103)',
        route_id:10,
        name:'FLIGHT 10',
        aircraft_model: 'AIRBUS A319',
        aircraft_type:'Passenger Airliner',
        capacity:444,
        pilot: 'Emily Johnson',
        destination: 'Sabiha Gökçen Airport, Istanbul',
        speed : 689.1
      }
    ],{schema:'flight_tracker'});
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete({schema:'flight_tracker',tableName:'flights'}, null,{});
  }
};
