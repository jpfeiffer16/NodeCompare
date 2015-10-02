/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('JobListCtrl', function($scope, $location, JobInterface) {
    function refreshJobs() {
      JobInterface.getJobs(function(jobs) {
        $scope.jobs = jobs;
      });
    };
    // $scope.deleteJob = function(id) {
    //   JobInterface.deleteJob(id, function() {
    //     refreshJobs();
    //   });
    // };
    JobInterface.monitorJobs(8000, function(jobs) {
      $scope.jobs = jobs;
    });
    refreshJobs();
  });