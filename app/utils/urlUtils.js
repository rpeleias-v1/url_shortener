module.exports = function(app) {
	
	var urlUtils = function() {		
	}

	urlUtils.prototype.validate = function(url) {
		return /^((https?):\/\/)?([w|W]{3}\.)?[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(\/[a-zA-Z0-9]*)?$/.test(url);
	}

	urlUtils.prototype.removeHttpFromHost = function(url) {
		if(!this.isHttpPresent(url)) {
			return url;
		}
		return url.substring(7);
				
	}

	urlUtils.prototype.isHttpPresent = function(url) {
		return /^https?:\/\//.test(url);
	}

	urlUtils.prototype.addHttpOnHost = function(url) {
		if(!this.isHttpPresent(url)) {
			return 'http://' + url;	
		}
		return url;
	}
	
	urlUtils.prototype.makeRandomId = function() {
	    var text = "";
	    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

	    for( var i=0; i < 5; i++ )
	        text += possible.charAt(Math.floor(Math.random() * possible.length));

	    return text;
	}

	urlUtils.prototype.getHostpath = function(url) {
		if(!this.isHttpPresent(url)) {
			return url.split('/')[0];
		} else if (this.isHttpPresent(url)){
			return url.split('/')[2];
		} else {
			return "Split is not possible";
		}
	}

	urlUtils.prototype.getRelativePath = function(url) {
		if(!this.isHttpPresent(url)) {
			return '/' + url.split('/')[1];
		} else if (this.isHttpPresent(url)){
			return '/' +url.split('/')[3];
		} else {
			return "Split is not possible";
		}
	}

	return urlUtils;
}