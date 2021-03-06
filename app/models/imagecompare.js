var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
	
var ImageCompareSchema = new Schema({
	_id: ObjectId,
	data: String,
  misMatchPercentage: Number,
  isSameDimensions: Boolean
});

module.exports = mongoose.model('ImageCompare', ImageCompareSchema);