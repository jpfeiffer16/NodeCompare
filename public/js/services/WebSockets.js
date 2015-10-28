/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .service('WebSockets', function() {
    var socket = null;
    
    function connect(callback) {
      var socket = io.connect('//' + location.host);
      socket.on('connect', function(socket) {
        if (typeof(callback) == 'function') {
          socket = socket;
          callback(socket);
        }
      });
    };
    
    function getSocket() {
      return socket;
    };
    
    return {
      connect: connect
    }
  });
  