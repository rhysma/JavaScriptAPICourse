var express = require('express');
var app = express();
var db = require('./db');

var MemberController = require('./member/MemberController');
app.use('/members', MemberController);

var AuthController = require('./auth/AuthController');
app.use('/auth', AuthController);

module.exports = app;