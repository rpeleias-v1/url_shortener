var urlParser = require('url');
var os = require('os');
var http = require('http')

module.exports = function(app) {

	var UrlShortener = app.models.urlShortener;

	app.route('/')
	  .get(function(req, res) {
	  	res.json({status: 'URL Shortener API'});
	  });

	app.route('/new/:url(*)')	
	  .get(function(req, res) {
	  	var url = req.params.url;	  	
	  	if(validate(url)) {
	  		var fullUrl = removeHttpFromHost(url);	  		
	  		var hostname = fullUrl.split('/')[0];
	  		var path = '/' + fullUrl.split('/')[1];	  		
	  		var options = {method: 'GET', host: hostname, port: 80, path: path};
	  		fullUrl = addHttpOnHost(fullUrl);
	  		var hostname = addHttpOnHost(req.headers.host);
		  	var call = http.request(options, function(response) {
		  		findOrCreate(fullUrl, req, res);
		  	})
		  	call.end();
		  	call.on('error', function(error) {
		  		res.json(error);
		  	})
	  	} else {	  		
	  		if (req.query.allow === 'true') {
	  			findOrCreate(removeHttpFromHost(url), req, res);
	  		} else {
	  			res.json({error: 'URL invalid'});
	  		}	  		
	  	}	  	
	  });

	app.route('/:urlCode')
	  .get(function(req, res) {
	    res.redirect(addHttpOnHost(req.headers.host) + '/' + req.params.urlCode);
	  });

	  function findOrCreate(fullUrl, req, res) {
		UrlShortener.findOne({original_url: fullUrl}).exec()
		.then(function(urlShortener) {		  			
			if(!urlShortener) {
				var randomCode = makeRandomId();
				var newUrlShortener = {
					url_code: randomCode,
					original_url: fullUrl,
					short_url: addHttpOnHost(req.headers.host) + '/' + randomCode
				};		  				
				UrlShortener.create(newUrlShortener)
				.then(function(urlShortener) {
					res.json({
						original_url: urlShortener.original_url,
						short_url: urlShortener.short_url
					});
				})
			} else {
				res.json({
					original_url: urlShortener.original_url,
					short_url: urlShortener.short_url
				});
			}
		});
	}
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

function makeRandomId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}