module.exports = function(maxProcesses, domain) {
  var phantom = require('phantom');
  var parsedUrls = [];
  var queuedUrls =[];
  var phantomProcesses = [];
  
  
  function parseUrl(page, url) {
    // console.log(page);
    page.open(url, function(status) {
      // console.log('page ' + url + ' opened with status: ' + status);
      page.evaluate(function () {
        return document.getElementsByTagName('a');
      },
      function(result) {
        // console.log(result.length);
        for (var i = 0; i < result.length; i++) {
          if (result[i] != null) {
            console.log(result[i].href);
            addUrl(result[i].href);
          }
        }
        var index = 0;
        for (var i = 0; i< result.length; i++) {
          if (result[i] != url && result[i] != null) {
            index = i;
            break;
          }
        }
        parseUrl(page, result[index].href);
      });
    });
  };
  
  function addUrl(url) {
    console.log(url);
    if (parsedUrls.indexOf(url) == -1) {
      // console.log(url);
      parsedUrls.push(url);
    }
  };
  
  
  
  
  this.monitorSpider = function(callback) {
    console.log('Getting here');
    
    
    for (var i = 0; i < maxProcesses; i++) {
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
      },
      {
        dnodeOpts: {
          weak: false
        }
      });
      
      
    }
    
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