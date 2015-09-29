/// <reference path="../../typings/tsd.d.ts" />
module.exports = function() {
  var getInfo = function(url, id) {
    
    console.log('getInfo being called.');
    // function resolvePromise(fulfilled, data) {
    //   if (fulfilled) {
    //     //Loop through the handlers and call each
    //     for (var i = 0; i < returnObj.onFulfilled.length; i++) {
    //       returnObj.onFulfilled[i](data);
    //     }
    //     returnObj.isResolved = true;
    //   } else {
    //     for (var i = 0; i < returnObj.onRejected.length; i++) {
    //       returnObj.onRejected[i](data);
    //     }
    //     returnObj.isResolved = true;
    //   }
    // }
    // var returnObj = {
    //   onFulfilled: [],
    //   onRejected: [],
    //   isResolved: false,
    //   then: function(onFulfilled, onRejected) {
    //     if (typeof(onFulfilled) == 'function') {
    //       this.onFulfilled.push(onFulfilled);
    //     }
    //     if (typeof(onRejected) == 'function') {
    //       this.onRejected.push(onRejected);
    //     }
    //     return this;
    //   },
    //   when: function(firstPromise, secondPromise) {
    //     var thisReturnObj = {
    //       then: function (callback) {
    //         if (typeof(callback) == 'function') {
    //           this.callback = callback;
    //         }
    //       }
    //     };
    //     (function checkComplete () {
    //       if (!firstPromise.isResolved && !secondPromise.isResolved) {
    //         setTimeout(checkComplete, 400);
    //       } else {
    //         thisReturnObj.callback();
    //       }
    //       
    //     })();
    //     return thisReturnObj;
    //   }
    // };
    
    var fs = require('fs');
    var phantom = require('phantom');
    var Promise = require('./PromiseEngine.js');
    var promise = new Promise();
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