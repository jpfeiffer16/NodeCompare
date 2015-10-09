/// <reference path="../../typings/angularjs/angular.d.ts" />
angular.module('app', ['ngRoute', 'ngAnimate'])
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
      .when('/about', {
        templateUrl: '/templates/about.html'
        // controller: 'JobDetailsCtrl'
      })
      .when('/settings', {
        templateUrl: '/templates/settings.html'
        // controller: 'JobDetailsCtrl'
      })
      .when('/details/:id', {
        templateUrl: '/templates/job-details.html'
        // controller: 'JobDetailsCtrl'
      })
      .when('/comparedetails/:id', {
        templateUrl: '/templates/compare-details.html'
        // controller: 'JobDetailsCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  });