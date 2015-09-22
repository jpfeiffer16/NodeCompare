module.exports = {
  
  
  
  isResolved: false,
  
  fulfilledHandlers: [],
  
  rejectedHandlers: [],
  
  resolve: function (isFulfilled, data) {
    if (isFulfilled) {
      for (var i = 0; i < this.fulfilledHandlers.length; i++) {
        this.fulfilledHandlers[i](data);
      }
    } else {
      for (var i = 0; i < this.rejectedHandlers.length; i++) {
        this.rejectedHandlers[i](data);
      }
    }
    this.isResolved = true;
  },
  
  then: function (onFulfilled, onRejected) {
    if (typeof(onFulfilled) == 'function') {
      this.fulfilledHandlers.push(onFulfilled);
    }
    if (typeof(onRejected) == 'function') {
      this.fulfilledHandlers.push(onRejected);
    }
  },
  
  when: function (firstPromise, secondPromise, onBothResolved) {
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