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
      function saveJob(job, callback) {
        $http.post('/newJob', job).then(function(response) {
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
        $http.get('/imageproviderbase64/' + id).then(function(response) {
          if (typeof(callback) == 'function') {
            callback(response.data);
          }
        });
      };
      function getMisMatchPercentage(id, callback) {
        $http.post('/getcomparemismatch/' + id).then(function(response) {
          if (typeof(callback) == 'function') {
            callback(response.data);
          }
        });
      };
      function getCommpareSource(sourceId, targetId, callback) {
        $http.post('getcomparesource', {
          sourceId: sourceId,
          targetId: targetId
        }).then(function (result) {
          if (typeof(callback) == 'function') {
            callback(result);
          }
        });
      };
      var monitorJobs = function(intervarl, callback) {
        var self = this;
        if (typeof(callback) == 'function') {
          self.callback = callback;
        }
        setInterval(function() {
          getJobs(function(jobs) {
            if (self.callback) {
              self.callback(jobs);
            }
          });
        }, intervarl);
      }
      return {
        saveJob: saveJob,
        getJobs: getJobs,
        getJob: getJob,
        getMisMatchPercentage: getMisMatchPercentage,
        getCommpareSource: getCommpareSource,
        monitorJobs: monitorJobs,
        deleteJob: deleteJob,
        getImageData: getImageData
      };
    }();
    return service;
  });