/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .service('WebSockets', function() {
    // var websocket = null;
    
    function connect(callback) {
      //TODO: Disabled for right now since we have bigger problems to worry about
      
      // var thisSocket = io('//' + location.host);
      // websocket = thisSocket;
      // thisSocket.on('connect', function(socket) {
      //   if (typeof(callback) == 'function') {
      //     callback(socket);
      //   }
      // });
    };
    
    function getSocket(callback) {
      //TODO: Disabled for right now since we have bigger problems to worry about      
      
      // if (typeof(callback) == 'function') {
      //   callback(websocket);
      // }
    };
    
    return {
      connect: connect,
      getSocket: getSocket
    }
  });
  