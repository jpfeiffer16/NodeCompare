


module.exports = function(maxProcesses, domain) {
  var phantom = require('phantom');
  var parsedUrls = [];
  var queuedUrls =[];
  var phantomProcesses = [];
  
  
  function parseUrl(ph, url) {
    ph.createPage(function(page) {
      page.open(url, function(status) {
        page.evaluate(function () {
          document.getElementsByTagName('a');
        },
        function(result) {
          console.log(result);
          
        });
      })
    });
  };
  
  function addUrl(url) {
    if (parsedUrls.indexOf(url) != -1) {
      parsedUrls.push(url);
    }
  };
  
  
  
  
  
  
  this.monitorSpider = function(callback) {
    phantom.create(function(ph) {
      parseUrl(ph, domain);
      //Hacky
      setTimeout(function () {
        ph.exit();
        if (typeof(callback) == 'function') {
          callback();
        }
      }, 6000);
    },
    {
      dnodeOpts: {
        weak: false
      }
    });
  };
  
  
  
  
  //Spin up the phantom processes
  
  // for (var i = 0; i < maxProcesses; i++) {
  //   phantom.create(function(ph) {
  //     phantomProcesses.push(ph);
  //   });
  // }
  // setTimeout(function() {
  //   for (var i = 0; i < phantomProcesses.length; i++){
  //     process
  //   }
  // }, 600);
}