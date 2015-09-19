/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('JobDetailsCtrl', function($scope, $location, $routeParams, JobInterface, ImageManipulator) {
    if ($routeParams.id != '' && $routeParams.id != undefined && $routeParams.id != null) {
      JobInterface.getJob($routeParams.id, function(job) {
        $scope.job = job;
      });
    } else {
      //Get outa here foo! We need an Id
      console.warn('Details require and Id dude! Get a clue....');
      $location.url('/');
    }
    
    
    
    $scope.compare = function (sourceImageId, targetImageId, callback) {
      // JobInterface.getImageData(function(sourceImageData) {
      //   JobInterface.getImageData(function(targetImageId) {
      //     
      //   });
      // });
      // return ImageManipulator.compareSync(sourceImageId, targetImageId);
      ImageManipulator.compare(sourceImageId, targetImageId, function(data) {
        if (typeof(callback) == 'function') {
          callback(data);
        }
      });
    }
    
    
    
    
  });