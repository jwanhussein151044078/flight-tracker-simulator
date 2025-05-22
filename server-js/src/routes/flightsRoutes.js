const express = require('express');
const { 
    getAllFlights, 
    postFlight, 
    editFlightById, 
    deleteFlightById 
} = require('../controllers/flightsController');
const flightsRoute = express.Router();

flightsRoute.route('/')
    .post(postFlight)
    .get(getAllFlights);
flightsRoute.route('/:id')
    .put(editFlightById)
    .delete(deleteFlightById)

module.exports = flightsRoute;