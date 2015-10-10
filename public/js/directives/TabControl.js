/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('tabControl', function() {
    return {
      link: function(scope, element, attrs) {
        element.click(function(e) {
          var tab = $(attrs['target']);
          $('.tab-active').removeClass('tab-active');
          tab.addClass('tab-active');
        });
      }
    }
  });