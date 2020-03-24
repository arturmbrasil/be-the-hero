const express = require('express');

const NGOController = require('./controllers/NGOController')

const routes = express.Router();

routes.get('/ongs', NGOController.index);
routes.post('/ongs', NGOController.create);

module.exports = routes;