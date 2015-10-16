


module.exports = function(maxProcesses, domain) {
  var phantom = require('phantom');
  var parsedUrls = [];
  var queuedUrls =[];
  var phantomProcesses = [];
  
  
  function parseUrl(page, url) {
    page.open(url, function(status) {
      // console.log('page ' + url + ' opened with status: ' + status);
      page.evaluate(function () {
        return document.getElementsByTagName('a');
      },
      function(result) {
        // console.log(result);
        for (var i = 0; i < result.length; i++) {
          if (result[i] != null) {
            addUrl(result[i].href);
            parseUrl(page, result[i].href);
          }
        }
      });
    });
  };
  
  function addUrl(url) {
    if (parsedUrls.indexOf(url) != -1) {
      console.log(url);
      parsedUrls.push(url);
    }
  };
  
  
  
  
  
  
  this.monitorSpider = function(callback) {
    console.log('Getting here');
    phantom.create(function(ph) {
      // parseUrl(page, domain);
      //Hacky
      
      // console.log('Phantom Process created');
      
      ph.createPage(function(page) {
        console.log('Page created');
        parseUrl(page, domain);
        // page.open(domain, function(status) {
        //   console.log('page ' + domain + ' opened with status: ' + status);
        //   page.evaluate(function () {
        //     return document.getElementsByTagName('a');
        //   },
        //   function(result) {
        //     console.log(result);
        //     
        //   });
        // });
      });
      
      
      // setTimeout(function () {
      //   ph.exit();
      //   if (typeof(callback) == 'function') {
      //     callback();
      //   }
      // }, 6000);
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