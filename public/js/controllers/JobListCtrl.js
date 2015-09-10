/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('JobListCtrl', function($scope, $location, JobInterface) {
    JobInterface.getJobs(function(jobs) {
      console.log(jobs);
      $scope.jobs = jobs;
    });
  });