var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
var JobSchema = new Schema({
	_id: ObjectId,
  name: {type: String},
	description: {type: String},
	sourceUrl: String,
	targeUrl: String,
	sourceImage: ObjectId,
	targetImage: ObjectId
	// diffImage: ObjectId
});

module.exports = mongoose.model('Job', JobSchema);