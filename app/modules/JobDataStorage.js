module.exports = (function() {
	var that = this;
	var processJob = function(sourceUrl, targetUrl, name, description) {
		var ObjectId = require('mongoose').Schema.ObjectId;
		
	// 	var webshot = require('webshot');
	// 
	// 	var options = {
	// 		phantomPath: '/usr/local/bin/phantomjs'	
	// 	};
	// 	
	// 	var sourceStream = webshot(sourceUrl, options);
	// 	var targetStream = webshot(targetUrl, options);
	
		var phantom = require('node-phantom');
		
		phantom.create(function(err, ph) {
			return ph.createPage(function(err, page){
				return page.open(sourceUrl, function(err, stats) {
					var base64 = page.renderBase64('PNG');
					console.log(base64);
				});
			});
		});
		
		var sourceImageId;
		var targetImageId;
		
		
		// sourceStream.on('data', function(data) {
		// 	sourceImageId = saveImageData(data.toString());
		// });
		// targetStream.on('data', function(data) {
		// 	targetImageId = saveImageData(data.toString());
		// });
		saveJobData(name, description, sourceUrl, targetUrl, sourceImageId, targetImageId, new ObjectId);
	};
	var saveJobData = function(name, description, sourceUrl, targetUrl, sourceImageId, targetImageId, diffImageId) {
		var mongoose = require('mongoose'),
			Schema = mongoose.Schema,
			ObjectId = Schema.ObjectId;
		var Job = require('../models/job.js');
		var jobId = new ObjectId;
		var job = new Job({
			_id: jobId,
			name: name,
			description: description,
			sourceUrl: sourceUrl,
			targetUrl: targetUrl,
			sourceImageId: sourceImageId,
			targetImageId: targetImageId,
			diffImageId: diffImageId
		});
		job.save(function(err) {
			if(!err) {
				console.log('Job Saved');
			} else {
				return err;
			}
		});
	};
	var saveImageData = function(data) {
		var mongoose = require('mongoose'),
			Schema = mongoose.Schema,
			ObjectId = Schema.ObjectId;
		var Image = require('../models/image.js');
		var id = new ObjectId;
		
		var image = new Image({_id: id, data: data});
		
		image.save(function(err) {
			if(!err){
				console.log('Image Saved');
			} else {
				return err;
			}
		});
		return id;
	};
	return {
		processJob: processJob
	};
})();