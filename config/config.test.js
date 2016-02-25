var logger = require('./logger');

module.exports = {
	port: 3000,
	db: 'mongodb://localhost/url_shortener_test',
	params: {
		logging: false,
		define: {
			underscored: true
		}
	}
}