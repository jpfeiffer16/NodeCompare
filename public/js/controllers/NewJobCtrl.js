/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('NewJobCtrl', function($scope, $location, JobInterface) {
    $scope.newJob = {
      name: '',
      description: '',
      compares: [
        {
          sourceUrl: '',
          targetUrl: ''
        }
      ]
    };
    
    
    $scope.addJob = function() {
      $scope.newJob.compares.push({
        sourceUrl: '',
        targetUrl: ''
      });
    }
    
    $scope.removeJob = function() {
      $scope.newJob.compares.pop();
    }
    
    
    $scope.submit = function() {
      JobInterface.saveJob($scope.newJob, function(data) {
           $location.path('/');
         });
    }
  });