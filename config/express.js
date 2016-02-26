var express = require('express');
var load = require('express-load');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var methodOverride = require('method-override');
var morgan = require('morgan');
var logger = require('./logger');
var config = require('./config')();

module.exports = function() {
	var app = express();
	app.set('port', config.port);
	app.set('json spaces', 4);
	app.use(morgan("common", {
		stream: {
			write: function(message) {
				logger.info(message);
			}
		}
	}));

	app.use(express.static("./public"));
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	app.disable('x-powered-by');
	app.use(helmet.xframe());
	app.use(helmet.xssFilter());
	app.use(helmet.nosniff());

	load('models', {cwd: 'app'})
	  .then('routes')
	  .into(app);
	  
	return app;
}