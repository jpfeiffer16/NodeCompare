/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('NewJobCtrl', function($scope, $location) {
    $scope.newJob = {
      name: '',
      description: '',
      sourceUrl: '',
      targetUrl: ''
    };
    
    $scope.submit = function() {
      console.log('Hi');
    }
    
    
  });