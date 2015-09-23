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
          var fs = require('fs');
          
          
          var png = data.getDiffImage();
          var pngBuffer = new Buffer([]);
          var pngStream = png.pack();
          
          pngStream.on('data', function(data) {
            pngBuffer = Buffer.concat([pngBuffer, data]);
          });
          
          pngStream.on('end', function () {
            fs.writeFile('./temp/test.png', pngBuffer, null, function () {
              console.log('Done');
            });
          });
          
          
          // data.getDiffImage().pack().pipe(fs.createWriteStream('./temp/test.png'));
          
          
          
          
          
          
          
          
          
          
          
          // if (typeof(callback) == 'function') {
          //   callback(base64);
          // };
          // 
          
          
        });
        
        
      });
    });
    
  };
  
  
  
  return {
    compareImages: compareImages
  };
})();