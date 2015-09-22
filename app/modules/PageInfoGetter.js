/// <reference path="../../typings/tsd.d.ts" />
/**
 * Gets various info and stats from a page loaded with Phantom JS
 * Contains a partial implementation of the promise spec. Use .then(onFulfilled, onRejected)
 * can be chained
 */
module.exports = function() {
  var getInfo = function(url, id) {
    function resolvePromise(fulfilled, data) {
      if (fulfilled) {
        //Loop through the handlers and call each
        for (var i = 0; i < returnObj.onFulfilled.length; i++) {
          returnObj.onFulfilled[i](data);
        }
        returnObj.isResolved = true;
      } else {
        for (var i = 0; i < returnObj.onRejected.length; i++) {
          returnObj.onRejected[i](data);
        }
        returnObj.isResolved = true;
      }
    }
    var returnObj = {
      onFulfilled: [],
      onRejected: [],
      isResolved: false,
      then: function(onFulfilled, onRejected) {
        if (typeof(onFulfilled) == 'function') {
          this.onFulfilled.push(onFulfilled);
        }
        if (typeof(onRejected) == 'function') {
          this.onRejected.push(onRejected);
        }
        return this;
      },
      when: function(firstPromise, secondPromise) {
        var thisReturnObj = {
          then: function (callback) {
            if (typeof(callback) == 'function') {
              this.callback = callback;
            }
          }
        };
        (function checkComplete () {
          if (!firstPromise.isResolved && !secondPromise.isResolved) {
            setTimeout(checkComplete, 400);
          } else {
            thisReturnObj.callback();
          }
          
        })();
        return thisReturnObj;
      }
    };
    
    var fs = require('fs');
    var phantom = require('phantom');
    // var fileName = require('node-uuid').v4();
    var fileName = id;
    console.log(fileName);

    phantom.create(function (ph) {
      ph.createPage(function (page) {
        page.set('viewportSize', { width: 1000, height: 3000});
        page.open(url, function (status) {
          console.log(url + ' opened with status: ' + status.toString());
          page.render('./temp/' + fileName + '.png', function () {
            fs.readFile('./temp/' + fileName + '.png', function (err, data) {
              if (err == null) {
                var base64 = data.toString('base64');
                page.getContent(function(source) {
                  ph.exit();
                  resolvePromise(true, {
                    imageData: base64,
                    sourceData: source
                  });
                });
                // fs.unlink(__dirname  + fileName + '.png', function(err) {
                // 	if (err == null || err == undefined) {
                // 		console.log('Temp file deleted');
                // 	} else {
                // 		throw 'Error deleting the temp file';
                // 	}
                // });
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
  
  return {
    getInfo: getInfo,
  }
}();