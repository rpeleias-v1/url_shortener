var logger = require('./logger');

module.exports = {
	port: 3000,
	db: 'mongodb://localhost/url_shortener',
	params: {
		logging: function(sql) {
			logger.info(new Date() + ' ' + sql);
		},
		define: {
			underscored: true
		}
	}
}