module.exports = function(app) {

	app.route('/')
	  .get(function(req, res) {
	  	res.json({status: 'URL Shortener API'});
	  });
}