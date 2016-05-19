(function() {
  'use strict';

  angular
    .module('anApp')
    .directive('mySpinner', function () {
      return {
        restrict: "E",
        replace: true,
        scope: {},
        template: [
          "<div class='spinner'>",
            "<span us-spinner='{radius:8, width:10, length: 4}' spinner-on='true'></span>",
          "</div>"  
        ].join(""),

        link: function (scope, element, attrs) {  }        
      }
    });

})();