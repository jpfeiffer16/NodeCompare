/// <reference path="../../typings/tsd.d.ts" />
module.exports = function() {
  var getInfo = function(url, id) {
    var fs = require('fs');
    var phantom = require('phantom');
    var Promise = require('./PromiseEngine.js');
    var promise = new Promise();
    var SettingsProvider = require('./SettingsProvider');
    var fileName = id;
    phantom.create(function (ph) {
      ph.createPage(function (page) {
        SettingsProvider.getSetting('userAgent' , function(userAgent) {
          page.set('viewportSize', { width: 1000, height: 3000});
          page.set('settings.userAgent', userAgent);
          page.open(url, function (status) {
            console.log(url + ' opened with status: ' + status.toString());
            page.render('./temp/' + fileName + '.png', function () {
              fs.readFile('./temp/' + fileName + '.png', function (err, data) {
                if (err == null) {
                  var base64 = data.toString('base64');
                  page.getContent(function(source) {
                    ph.exit();
                    promise.resolve(true, {
                      imageData: base64,
                      sourceData: source
                    });
                  });
                } else {
                  throw 'Error reading temp file';
                }
              });
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
    return promise;
  };
  
  return {
    getInfo: getInfo,
  }
}();