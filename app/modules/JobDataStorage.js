/// <reference path="../../typings/tsd.d.ts" />
module.exports = (function() {
  var processJob = function (job, callback) {
    process.nextTick(function() {
      saveJobData(job, function(jobWithIds) {
        var SettingsProvider = require('./SettingsProvider.js'),
            CompareMonitor = require('./CompareMonitor.js'),
            compareList = jobWithIds.compares;
        SettingsProvider.getSetting('maxConcurrentCompares', function(maxConcurrentCompares) {
          console.log('newing up monitor');
          var comparer = new CompareMonitor(maxConcurrentCompares, compareList);
          comparer.monitorCompares().done(function () {
            console.log('Yay! We made it.');
            if (typeof(callback) == 'function') {
              callback();
            }
          });
        });
      });
    });
  };

  var saveJobData = function (jobWithoutIds, callback) {
    var mongoose = require('mongoose'),
        Job = require('../models/job.js'),
        jobId = new mongoose.Types.ObjectId();

    var job = new Job({
      _id: jobId,
      name: jobWithoutIds.name,
      description: jobWithoutIds.description,
      compares: []
    });

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
    var Promise = require('./PromiseEngine.js'),
        promise = new Promise(),
        Image = require('../models/image.js'),
        image = new Image({ _id: id, data: data.toString() });

    image.save(function (err) {
      if (!err) {
        console.log('Image Saved');
        promise.resolve(true);
      } else {
        throw err;
      }
    });
    return promise;
  };

  var saveSourceData = function(source, id) {
    var Promise = require('./PromiseEngine.js'),
    promise = new Promise(),
    Source = require('../models/source.js'),
    source = new Source({ _id: id, data: source.toString() });

    source.save(function (err) {
      if (!err) {
        console.log('Source Saved');
        promise.resolve(true);
      } else {
        throw err;
      }
    });
    return promise;
  }

  var saveImageCompareData = function(data, id) {
    var Promise = require('./PromiseEngine.js'),
        promise = new Promise(),
        ImageCompare = require('../models/imagecompare.js'),
        compareImage = new ImageCompare({ _id: id, data: data.toString() });
    compareImage.save(function (err) {
      if (!err) {
        promise.resolve(true);
      } else {
        throw err;
      }
    });
    return promise;
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
    var tempDir = appDir + '/temp',
        fs = require('fs');
    if (fs.existsSync(tempDir)) {
      var files = fs.readdirSync(tempDir);
      files.forEach(function(file,index){
        var curPath = tempDir + "/" + file;
        fs.unlinkSync(curPath);
      });
      fs.rmdirSync(tempDir);
      if (typeof(callback) == 'function') {
        callback();
      }
    } else {
      callback({err: 'Directory does not exist'});
    }
  };
  return {
    processJob: processJob,
    removeJob: removeJob,
    saveImageData: saveImageData,
    saveImageCompareData: saveImageCompareData,
    saveSourceData: saveSourceData,
    removeTempImages: removeTempImages
  };
})();
