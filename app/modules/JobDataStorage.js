/// <reference path="../../typings/tsd.d.ts" />
module.exports = (function() {
  var processJob = function (job, callback) {
    process.nextTick(function() {
      saveJobData(job, function(jobWithIds) {
        var ImageGetter = require('./ImageGetter.js'),
            SouceGetter = require('./SourceGetter.js');
            compareList = jobWithIds.compares;
        for (var i = 0; i < compareList.length; i++) {
          var element = compareList[i];
          (function(element) {
            ImageGetter.getImage(element.sourceUrl).then = function(base64) {
              console.log('Getting image ' + i);
              saveImageData(base64, element.sourceImageId);
            }
            ImageGetter.getImage(element.targetUrl).then = function(base64) {
              console.log('Getting image ' + i);
              saveImageData(base64, element.targetImageId);
            }
            // SouceGetter.getSource(element.sou);
          })(element);
        }
       
        if (typeof(callback) == 'function') {
          callback();
        }
        
        // ImageGetter.getImage(sourceUrl).then = function(base64) {
        //   console.log('Starting to get first image');
        //   saveImageData(base64, sourceImageId);
        // };
        // ImageGetter.getImage(targetUrl).then = function(base64) {
        //   console.log('Starting to get second image');
        //   saveImageData(base64, targetImageId);
        // };
      });
    });
  };
  
  var saveJobData = function (jobWithoutIds, callback) {
    var mongoose = require('mongoose');
    var Job = require('../models/job.js');
    var jobId = new mongoose.Types.ObjectId();
    
    // var sourceImageId = new  mongoose.Types.ObjectId();
    // var targetImageId = new mongoose.Types.ObjectId();
    
    // var diffImageId = mongoose.Types.ObjectId();
    var job = new Job({
      _id: jobId,
      name: jobWithoutIds.name,
      description: jobWithoutIds.description,
      compares: []
    });
    
    
    console.log(jobWithoutIds);
    
    for (var i = 0; i < jobWithoutIds.compares.length; i++) {
      // var compare = {
      //   sourceurl: compareList[i].sourceUrl,
      //   targetUrl: compareList[i].targetUrl,
      //   sourceImageId: new mongoose.Types.ObjectId(),
      //   targetImageId: new mongoose.Types.ObjectId()
      // }
      // job.compares.push(compare);
      
      jobWithoutIds.compares[i].sourceImageId = new mongoose.Types.ObjectId();
      jobWithoutIds.compares[i].targetImageId = new mongoose.Types.ObjectId();      
    }
    
    job.compares = jobWithoutIds.compares;
    
    console.log('Saving...');
    job.save(function (err) {
      if (!err) {
        console.log('Job Saved');
        if (typeof(callback) == 'function') {
          callback(job);
        }
      } else {
        throw err;
      }
    });
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
    var Image = require('../models/image.js')
    Job.findOne({_id: id}, function(err, document) {
      if (!err) {
        var sourceImageId = document.sourceImageId;
        var targetImageId = document.targetImageId;
        
        Image.findOneAndRemove({_id: sourceImageId}, function(err, result) {
          if (err) {
            throw err;
          }
          Image.findOneAndRemove({_id: targetImageId}, function(err, result) {
            if (err) {
              throw err;
            }
            Job.findOneAndRemove({_id: id}, function(err, result) {
              if (err) {
                throw err;
              }
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