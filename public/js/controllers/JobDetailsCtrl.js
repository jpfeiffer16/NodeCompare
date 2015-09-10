/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('JobDetailsCtrl', function($scope, $location, $routeParams, JobInterface) {
    if ($routeParams.id != '' && $routeParams.id != undefined && $routeParams.id != null) {
      JobInterface.getJob($routeParams.id, function(job) {
        $scope.job = job;
      });
    } else {
      //TODO: Define this
    }
    
  });