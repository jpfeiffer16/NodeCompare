/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('MainCtrl', function($location, $scope) {
    $scope.menuItems = [
      {name: 'Home', location: '/'},
      {name: 'New', location: '/new'},
      {name: 'Settings', location: '/settings'},
      {name: 'About', location: '/about'}      
    ];
  });