/// <reference path="../../../typings/angularjs/angular.d.ts"/>
angular.module('app')
  .directive('compare', function() {
    return {
      link: function(scope, element, attrs) {
        var sourceImageId = attrs['sourceImageId'];
        var targetImageId = attrs['targetImageId'];
        
        scope.$parent.compare(sourceImageId, targetImageId, function(data) {
          element.attr('src', data);
        });        
      }
    }
  });