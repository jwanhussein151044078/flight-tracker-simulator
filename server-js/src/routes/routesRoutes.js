const express = require('express');
const { getRoutesList } = require('../controllers/routesController');
const routes = express.Router();

routes.route('/').get(getRoutesList);

module.exports = routes;