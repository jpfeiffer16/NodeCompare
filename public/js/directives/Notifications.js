/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('notifications', function(WebSockets) {
    return {
      link: function(scope, element, attrs) {
        setTimeout(function() {
          WebSockets.getSocket(function(socket) {
            socket.on('notification', function(message) {
              element.empty();
              element.append('<p>Notification: ' + message + '</p>');
              element.fadeIn().fadeOut(5000);
            });
          });
        }, 3000);
      }
    }
  });