var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
  
var QueuedCompareSchema = new Schema({
	_id: ObjectId,
  sourceUrl: String,
  targetUrl: String,
  sourceId: ObjectId,
  targetId: ObjectId,
  compareId: ObjectId
});
module.exports = mongoose.model('QueuedCompare', QueuedCompareSchema);