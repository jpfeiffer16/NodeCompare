/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('CompareDetailsCtrl', function($scope, $routeParams) {
    $scope.compareId = $routeParams.id;
    
    
  });