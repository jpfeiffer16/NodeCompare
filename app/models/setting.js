var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
	
var SettingSchema = new Schema({
	_id: ObjectId,
	name: String,
  value: String,
  type: {type: String}
});

module.exports = mongoose.model('Setting', SettingSchema);