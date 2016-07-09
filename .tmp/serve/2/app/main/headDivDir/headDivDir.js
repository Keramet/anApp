(function() {
  'use strict';

  angular
    .module('anApp')
    .directive('headDivDir', function () {
      return {
        restrict: "E",
        replace: true,
        scope: {  caption : "@",
                  filter  : "=",
                  show    : "=",  
                  clickAdd: "&"  },
        templateUrl: "app/main/headDivDir/headDivDir.tpl.html",
        link: function (scope, element, attrs) {
          scope.clearF   = function () { scope.filter = ""; }
          
          // scope.clickAdd = function () { 
          //   scope.show = !scope.show;
          // }

        }
      
      }
    });

})();