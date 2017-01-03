/*jslint browser: true, indent: 2 */
(function ($) {
  'use strict';
  $.fn.inviewport = function (options) {
    var settings = $.extend({
      'minPercentageInView' : 100,
      'standardClassName': 'in-view'
    }, options);
    this.each(function () {
      var $this = $(this),
        $win = $(window),
        changed = false,
        isVisible = function () {
          var c = settings.className || settings.standardClassName,
            min = (settings.threshold || settings.minPercentageInView) / 100,
            xMin = $this.width() * min,
            yMin = $this.height() * min,
            winPosX = $win.scrollLeft() + $win.width(),
            winPosY = $win.scrollTop() + $win.height(),
            elPosX = $this.offset().left + xMin,
            elPosY = $this.offset().top + yMin;
          if (winPosX > elPosX && winPosY > elPosY) {
            $this.addClass(c);
          }
        };
      $win.on('ready', isVisible())
        .on('resize scroll', function () {
          changed = true;
        })
      setInterval(function () {
        if (changed) {
          changed = false;
          isVisible();
        }
      }, 250);
    });
  };
}(jQuery));

$(window).load(function() {
    // remove loading screen
    $(".loader").fadeOut("slow");
    // animate headers
    $("#main-header").addClass("main-header-animated");
    var subs = document.getElementsByClassName("title-sub");
    for (var i = 0; i < subs.length; i++) {
        subs[i].classList.add("title-sub-animated");
        subs[i].classList.add("title-animated-" + (i + 1));
    }
});

// modals.js
// created by Diana Ruth

// for displaying project modals properly
$(".modal-fullscreen").on('show.bs.modal', function () {
    setTimeout( function() {
        $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
    }, 0);
});

$(".modal-fullscreen").on('hidden.bs.modal', function () {
    $(".modal-backdrop").addClass("modal-backdrop-fullscreen");
});

// Angular code for generating project links and modals
(function() {

    var app = angular.module('projects', []);

    app.controller('ModalsController', ['$scope', '$http', function($scope, $http) {

        $http.get('projects.json').then(function(projectData) {
            $scope.projects = projectData.data;
        });

        $scope.openModal = function(id) {
            $('#' + id).modal('show');
        }
    }]);

})();

$("#navbar-about").click(function() {
    $('html, body').animate({
        scrollTop: $("#about").offset().top - 50
    }, 1000);
});

$("#navbar-projects").click(function() {
    $('html, body').animate({
        scrollTop: $("#projects").offset().top - 50
    }, 1000);
});

$("#navbar-contact").click(function() {
    $('html, body').animate({
        scrollTop: $("#contact").offset().top - 50
    }, 1000);
});
