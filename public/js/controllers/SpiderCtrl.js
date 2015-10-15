/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('SpiderCtrl', function($scope, $http) {
    $scope.spiderDomain = '';
    
    $scope.runSpider = function() {
      $http.post('/runspider', {
        domain: $scope.spiderDomain
      }).then(function(result) {
        console.log(result.data);
      });
    };
  });