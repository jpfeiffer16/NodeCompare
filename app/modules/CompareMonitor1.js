module.exports = function (maxCompares, compareList) {
  this.onFinished = null;
  var self = this,
    numberOfRunningCompares = 0,
    numberOfClosures = 0;
  
  function monitorCompares() {
    process.nextTick(function () {
      var PageInfoGetter = require('./PageInfoGetter.js'),
          JobDataStorage = require('./JobDataStorage.js'),
          ImageComparer = require('./ImageComparer.js'),
          Promise = require('./PromiseEngine.js');
      //TODO: Implement this in the new compare monitor
      if (maxCompares > compareList.lenth) {
        maxCompares = compareList.length;
      }
      (function checkCompares() {
        while (numberOfRunningCompares <= maxCompares) {
          if (compareList.length != 0 ) {
            (function (thisCompare) {
              var sourceImageSavePromise = new Promise(),
                  targetImageSavePromise = new Promise();
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