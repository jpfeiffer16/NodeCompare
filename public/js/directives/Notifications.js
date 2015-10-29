/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('notifications', function(WebSockets) {
    return {
      link: function(scope, element, attrs) {
        setTimeout(function() {
          console.log('Notifications initializing');
          element.hide();
          WebSockets.getSocket(function(socket) {
            socket.on('notification', function(message) {
              console.log('Notification: ', message);
            });
          });
        }, 3000);
      }
    }
  });