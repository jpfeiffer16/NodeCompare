var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
	
  
  
  
  
var JobSchema = new Schema({
	_id: ObjectId,
  name: {type: String},
	description: {type: String},
  compares: [
    {
    	sourceUrl: {type: String},
    	targetUrl: {type: String},
    	sourceId: {type: ObjectId, ref: 'Image'},
    	targetId: {type: ObjectId, ref: 'Image'},
      compareId: {type: ObjectId, ref: 'Image'}
    }
  ]
});
module.exports = mongoose.model('Job', JobSchema);