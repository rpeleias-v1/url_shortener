var supertest = require('supertest');
var chai = require('chai');
var app = require('../server.js');
var config = require('../config/config')();
var mongoose = require('../config/database')(config.db);

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;