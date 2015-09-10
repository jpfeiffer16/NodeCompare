/// <reference path="../../../typings/angularjs/angular.d.ts" />

angular.module('app')
  .service('JobInterface', function($http) {
    var service = function() {
      function getJobs(callback) {
        $http.post('/getJobs').then(function(response) {
          console.log(response.data);
          if (typeof(callback) == 'function') {
            callback(response.data);
          }
        });
      };
      function getJob(id, callback) {
        $http.post('/getJob/' + id).then(function(response) {
          if (typeof(callback) == 'function') {
            console.log('Job:', response.data);
            callback(response.data);
          }
        });
      }
      return {
        getJobs: getJobs,
        getJob: getJob
      };
      // return {
      //   getJobs: function() {
      //     console.log('getJobs being called');
      //   }
      // }
    }();
    
    
    return service;
  });