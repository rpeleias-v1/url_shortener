var logger = require('./logger');

module.exports = {
	port: process.env.PORT,
	db: 'mongodb://rpeleias:rpeleias@ds017688.mlab.com:17688/url_shortener_production',
	params: {
		logging: false,
		define: {
			underscored: true
		}
	}
}