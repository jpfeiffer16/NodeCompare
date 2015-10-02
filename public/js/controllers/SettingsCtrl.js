/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('SettingsCtrl', function($scope, $http) {
    $http.post('/getsettings').then(function(result) {
      $scope.settings = result.data;
    });
    
    $scope.saveSettings = function() {
      $http.post('/savesettings', $scope.settings).then(function(result) {
        console.log(result);
      });
    };
  });