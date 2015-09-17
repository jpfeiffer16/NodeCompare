/// <reference path="../../../typings/angularjs/angular.d.ts" />

angular.module('app')
  .directive('parseCsv', function() {
    return {
      link: function(scope, element, attrs) {
        element.on('change', function (e) {
          scope.parseCsv(element[0].files[0]);
        });
      }
    }
  });