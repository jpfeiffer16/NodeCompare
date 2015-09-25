/// <reference path="../../typings/tsd.d.ts" />

var maxCompares = 3;



module.exports = (function() {
  var processJob = function (job, callback) {
    process.nextTick(function() {
      saveJobData(job, function(jobWithIds) {
        var ImageGetter = require('./ImageGetter.js'),
            PageInfoGetter = require('./PageInfoGetter.js'),
            CompareMonitor = require('./CompareMonitor.js'),
            compareList = jobWithIds.compares;
            
        //Here we run the compares
        var comparer = new CompareMonitor(1, compareList);
        comparer.monitorCompares().done(function () {
          console.log('Yay! We made it.');
          if (typeof(callback) == 'function') {
            callback();
          }
        });
      });
    });
  };

  var saveJobData = function (jobWithoutIds, callback) {
    var mongoose = require('mongoose');
    var Job = require('../models/job.js');
    var jobId = new mongoose.Types.ObjectId();


    var job = new Job({
      _id: jobId,
      name: jobWithoutIds.name,
      description: jobWithoutIds.description,
      compares: []
    });


    console.log(jobWithoutIds);

    for (var i = 0; i < jobWithoutIds.compares.length; i++) {
      jobWithoutIds.compares[i].sourceId = new mongoose.Types.ObjectId();
      jobWithoutIds.compares[i].targetId = new mongoose.Types.ObjectId();
      jobWithoutIds.compares[i].compareId = new mongoose.Types.ObjectId();
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
    var Promise = require('./PromiseEngine.js');
    var Image = require('../models/image.js');
    var image = new Image({ _id: id, data: data.toString() });

    image.save(function (err) {
      if (!err) {
        console.log('Image Saved');
        Promise.resolve(true);
      } else {
        throw err;
      }
    });
    return Promise;
  };

  var saveSourceData = function(source, id) {
    var Promise = require('./PromiseEngine.js');
    var Source = require('../models/source.js');
    var source = new Source({ _id: id, data: source.toString() });

    source.save(function (err) {
      if (!err) {
        console.log('Source Saved');
        Promise.resolve(true);
      } else {
        throw err;
      }
    });
    return Promise;
  }

  var saveImageCompareData = function(data, id) {
    var Promise = require('./PromiseEngine.js');
    var ImageCompare = require('../models/imagecompare.js');
    var compareImage = new ImageCompare({ _id: id, data: data.toString() });

    compareImage.save(function (err) {
      if (!err) {
        console.log('Compare Image Saved');
        Promise.resolve(true);
      } else {
        throw err;
      }
    });
    return Promise;
  }

  var removeJob = function(id, callback) {
    var Job = require('../models/job.js'),
        Image = require('../models/image.js'),
        Source = require('../models/source.js');
    Job.findOne({_id: id}, function(err, document) {
      if (!err) {
        for (var i = 0; i < document.compares.length; i++) {
          var element = document.compares[i];
          (function (element) {
            var sourceId = element.sourceId,
                targetId = element.targetId;

            Image.findOneAndRemove({_id: sourceId}, function (err, document) {
              //TODO: Find something to do here.
            });

            Source.findOneAndRemove({_id: sourceId}, function (err, document) {
              //TODO: Find something to do here.
            });

            Image.findOneAndRemove({_id: targetId}, function (err, document) {
              //TODO: Find something to do here.
            });

            Source.findOneAndRemove({_id: targetId}, function (err, document) {
              //TODO: Find something to do here.
            });
          })(element);
        }
        Job.findOneAndRemove({_id: id}, function (err, document) {
          setTimeout(function() {
            if (typeof(callback) == 'function') {
              callback();
            }
          }, 500);
        });
      } else {
        //TODO: Find something to do here as well
      }
    });
  }
  var removeTempImages = function (callback) {
    var path = require('path');
    var appDir = path.dirname(require.main.filename);
    var tempDir = appDir + '\\temp',
        fs = require('fs');
    console.log(tempDir);
    fs.rmdir(tempDir, function() {
      if (typeof(callback) == 'function') {
        callback();
      }
    });
  };
  
  return {
    processJob: processJob,
    removeJob: removeJob,
    saveImageData: saveImageData,
    saveSourceData: saveSourceData,
    removeTempImages: removeTempImages
  };
})();
