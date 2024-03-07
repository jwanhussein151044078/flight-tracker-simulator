const express = require('express');
const { getAllFlights } = require('../controllers/flightsController');
const flightsRoute = express.Router();

flightsRoute.route('/').get(getAllFlights);

module.exports = flightsRoute;