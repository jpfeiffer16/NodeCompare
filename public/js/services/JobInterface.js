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
        $http.post().then(function(response) {
          if (typeof(callback) == 'function') {
            callback(response.data);
          }
        });
      }
      return {
        getJobs: getJobs
      };
      // return {
      //   getJobs: function() {
      //     console.log('getJobs being called');
      //   }
      // }
    }();
    
    
    return service;
  })