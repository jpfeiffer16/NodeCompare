/// <reference path="../../typings/tsd.d.ts" />
var PageInfoGetter = require('./PageInfoGetter.js'),
    JobDataStorage = require('./JobDataStorage.js'),
    ImageComparer = require('./ImageComparer.js'),
    Promise = require('./PromiseEngine.js'),
    QueuedCompare = require('../models/queuedCompare.js');




module.exports = function (maxCompares) {
  var finished = false;
  var numberOfRunningCompares = 0;
  // var numberOfAvailableCompares = null;
  var numberOfClosures = 0;
  var onFinished = null;
  
  // var self = this;
  
  function processCompares(callback) {
    
    function checkComplete() {
      console.log('numberOfRunningCompares: ', numberOfRunningCompares, '/n numberOfClosures: ', numberOfClosures);
      if (numberOfRunningCompares == 0 && numberOfClosures == 0) {
        JobDataStorage.removeTempImages(function(err) {
          if (!err) {
            console.log('Temp files deleted');
          } else {
            console.log('Unable to delete temp files');
          }
        });
        if (onFinished != null) {
          onFinished();
        }
      } else {
        setTimeout(checkComplete, 400);
      }
    };
    
    QueuedCompare.count(function(err, count) {
      if (count != 0 && numberOfRunningCompares <= maxCompares) {
        QueuedCompare.findOneAndRemove(null, function (err, doc) {
          console.log('Doc is null: ', doc == null);
          if (!err && doc != null) {
            //Do processing
            // console.dir(doc);
            var sourceImageSavePromise = new Promise(),
                targetImageSavePromise = new Promise();
            var sourcePromise = PageInfoGetter.getInfo(doc.sourceUrl, doc.sourceId);
            sourcePromise.then(function(info) {
              sourceImageSavePromise = JobDataStorage.saveImageData(info.imageData, doc.sourceId);
              JobDataStorage.saveSourceData(info.sourceData, doc.sourceId);
            });
            var targetPromise = PageInfoGetter.getInfo(doc.targetUrl, doc.targetId);
            targetPromise.then(function(info) {
              targetImageSavePromise = JobDataStorage.saveImageData(info.imageData, doc.targetId);
              JobDataStorage.saveSourceData(info.sourceData, doc.targetId);
            });
            sourcePromise.when(sourcePromise, targetPromise).then(function() {
              numberOfRunningCompares--;
              numberOfClosures++;
              sourceImageSavePromise.when(sourceImageSavePromise, targetImageSavePromise).then(function() {
                console.log('Beginning of compare callback');
                ImageComparer.compareImages(doc.compareId, doc.sourceId, doc.targetId, function () {
                  numberOfClosures--;
                  console.log('Compare completed');
                });
              });
            });
            numberOfRunningCompares++;
          }
        });
      }
      if (count != 0) {
        // console.log('Looping');
        // console.log('Count:', count);
        // console.log('numberOfRunningCompares:', numberOfRunningCompares);
        // console.log('numberOfClosures:', numberOfClosures);
        processCompares();
        
      }  else {
        if (!finished) {
          setTimeout(checkComplete, 400);
        } else {
          finished = true;
        }
      }
      // else {
        // if (onFinished != null){
        //   JobDataStorage.removeTempImages(function(err) {
        //     if (!err) {
        //       console.log('Temp files deleted');
        //     } else {
        //       console.log('Unable to delete temp files');
        //     }
        //   });
        //   onFinished();
        // }
      // }
    });
  }
  
  this.monitorCompares = function() {
    processCompares();
    return {
      done: function(callback) {
        if (typeof(callback) == 'function') {
          onFinished = callback;
        }
      }
    };
  };
};