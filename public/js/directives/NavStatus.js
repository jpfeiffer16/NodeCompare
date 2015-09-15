/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('navStatus', function() {
    return {
      // restrict: 'E',
      link: function(scope, element, attrs) {
        element.on('click', function(e) {
          var $this = $(this);
          
          if(!$this.hasClass('.active')) {
            $('li[nav-status]').removeClass('active');
            $this.addClass('active');
          }
        });
      }
    }
  });