var logger = require('./logger');

module.exports = {
	port: 3000,
	params: {
		logging: function(sql) {
			logger.info(new Date() + ' ' + sql);
		},
		define: {
			underscored: true
		}
	}
}