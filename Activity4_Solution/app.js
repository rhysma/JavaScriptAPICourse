var express = require('express');
var app = express();
var db = require('./db');

var ColorsController = require('./colors/ColorsController');
app.use('/colors', ColorsController);

module.exports = app;