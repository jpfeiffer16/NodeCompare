/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('spinnerMorph', function() {
    return {
      link: function(scope, element, attrs) {
        element.on('click', function(e){
          var $this = $(this);
          //TODO: needs to be finished out
          
          var spinnerGifPath = '../../img/2.GIF';
          
          $this.empty();
          $this.append('<img src="' + spinnerGifPath + '" style="width: ' + attrs['spinnerMorph'] + 'px;"/>');
          
          
        });
      }
    }
  });