/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('slideOutNav', function() {
    return {
      link: function(scope, element, attrs) {
        element.on('click', function(e) {
          $('.slide-out-nav').addClass('active');
        });
      }
    }
  });