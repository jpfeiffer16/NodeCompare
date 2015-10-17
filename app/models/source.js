var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
	
var SourceSchema = new Schema({
	_id: ObjectId,
	data: String
});

module.exports = mongoose.model('Source', SourceSchema);