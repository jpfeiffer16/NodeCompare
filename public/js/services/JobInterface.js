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
            callback(response.data);
          }
        });
      };
      function saveJob(name, description, sourceUrl, targetUrl, callback) {
        $http.post('/newJob', { name: name, description: description, sourceUrl: sourceUrl, targetUrl: targetUrl }).then(function(response) {
          if (typeof(callback) == 'function') {
            callback(response.data);
          }
        });
      };
      function deleteJob(id, callback) {
        $http.post('/deleteJob/' + id).then(function(response) {
          if (typeof(callback) == 'function') {
            callback(response.data);
          }
        });
      };
      function getImageData(id, callback) {
        $http.get('/imageprovider/' + id).then(function(response) {
          if (typeof(callback) == 'function') {
            callback(response.data);
          }
        });
      }
      return {
        saveJob: saveJob,
        getJobs: getJobs,
        getJob: getJob,
        deleteJob: deleteJob,
        getImageData: getImageData
      };
    }();
    return service;
  });