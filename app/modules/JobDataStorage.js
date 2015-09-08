/// <reference path="../../typings/node/node.d.ts"/>
/* global __dirname */
module.exports = (function () {
  var processJob = function (sourceUrl, targetUrl, name, description, callback) {
    process.nextTick(function() {
      saveJobData(name, description, sourceUrl, targetUrl, function(info) {
        var sourceImageId = info.sourceImageId,
            targetImageId = info.targetImageId,
            ImageGetter = require('./ImageGetter.js');
            
        ImageGetter.getImage(sourceUrl).then = function(base64) {
          console.log('Starting to get first image');
          saveImageData(base64, sourceImageId);
        };
        ImageGetter.getImage(targetUrl).then = function(base64) {
          console.log('Starting to get second image');
          saveImageData(base64, targetImageId);
        };
      });
      if (typeof(callback) == 'function') {
        callback();
      }
    });
  };
  
  var saveJobData = function (name, description, sourceUrl, targetUrl, callback) {
    var mongoose = require('mongoose');
    var Job = require('../models/job.js');
    var jobId = mongoose.Types.ObjectId();
    
    var sourceImageId = mongoose.Types.ObjectId();
    var targetImageId = mongoose.Types.ObjectId();
    
    // var diffImageId = mongoose.Types.ObjectId();
    var job = new Job({
      _id: jobId,
      name: name,
      description: description,
      sourceUrl: sourceUrl,
      targetUrl: targetUrl,
      sourceImageId: sourceImageId,
      targetImageId: targetImageId,
      // diffImageId: diffImageId
    });
    console.log('Saving...');
    job.save(function (err) {
      if (!err) {
        console.log('Job Saved');
      } else {
        // return err;
        throw err;
        // throw "Job Not saved";
      }
    });
    if (typeof(callback) == 'function') {
      callback({
        sourceImageId: sourceImageId,
        targetImageId: targetImageId
      });
    }
  };
  
  var saveImageData = function (data, id) {
    var Image = require('../models/image.js');
    var image = new Image({ _id: id, data: data.toString() });

    image.save(function (err) {
      if (!err) {
        console.log('Image Saved');
      } else {
        throw err;
      }
    });
    return id;
  };

  var removeJob = function(id, callback) {
    var Job = require('../models/job.js');
    Job.findOne({_id: id}, function(err, document) {
      if (!err) {
        var sourceImageId = document.sourceImageId;
        var targetImageId = document.targetImageId;
        
        Image.findOneAndRemove({_id: sourceImageId}, function(err, result) {
          // if (!err) {
          // }
          Image.findOneAndRemove({_id: targetImageId}, function(err, result) {
            // if (!err) {
            // }
            Job.findOneAndRemove({_id: id}, function(err, result) {
              // if (!err) {
              // }
              if (typeof(callback) == 'function') {
                callback();
              }
            });
          });
        });
      }
    });
  }
  return {
    processJob: processJob,
    removeJob: removeJob
  };
})();