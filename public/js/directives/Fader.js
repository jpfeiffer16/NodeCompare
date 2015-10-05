/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('fader', function () {
    return {
      link: function (scope, element, attrs) {
        element.hide();
        var varToWatch = attrs['fader'];
        if (varToWatch != '') {
          scope.$watch(varToWatch, function(newValue, oldValue) {
            if (newValue != undefined) {
              element.text(newValue);
              element.fadeIn().fadeOut(3000);
            }
          });
        }
      }
    }
  });