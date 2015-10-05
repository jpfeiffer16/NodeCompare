module.exports = (function () {
  var compareImages = function(compareId, sourceImageId, targetImageId, callback) {
    var resemble = require('node-resemble-js'),
        JobDataStorage = require('./JobDataStorage.js'),
        ImageGetter = require('./ImageGetter.js');
    
    ImageGetter.getSavedImageAsBase64(sourceImageId, function (data) {
      ImageGetter.getSavedImageAsBase64(targetImageId, function(data) {
        resemble('./temp/' + sourceImageId + '.png').compareTo('./temp/' + targetImageId + '.png').onComplete(function(data) {
          var png = data.getDiffImage();
          var pngBuffer = new Buffer([]);
          var pngStream = png.pack();
          pngStream.on('data', function(data) {
            pngBuffer = Buffer.concat([pngBuffer, data]);
          });
          pngStream.on('end', function() {
            var base64 = pngBuffer.toString('base64');
            JobDataStorage.saveImageCompareData(base64, compareId).then(function() {
              if (typeof(callback) == 'function') {
                callback();
              }
            });
          });
        });
      });
    });
  };
  return {
    compareImages: compareImages
  };
})();