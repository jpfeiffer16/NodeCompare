/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('misMatchPercentage', function(JobInterface) {
    return {
      link: function(scope, element, attrs) {
        JobInterface.getMisMatchPercentage(attrs['misMatchPercentage'], function(misMatchPercentage) {
          element.append(misMatchPercentage);
        })
      }
    };
  });