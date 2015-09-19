/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .service('ImageManipulator', function($http, JobInterface) {
    
    var dataURLToBlob = function(dataURL) {
      var BASE64_MARKER = ';base64,';
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        var parts = dataURL.split(',');
        var contentType = parts[0].split(':')[1];
        var raw = decodeURIComponent(parts[1]);
        
        return new Blob([raw], {type: contentType});
      }
      
      var parts = dataURL.split(BASE64_MARKER);
      var contentType = parts[0].split(':')[1];
      var raw = window.atob(parts[1]);
      var rawLength = raw.length;
      var uInt8Array = new Uint8Array(rawLength);
      
      for (var i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], {type: contentType});
    }
    
    return function service () {
      function compare(sourceImageId, targetImageId, callback) {
        JobInterface.getImageData(sourceImageId, function (data) {
          var sourceData = 'data:image/png;base64,' + data;
          JobInterface.getImageData(targetImageId, function (data) {
            var targetData = 'data:image/png;base64,' + data;
            var sourceImageBlob = dataURLToBlob(sourceData);
            var targetImageBlob = dataURLToBlob(targetData);
            resemble(sourceImageBlob).compareTo(targetImageBlob).onComplete(function(data) {
              var dataUrl = data.getImageDataUrl();
              if(typeof(callback) == 'function') {
                callback(dataUrl);
              }
            });
          });
        });
      }
      return {
        compare: compare
      }
    }() ;
  });