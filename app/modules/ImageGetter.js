/// <reference path="../../typings/tsd.d.ts" />
module.exports = function() {
  var getImage = function(url) {
    var returnObj = {};
    
    var fs = require('fs');
    var phantom = require('phantom');
    var fileName = require('node-uuid').v1();
    console.log(fileName);

    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.set('viewportSize', { width: 1000, height: 3000});
        page.open(url, function (status) {
          console.log(url + ' opened with status: ' + status.toString());
          
          page.render(__dirname + fileName + '.png', function () {
            fs.readFile(__dirname + fileName + '.png', function (err, data) {
              if (err == null) {
                var base64 = data.toString('base64');
                console.log('Done Rendering');
                if (typeof(returnObj.then) == 'function') {
                  returnObj.then(base64);
                }
                fs.unlink(__dirname  + fileName + '.png', function(err) {
                	if (err == null || err == undefined) {
                		console.log('Temp file deleted');
                	} else {
                		throw 'Error deleting the temp file';
                	}
                });
              } else {
                throw 'Error reading temp file';
              }
            });
          });
        });
      });
    }, 
      {
        dnodeOpts: {
        weak: false
      }
    });
    return returnObj;
  };
  
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
      var base64 = result.data;
      if (!err) {
        if (typeof(callback) == 'function') {
          callback(base64);
        }
      } else {
        throw err;
      }
    });
  }
  
  return {
    getImage: getImage,
    getSavedImageAsBinary: getSavedImageAsBinary,
    getSavedImageAsBase64: getSavedImageAsBase64
  }
}