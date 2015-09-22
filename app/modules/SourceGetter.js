/// <reference path="../../typings/tsd.d.ts" />
module.exports = function () {
  function getSavedSource(id, callback) {
    var Source = require('../models/source.js');
    Source.findOne({_id: id}, function(err, result) {
      if (!err) {
        if (typeof(callback) == 'function') {
          callback(result);
        } else {
          throw err;
        }
      }
    });
  }
  return {
    getSavedSource: getSavedSource
  }
}();