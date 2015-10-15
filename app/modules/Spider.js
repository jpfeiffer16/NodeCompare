module.exports = (function() {
  var phantom = require('phantom'),
      Promise = require('./PromiseEngine.js'),
      SettingsProvider = require('./SettingsProvider.js'),
      SpiderMonitor = require('./SpiderMonitor.js');
  
  
  var runspider = function(domain) {
    var promise = new Promise();
    
    //TODO: Code goes here. Resolve promise when the spider is done.
    
    SettingsProvider.getSetting('maxSpiderProcesses', function(maxProcesses) {
      var spiderMonitor = new SpiderMonitor(maxProcesses, domain);
      spiderMonitor.monitorSpider(function() {
        promise.resolve(true);
      });
    });
    
    
    
    
    
    
    
    
    
    return promise;
  }
  
  
  
  
  return {
    runspider: runspider
  };
})();