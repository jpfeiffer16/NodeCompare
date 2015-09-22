/// <reference path="../../typings/tsd.d.ts" />
module.exports = function() {
  var getSavedImageAsBinary = function(id, callback) {
    var Image = require('../models/image.js');
    
    Image.findOne({_id: id}, function(err, result) {
      var base64 = result.data;
      
      var buffer = new Buffer(base64, 'base64');
      if (!err) {
        if (typeof(callback) == 'function') {
          callback(buffer.toString());
        }
      } else {
        throw err;
      }
    });
  };
  
  var getSavedImageAsBase64 = function(id, callback) {
    var Image = require('../models/image.js');
    
    Image.findOne({_id: id}, function(err, result) {
      if (!err && result != null) {
        var base64 = result.data;
        if (typeof(callback) == 'function') {
          callback(base64);
        }
      } else {
        // throw err;
      }
    });
  }
  
  return {
    getSavedImageAsBinary: getSavedImageAsBinary,
    getSavedImageAsBase64: getSavedImageAsBase64
  }
}();