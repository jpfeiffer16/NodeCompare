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


module.exports = function() {
  //TODO: rewrite
}