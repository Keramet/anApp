(function() {
  'use strict';

  angular
    .module('anApp')
    .directive('panelDir', function () {
      return {
        restrict: "E",
        replace: true,
        // scope: {},
        templateUrl: "app/main/panelDir/panelDir.tpl.html",
        link: function (scope, element, attrs) {}
      
      }
    });

})();