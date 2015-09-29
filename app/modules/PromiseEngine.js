// module.exports = {
//   isResolved: false,
//   fulfilledHandlers: [],
//   rejectedHandlers: [],
//   
//   resolve: function (isFulfilled, data) {
//     if (isFulfilled) {
//       console.log('Fulfilled handlers length: ' + this.fulfilledHandlers.length);
//       console.log('Data: ' + data);
//       for (var i = 0; i < this.fulfilledHandlers.length; i++) {
//         this.fulfilledHandlers[i](data);
//       }
//     } else {
//       for (var i = 0; i < this.rejectedHandlers.length; i++) {
//         this.rejectedHandlers[i](data);
//       }
//     }
//     this.isResolved = true;
//   },
//   
//   then: function (onFulfilled, onRejected) {
//     if (typeof(onFulfilled) == 'function') {
//       console.log('Fulfilled handler being added');
//       this.fulfilledHandlers.push(onFulfilled);
//     }
//     if (typeof(onRejected) == 'function') {
//       this.rejectedHandlers.push(onRejected);
//     }
//   },
//   
//   when: function (firstPromise, secondPromise, onBothResolved) {
//     var self = this;
//     self.callback = null;
//     var thisReturnObj = {
//       then: function (callback) {
//         if (typeof(callback) == 'function') {
//           self.callback = callback;
//         }
//       }
//     };
//     (function checkComplete () {
//       if (!firstPromise.isResolved || !secondPromise.isResolved) {
//         setTimeout(checkComplete, 400);
//       } else {
//         if (self.callback) {
//           self.callback();
//         }
//       }
//     })();
//     return thisReturnObj;
//   }
// };


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