const express = require('express');
const { getMapSpecsById } = require('../controllers/mapSpecsController');
const mapSpecs = express.Router();

mapSpecs.route('/:id').get(getMapSpecsById);

module.exports = mapSpecs;