var Promise = function () {
  var self = this;
  self.isResolved = false;
  var fulfilledHandlers = [];
  var rejectedHandlers = [];
  
  self.resolve = function(isFulfilled, data) {
    if (isFulfilled) {
      fulfilledHandlers.forEach(function(fn) {
        fn(data);
      });
    } else {
      rejectedHandlers.forEach(function(fn) {
        fn(data);
      });
    }
    self.isResolved = true;
  };
  
  self.then = function (onResolved, onRejected) {
    if (typeof(onResolved) == 'function') {
      fulfilledHandlers.push(onResolved);
    }
    if (typeof(onRejected) == 'function') {
      rejectedHandlers.push(onRejected);
    }
  };
  
  self.when = function (firstPromise, secondPromise) {
    var that = this;
    that.callback = null;
    var thisReturnObj = {
      then: function (callback) {
        if (typeof(callback) == 'function') {
          that.callback = callback;
        }
      }
    };
    (function checkComplete () {
      if (!firstPromise.isResolved || !secondPromise.isResolved) {
        setTimeout(checkComplete, 400);
      } else {
        if (self.callback) {
          that.callback();
        }
      }
    })();
    return thisReturnObj;
  }
}
// module.exports = new Promise();
module.exports = Promise;