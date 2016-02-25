var http = require('http');
var app = require('./config/express')();
var config = require('./config/config')();
var mongoose;

if(process.env.NODE_ENV !== 'test') {
	mongoose = require('./config/database')(config.db);
	http.createServer(app).listen(app.get('port'), function() {
		console.log(app.get('port'));
		console.log('Express Server running on port ' + app.get('port'));
	});
}
module.exports = app;