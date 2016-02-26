describe('Routes: index', function() {

	var UrlShortener = app.models.urlShortener;
	var testUrlShortener;
	var invalidUrlShortener;
	var randomCode;
	var randomCodeInvalid;
	
	beforeEach(function(done) {
		randomCode = 'ABCDE';
		UrlShortener.collection.remove();
		var testUrlShortener = {
			url_code: randomCode,
			original_url: 'http://www.uol.com.br',
			short_url: 'http://testhost.myapp.com/' + randomCode
		};	
		UrlShortener.create(testUrlShortener);
		randomCodeInvalid = '12345';
		var invalidUrlShortener = {
			url_code: randomCodeInvalid,
			original_url: 'invalid_url',
			short_url: 'http://testhost.myapp.com/' + randomCodeInvalid
		};	
		UrlShortener.create(invalidUrlShortener);
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


	describe("GET /new/:url", function() {

		it("returns a valid original URL and short_url with http prefix", function(done) {
			request.get('/new/http://www.uol.com.br')
			.expect(200)
			.end(function(err, res) {
				var expected = {original_url: 'http://www.uol.com.br', short_url: 'http://testhost.myapp.com/ABCDE'};
				expect(res.body).to.eql(expected);
				done(err);
			});
		});

		it("returns a valid original URL and short_url without http prefix", function(done) {
			request.get('/new/www.uol.com.br')
			.expect(200)
			.end(function(err, res) {
				var expected = {original_url: 'http://www.uol.com.br', short_url: 'http://testhost.myapp.com/ABCDE'};
				expect(res.body).to.eql(expected);
				done(err);
			});
		});

		it("returns an error caused by an invalid url", function(done) {
			request.get('/new/invalid_url')
			.expect(200)
			.end(function(err, res) {
				var expected = {error: 'Invalid URL'};
				expect(res.body).to.eql(expected);
				done(err);
			});
		});

		it("returns original_url and short_url if query param allow = true, for an invalid URL", function(done) {
			request.get('/new/invalid_url?allow=true')
			.expect(200)
			.end(function(err, res) {
				var expected = {original_url: 'invalid_url', short_url: 'http://testhost.myapp.com/12345'};
				expect(res.body).to.eql(expected);
				done(err);
			});
		});

		it("returns an error caused by an invalid url if query param allow = false", function(done) {
			request.get('/new/invalid_url?allow=false')
			.expect(200)
			.end(function(err, res) {
				var expected = {error: 'Invalid URL'};
				expect(res.body).to.eql(expected);
				done(err);
			});
		});
	});
});