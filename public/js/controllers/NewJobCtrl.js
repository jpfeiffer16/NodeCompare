/* global Papa */
/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .controller('NewJobCtrl', function($scope, $location, JobInterface) {
    $scope.newJob = {
      name: 'Test',
      description: 'Test',
      compares: [
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // },
        // {
        //   sourceUrl: 'https://www.google.com/',
        //   targetUrl: 'https://www.google.co.uk/'
        // }
      ]
    };
    
    $scope.parseCsv = function(csv) {
      Papa.parse(csv , {
            delimiter: ',',
            complete: function (csv) {
                console.log(csv);
                for (var i = 1; i < csv.data.length - 1; i++) {
                    $scope.newJob.compares.push({
                      sourceUrl: csv.data[i][0],
                      targetUrl: csv.data[i][1]
                    });
                }
                //Get the ui to update
                $scope.$apply();
            }
        });
    }
    
    $scope.addCompare = function() {
      $scope.newJob.compares.push({
        sourceUrl: '',
        targetUrl: ''
      });
    }
    
    $scope.removeCompare = function() {
      $scope.newJob.compares.pop();
    }
    
    
    $scope.submit = function() {
      JobInterface.saveJob($scope.newJob, function(data) {
         $location.path('/');
       });
    }
  });