function parseUrl(ph) {
  
}


module.exports = function(maxProcesses, domain) {
  var phantom = require('phantom');
  var parsedUrls = [];
  var queuedUrls =[];
  var phantomProcesses = [];
  
  //Spin up the phantom processes
  
  for (var i = 0; i < maxProcesses; i++) {
    phantom.create(function(ph) {
      phantomProcesses.push(ph);
    });
  }
  setTimeout(function() {
    var stopProcessing = false;
    while (!stopProcessing) {
      
    }
  }, 600);
}