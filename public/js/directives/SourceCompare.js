/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('sourceCompare', function(JobInterface) {
    return {
      link: function(scope, element, attrs) {
        JobInterface.getCommpareSource(attrs['sourceId'], attrs['targetId'], function(result) {
          function htmlEncode(value) {
            var encodedValue = $('<div />').text(value).html();
            return encodedValue;
          }
          var sourceSource = htmlEncode(result.data.source);
          var targetSource = htmlEncode(result.data.target);
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