(function() {
  'use strict';

  angular
    .module('anApp')
    .directive('headDivDir', function () {
      return {
        restrict: "E",
        replace: true,
        scope: false,
        templateUrl: "app/main/headDivDir/headDivDir.tpl.html",
        link: function (scope, element, attrs) {
          console.log("scope: ", scope);
          console.log("scope.$parent: ", scope.$parent);
          scope.clearF = function () { scope.f = ""; }

          // scope.clickAdd = function () { 
          //   console.log("f: ", scope.f);
          //   console.log("posts: ", scope.posts);
          // }
        }
      
      }
    });

})();