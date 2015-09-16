/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('slideOutNav', function() {
    
    
    function showNav() {
      var slideOutNav = $('.slide-out-nav');
      var cover = $('#cover');
      slideOutNav.addClass('active');
      
      // cover.show();
      cover.fadeIn();
    }
    
    
    function hideNav() {
      var slideOutNav = $('.slide-out-nav');
      var cover = $('#cover');
      // cover.hide();
      cover.fadeOut();
      slideOutNav.removeClass('active');
    }
    
    
    
    return {
      link: function(scope, element, attrs) {
        element.on('click', function(e) {
          var slideOutNav = $('.slide-out-nav');
          var cover = $('#cover');
          
          showNav();
          e.stopPropagation();
          
          
          cover.on('click', function(e) {
            hideNav();
            cover.off('click');
          });
          slideOutNav.find('a').on('click', function(e) {
            hideNav();
            slideOutNav.find('a').off('click');
          });
        });
      }
    }
  });