var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
var ImageSchema = new Schema({
	_id: ObjectId,
	data: String
});

module.exports = mongoose.model('Image', ImageSchema);