/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('NewJobCtrl', function($scope, $location, JobInterface) {
    $scope.newJob = {
      name: '',
      description: '',
      sourceUrl: '',
      targetUrl: ''
    };
    
    $scope.submit = function() {
      JobInterface.saveJob($scope.newJob.name, $scope.newJob.description,
         $scope.newJob.sourceUrl, $scope.newJob.targetUrl, function(data) {
           $location.path('/');
         });
    }
  });