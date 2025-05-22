require('dotenv').config();
let config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
  schema : 'flight_tracker',
  migrationStorageTableName: "sequelize_migrations",
  seederStorageTableName: "sequelize_seeds",
  logging : false
};

module.exports = {
  development: config,
  test: config,
  production: config
}