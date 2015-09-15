/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('resembleCompare', function(JobInterface) {
    return {
      link: function(scope, element, attrs) {
        if (attrs['sourceImage'] != '' && attrs['targetImage'] != '') {
          var sourceImage = $(attrs['sourceImage']);
          var targetImage = $(attrs['targetImage']);
          
          JobInterface.getImageData(sourceImage, function(data) {
            console.log(data);
          });
          
        }
      }
    }
  });