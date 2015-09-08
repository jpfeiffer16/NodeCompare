/// <reference path="../../typings/tsd.d.ts" />
module.exports = function () {
  
  function getSource(url, callback) {
    var phantom = require('phantom');
    
    phantom.create(function(ph) {
      ph.createPage(function(page) {
        page.open(url, function(status) {
          console.log('Page ' + url + ' opened with status ' + status);
          page.getContent(function(source) {
            if (typeof(callback) == 'function') {
              callback(source);
            }
          });
        });
      });
    });
  }
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
    getSource: getSource
  }
}();