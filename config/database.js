var mongoose = require('mongoose');

module.exports = function(uri) {
	mongoose.connect(uri);

	mongoose.connection.on('connected', function() {
		console.log('Mongoose! Connected on ' + uri);
	});

	mongoose.connection.on('disconnected', function() {
		console.log('Mongoose! Disconnected on ' + uri);
	});

	mongoose.connection.on('error', function() {
		console.log('Mongoose! Connection error on ' + uri);
	});

	process.on('SIGINIT', function() {
		mongoose.connection.close(function() {
			console.log('Mongoose! Disconnected by application shutdown');
			process.exit(0);
		})
	})
}