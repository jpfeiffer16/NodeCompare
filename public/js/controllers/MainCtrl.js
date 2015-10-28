/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('MainCtrl', function($location, $scope, WebSockets) {
    $scope.menuItems = [
      {name: 'Home', location: '/', icon: 'glyphicon glyphicon-home'},
      {name: 'New', location: '/new', icon: 'glyphicon glyphicon-plus'},
      {name: 'Settings', location: '/settings', icon: 'glyphicon glyphicon-cog'},
      {name: 'About', location: '/about', icon: 'glyphicon glyphicon-comment'},
      {name: 'Spiders', location: '/spiders', icon: 'glyphicon glyphicon-cloud'}
    ];
    WebSockets.connect(function(socket) {
      console.log('Connected');
    });
  });