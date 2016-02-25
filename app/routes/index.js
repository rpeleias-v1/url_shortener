var urlParser = require('url');
var os = require('os');
var http = require('http')

module.exports = function(app) {

	app.route('/')
	  .get(function(req, res) {
	  	res.json({status: 'URL Shortener API'});
	  });

	app.route('/new/:url(*)')	
	  .get(function(req, res) {
	  	var url = req.params.url;	  	
	  	if(validate(url)) {
	  		var fullHostname = removeHttpFromHost(url);	  		
	  		var hostname = fullHostname.split('/')[0];
	  		var path = '/' + fullHostname.split('/')[1];
	  		var options = {method: 'GET', host: hostname, port: 80, path: path};
		  	var call = http.request(options, function(response) {			  		
		  		res.json({
		  			original_url: addHttpOnHost(fullHostname),
		  			short_url: addHttpOnHost(req.headers.host)
		  		});
		  	})
		  	call.end();
		  	call.on('error', function(error) {
		  		res.json(error);
		  	})
	  	} else {	  		
	  		if (req.query.allow === 'true') {
	  			res.json({
	  				original_url: req.params.url,
	  				short_url: req.params.url
	  			});
	  		} else {
	  			res.json({error: 'URL invalid'});
	  		}	  		
	  	}	  	
	  });
}

function validate(url) {
	return /^((https?):\/\/)?([w|W]{3}\.)?[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[a-zA-Z0-9]*)?$/.test(url);
}

function removeHttpFromHost(url) {
	if(!isHttpPresent(url)) {
		return url;
	}
	return url.substring(7);
}

function isHttpPresent(url) {
	return /^https?:\/\//.test(url);
}

function addHttpOnHost(url) {
	return 'http://' + url;
}