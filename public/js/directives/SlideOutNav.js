/// <reference path="../../../typings/angularjs/angular.d.ts" />
angular.module('app')
  .directive('slideOutNav', function() {
    function showNav() {
      var slideOutNav = $('.slide-out-nav');
      var cover = $('#cover');
      slideOutNav.addClass('active');
      cover.fadeIn();
      $('#filter-box').focus();
      $('#filter-box').keypress(function(e) {
        if (e.keyCode == 13) {
          var list = $('.slide-out-nav ul a');
          if (list.length != 0) {
            list.eq(0).click();
            //Temp
            hideNav();
          }
        }
      });
      
      cover.on('click', function(e) {
        hideNav();
        cover.off('click');
      });
      slideOutNav.find('a').on('click', function(e) {
        hideNav();
        slideOutNav.find('a').off('click');
      });
    }
    
    function hideNav() {
      var slideOutNav = $('.slide-out-nav');
      var cover = $('#cover');
      var filterBox = $('#filter-box');
      // cover.hide();
      cover.fadeOut();
      slideOutNav.removeClass('active');
      
      filterBox.blur().off('keypress');
    }
    
    return {
      link: function(scope, element, attrs) {
        $(document).keydown(function (e) {
          if (e.keyCode == 113) {
            showNav();
          }
          if (e.keyCode == 27) {
            hideNav();
          }
        });
        element.on('click', function(e) {
          var slideOutNav = $('.slide-out-nav');
          var cover = $('#cover');
          
          showNav();
          e.stopPropagation();
        });
      }
    }
  });