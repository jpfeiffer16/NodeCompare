module.exports = (function () {
  
  var getBlob = function (base64) {
    var raw = decodeURIComponent(base64);
    
    return new Blob([raw], {type: 'png'});
  };
  
  
  
  
  var compareImages = function(sourceImageId, targetImageId, callback) {
    var resemble = require('node-resemble-js');
    var ImageGetter = require('./ImageGetter.js');
    
    ImageGetter.getSavedImageAsBase64(sourceImageId, function (data) {
      var sourceImageData = 'data:image/png;base64,' + data;
      ImageGetter.getSavedImageAsBase64(targetImageId, function(data) {
        var targetImageData = 'data:image/png;base64,' + data;
        var sourceImage = new Buffer(sourceImageData, 'base64');
        var targetImage = new Buffer(targetImageData, 'base64');
        
        resemble('./temp/' + sourceImageId + '.png').compareTo('./temp/' + targetImageId + '.png').onComplete(function(data) {
        // resemble(sourceImageData).compareTo(targetImageData).onComplete(function(data) {
          var dataBuffer = data.getDiffImage().data;
          // var markerIndex = dataUrl.indexOf(';base64,');
          var base64 = dataBuffer.toString('base64');
          // var data = dataUrl.slice(markerIndex + 8, dataUrl.length - 1);
          
          var fs = require('fs');
          
          fs.write('./temp/test.png', dataBuffer, 0, dataBuffer.length, function () {
            console.log('Done');
          });
          
          
          
          
          
          
          if (typeof(callback) == 'function') {
            callback(base64);
          };
          
          
          
        });
        
        
      });
    });
    
  };
  
  
  
  return {
    compareImages: compareImages
  };
})();