var fs = require('fs');
var winston = require('winston');

if (!fs.existsSync('logs')) {
	fs.mkdirSync("logs");
};