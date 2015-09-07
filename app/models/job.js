var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
var JobSchema = new Schema({
	_id: ObjectId,
  name: {type: String},
	description: {type: String},
	sourceUrl: {type: String},
	targetUrl: {type: String},
	sourceImageId: {type: ObjectId},
	targetImageId: {type: ObjectId}
	// diffImage: ObjectId
});

module.exports = mongoose.model('Job', JobSchema);