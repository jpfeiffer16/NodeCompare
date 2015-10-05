module.exports = function (maxCompares, compareList) {
  var self = this;
  var numberOfRunningCompares = 0;
  var numberOfClosures = 0;
  
  this.maxCompares = maxCompares;
  this.compareList = compareList;
  this.onFinished = null;
  
  function monitorCompares() {
    process.nextTick(function () {
      var PageInfoGetter = require('./PageInfoGetter.js');
      var JobDataStorage = require('./JobDataStorage.js');
      var ImageComparer = require('./ImageComparer.js');
      var Promise = require('./PromiseEngine.js');
      
      if (maxCompares > compareList.lenth) {
        maxCompares = compareList.length;
      }
      (function checkCompares() {
        while (numberOfRunningCompares <= maxCompares) {
          if (compareList.length != 0 ) {
            (function (thisCompare) {
              var sourceImageSavePromise = new Promise();
              var targetImageSavePromise = new Promise();
              var sourcePromise = PageInfoGetter.getInfo(thisCompare.sourceUrl, thisCompare.sourceId);
              sourcePromise.then(function(info) {
                sourceImageSavePromise = JobDataStorage.saveImageData(info.imageData, thisCompare.sourceId);
                JobDataStorage.saveSourceData(info.sourceData, thisCompare.sourceId);
              });
              var targetPromise = PageInfoGetter.getInfo(thisCompare.targetUrl, thisCompare.targetId);
              targetPromise.then(function(info) {
                targetImageSavePromise = JobDataStorage.saveImageData(info.imageData, thisCompare.targetId);
                JobDataStorage.saveSourceData(info.sourceData, thisCompare.targetId);
              });
              sourcePromise.when(sourcePromise, targetPromise).then(function() {
                numberOfRunningCompares--;
                numberOfClosures++;
                sourceImageSavePromise.when(sourceImageSavePromise, targetImageSavePromise).then(function() {
                  ImageComparer.compareImages(thisCompare.compareId, thisCompare.sourceId, thisCompare.targetId, function () {
                    numberOfClosures--;
                    console.log('Compare completed');
                  });
                });
              });
              numberOfRunningCompares++;
            })(compareList.pop());
          } else {
            break;
          }
          console.log(numberOfRunningCompares);
          console.log(numberOfClosures);
        }
        if (compareList.length == 0 && numberOfRunningCompares == 0 && numberOfClosures == 0) {
          if (self.onFinished != null) {
            JobDataStorage.removeTempImages(function(err) {
              if (!err) {
                console.log('Temp files deleted');
              } else {
                console.log('Unable to delete temp files');
              }
            });
            self.onFinished();
          }
        } else {
          setTimeout(checkCompares, 400);
        }
      })();
    });
    return {
      done: function(callback) {
        if (typeof(callback) == 'function') {
          self.onFinished = callback;
        }
      }
    } 
  }
  return {
    monitorCompares: monitorCompares
  };
};