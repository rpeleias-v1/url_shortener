describe('Routes: index', function() {

	var UrlShortener = app.models.urlShortener;
	var testUrlShortener;
	var randomCode;
	
	beforeEach(function(done) {
		randomCode = 'ABCDE';
		UrlShortener.collection.remove();
		var testUrlShortener = {
			url_code: randomCode,
			original_url: 'http://www.uol.com.br',
			short_url: 'http://testhost.myapp.com/' + randomCode
		};	
		UrlShortener.create(testUrlShortener);
		done()
	});
	describe("GET /", function() {
		it("returns the API status", function(done) {
			request.get('/')
			.expect(200)
			.end(function(err, res) {
				var expected = {status: 'URL Shortener API'};
				expect(res.body).to.eql(expected);
				done(err);
			});
		});
	});


	/*describe("GET /new/:url", function() {
		var validUrl = 'http://www.uol.com.br'

		it("returns the API status", function(done) {
			request.get('/new/' + validUrl)
			.expect(200)
			.end(function(err, res) {
				var expected = {status: 'URL Shortener API'};
				expect(res.body).to.eql(expected);
				done(err);
			});
		});
	});*/
});