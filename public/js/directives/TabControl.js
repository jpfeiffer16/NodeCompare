/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('tabControl', function() {
    return {
      link: function(scope, element, attrs) {
        element.click(function(e) {
          var tab = $(attrs['target']);
          $('.tab-control').removeClass('active');
          $(this).addClass('active');
          $('.tab-active').removeClass('tab-active');
          tab.addClass('tab-active');
        });
      }
    }
  });