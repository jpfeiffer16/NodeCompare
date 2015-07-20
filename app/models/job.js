var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
var JobSchema = new Schema({
	_id: ObjectId,
	sourceUrl: String,
	targeUrl: String,
	name: String,
	description: String,
	sourceImage: ObjectId,
	targetImage: ObjectId,
	diffImage: ObjectId
});

module.exports = mongoose.model('Job', JobSchema);