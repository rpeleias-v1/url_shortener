var logger = require('./logger');

module.exports = {
	port: 3000,	
	db: 'mongodb://rpeleias:rpeleias@ds017678.mlab.com:17678/url_shortener_test',
	params: {
		logging: false,
		define: {
			underscored: true
		}
	}
}