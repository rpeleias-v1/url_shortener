module.exports = function(app) {
	if(Boolean(process.env.NODE_ENV)) {
		return require('./config.' + process.env.NODE_ENV + '.js');
	}
	return require('./config.development.js');
}