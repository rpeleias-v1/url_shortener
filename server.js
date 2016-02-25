var http = require('http');
var app = require('./config/express')();

if(process.env.NODE_ENV !== 'test') {
	http.createServer(app).listen(app.get('port'), function() {
		console.log(app.get('port'));
		console.log('Express Server running on port ' + app.get('port'));
	});
}
module.exports = app;