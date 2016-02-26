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
			expect(urlUtils.isHttpPresent(validUrl)).to.be.true;
			done();
		});

		it('http prefix must be added', function(done) {
			expect(urlUtils.addHttpOnHost('www.uol.com.br/news')).to.eql(validUrl);
			done();
		});

		it('hostname from url without http prefix path must be returned', function(done) {
			expect(urlUtils.getHostpath('www.uol.com.br/news')).to.eql('www.uol.com.br');
			done();
		});	

		it('hostname from url with http prefix path must be returned', function(done) {
			expect(urlUtils.getHostpath(validUrl)).to.eql('www.uol.com.br');
			done();
		});		

		it('relative path from url without http prefix path must be returned', function(done) {
			expect(urlUtils.getRelativePath('www.uol.com.br/news')).to.eql('/news');
			done();
		});	

		it('relative path from url with http prefix path must be returned', function(done) {
			expect(urlUtils.getRelativePath(validUrl)).to.eql('/news');
			done();
		});				
	});


	describe('Parse for a invalid url', function(done) {
		var invalidUrl = 'htp://ww.uol.com.br/news';
		var urlUtils = new UrlUtils();

		it('must validate url as false', function(done) {
			expect(urlUtils.validate(invalidUrl)).to.be.false;
			done();
		});

		it('must remove http from host', function(done) {
			expect(urlUtils.removeHttpFromHost(invalidUrl)).to.eql('htp://ww.uol.com.br/news');
			done();
		});	

		it('http prefix must not be present', function(done) {
			expect(urlUtils.isHttpPresent(invalidUrl)).to.be.false;
			done();
		});

		it('http prefix must not be be added', function(done) {
			expect(urlUtils.addHttpOnHost('www.uol.com.br/news')).to.not.eql(invalidUrl);
			done();
		});

		it('hostname from url without http prefix path must be returned', function(done) {
			expect(urlUtils.getHostpath('www.uol.com.br/news')).to.eql('www.uol.com.br');
			done();
		});	

		it('hostname from url with http prefix path must not be returned', function(done) {
			expect(urlUtils.getHostpath(invalidUrl)).to.not.eql('www.uol.com.br');
			done();
		});		

		it('relative path from url without http prefix path must not be returned', function(done) {
			expect(urlUtils.getRelativePath('www.uol.com.br/news')).to.eql('/news');
			done();
		});	

		it('relative path from url with http prefix path must not be returned', function(done) {
			expect(urlUtils.getRelativePath(invalidUrl)).to.not.eql('/news');
			done();
		});				
	});
}) 