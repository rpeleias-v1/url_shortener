describe('Utils: urlUtils', function() {

	var UrlUtils = app.utils.urlUtils;
	describe('Parse for a valid url', function(done) {
		var validUrl = 'http://www.uol.com.br/news';
		var urlUtils = new UrlUtils();

		it('must validate url', function(done) {
			expect(urlUtils.validate(validUrl)).to.be.true;
			done();
		});

		it('must remove http from host', function(done) {
			expect(urlUtils.removeHttpFromHost(validUrl)).to.eql('www.uol.com.br/news');
			done();
		});

		it('http prefix must be present', function(done) {
			expect(urlUtils.removeHttpFromHost(validUrl)).to.eql('www.uol.com.br/news');
			done();
		});
	});
}) 