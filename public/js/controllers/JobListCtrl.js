/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
.controller('JobListCtrl', function($scope, $location, JobInterface) {
  // $scope.jobs = [
  //   {name: 'Test', description: 'Test'},
  //   {name: 'Test2', description: 'Test2'}
  // ];
  
  JobInterface.getJobs(function(jobs) {
    console.log(jobs);
    $scope.jobs = jobs;
  });
  // console.log($scope.jobs);
  
});