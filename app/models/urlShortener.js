var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {

	var schema = mongoose.Schema({
		url_code: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		},
		original_url: {
			type: String,
			required: true,
			index: {
				unique: true
			}
		}, 
		short_url: {
			type: String,
			required: true
		}
	})
	schema.plugin(findOrCreate);
	return mongoose.model('UrlShortener', schema);
}