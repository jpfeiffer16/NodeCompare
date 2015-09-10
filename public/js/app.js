/// <reference path="../../typings/angularjs/angular.d.ts" />
angular.module('app', ['ngRoute'])
  .config(function ($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/templates/job-list.html'
        // controller: 'JobListCtrl'
      })
      .when('/new', {
        templateUrl: '/templates/new-job.html'
        // controller: 'NewJobCtrl'
      })
      .when('/details/:id', {
        templateUrl: '/templates/job-details.html'
        // controller: 'JobDetailsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });
  // .controller('JobListCtrl', function($scope) {
  //   this.input = '';
  // })
  // .controller('JobDetailsCtrl', function($scope) {
  //   this.input = '';
  // })
  // .controller('NewJobCtrl', function($scope) {
  //   this.input = '';
  // })