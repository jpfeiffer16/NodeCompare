/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('sourceCompare', function(JobInterface) {
    return {
      link: function(scope, element, attrs) {
        JobInterface.getCommpareSource(attrs['sourceId'], attrs['targetId'], function(result) {
          var sourceSource = result.data.source;
          var targetSource = result.data.target;
          element.prettyTextDiff({
            originalContent: sourceSource,
            changedContent: targetSource,
            cleanup: true,
            diffContainer: '.diff'
          });
        });
      }
    }
  });