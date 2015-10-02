/// <reference path="../../../typings/tsd.d.ts" />
angular.module('app')
  .directive('version', function($http) {
    return {
      link: function(scope, element, attrs) {
        $http.post('/getversion').then(function(response) {
          element.text(response.data);
        }, function(err) {
          element.text('?');
        });
      }
    }
  });