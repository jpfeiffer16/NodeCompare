/// <reference path="../../typings/tsd.d.ts" />
var QueuedCompare = require('../models/queuedCompare.js');


module.exports = function (maxCompares, checkInterval) {
  setInterval(function() {
    //Here we check for queued compares
    QueuedCompare.find(function(err, result) {
      
    });
    
  }, checkInterval);
};