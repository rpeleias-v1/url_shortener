var urlParser = require('url');
var os = require('os');
var http = require('http')

module.exports = function(app) {

	var UrlShortener = app.models.urlShortener;
	var UrlUtils = app.utils.urlUtils;
	var urlUtils = new UrlUtils();

	app.route('/')
	  .get(function(req, res) {
	  	res.json({status: 'URL Shortener API'});
	  });

	app.route('/new/:url(*)')	
	  .get(function(req, res) {
	  	var url = req.params.url;	  	  	
	  	if(urlUtils.validate(url)) {		
	  		var fullUrl = urlUtils.removeHttpFromHost(url);	  			  		
	  		var options = {method: 'GET', host: urlUtils.getHostpath(fullUrl), port: 80, path: urlUtils.getRelativePath(fullUrl)};
	  		fullUrl = urlUtils.addHttpOnHost(fullUrl);	  		
		  	var call = http.request(options, function(response) {
		  		findOrCreate(fullUrl, req, res);
		  	});
		  	call.end();
		  	call.on('error', function(error) {
		  		res.json(error);
		  	});
	  	} else {	  		
	  		if (req.query.allow === 'true') {
	  			findOrCreate(urlUtils.removeHttpFromHost(url), req, res);
	  		} else {
	  			res.json({error: 'URL invalid'});
	  		}	  		
	  	}	  	
	  });

	app.route('/:urlCode')
		.get(function(req, res) {			
			UrlShortener.findOne({
				url_code: req.params.urlCode
			})
			.then(function(urlShortener) {
				if (urlShortener) {					
					res.redirect(urlShortener.original_url);
				}
				else {
					res.json({error: 'URL not found'});
				}
			})
			.catch(function(error) {
				res.status(412).json({msg: message});
			})
		})

	  function findOrCreate(fullUrl, req, res) {	  	
		UrlShortener.findOne({original_url: fullUrl}).exec()
		.then(function(urlShortener) {				  			
			if(!urlShortener) {
				console.log('test');
				var randomCode = urlUtils.makeRandomId();
				console.log(randomCode);
				var newUrlShortener = {
					url_code: randomCode,
					original_url: fullUrl,
					short_url: urlUtils.addHttpOnHost(req.headers.host) + '/' + randomCode
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