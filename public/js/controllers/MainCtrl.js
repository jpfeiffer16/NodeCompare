/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('MainCtrl', function($location, $scope) {
    $scope.menuItems = [
      {name: 'Job List', location: '/'},
      {name: 'New Job', location: '/new'},
      {name: 'About', location: '/about'}      
    ];
  });