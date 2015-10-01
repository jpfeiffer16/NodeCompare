module.exports = function (maxCompares, compareList) {
  var self = this;
  var numberOfRunningCompares = 0;
  
  this.maxCompares = maxCompares;
  this.compareList = compareList;
  this.onFinished = null;
  
  function monitorCompares() {
    process.nextTick(function () {
      var PageInfoGetter = require('./PageInfoGetter.js');
      var JobDataStorage = require('./JobDataStorage.js');
      
      if (maxCompares > compareList.lenth) {
        maxCompares = compareList.length;
      }
      (function checkCompares() {
        while (numberOfRunningCompares <= maxCompares) {
          if (compareList.length != 0 ) {
            (function (thisCompare) {
              var sourcePromise = PageInfoGetter.getInfo(thisCompare.sourceUrl, thisCompare.sourceId);
              sourcePromise.then(function(info) {
                JobDataStorage.saveImageData(info.imageData, thisCompare.sourceId);
                JobDataStorage.saveSourceData(info.sourceData, thisCompare.sourceId);
              });
              var targetPromise = PageInfoGetter.getInfo(thisCompare.targetUrl, thisCompare.targetId);
              targetPromise.then(function(info) {
                JobDataStorage.saveImageData(info.imageData, thisCompare.targetId);
                JobDataStorage.saveSourceData(info.sourceData, thisCompare.targetId);
              });
              sourcePromise.when(sourcePromise, targetPromise).then(function() {
                //TODO: Eventualy need to add server side resemble control logic here.
                numberOfRunningCompares--;
              });
              numberOfRunningCompares++;
            })(compareList.pop());
          } else {
            break;
          }
          console.log(numberOfRunningCompares);
        }
        if (compareList.length == 0 && numberOfRunningCompares == 0) {
          if (self.onFinished != null) {
            setTimeout(function () {
              JobDataStorage.removeTempImages(function(err) {
                if (!err) {
                  console.log('Temp files deleted');
                } else {
                  console.log('Unable to delete temp files');
                }
              });
            }, 7000);
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