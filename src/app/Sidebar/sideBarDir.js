(function() {
  'use strict';

  angular
    .module('anApp')
    .directive('mySidebar', function () {
      return function (scope, element, attrs) {
        var data = scope.sbCtrl['data'],
            el = angular.element("<ul>"),
            i, len;

        if ( angular.isArray(data) ) {
          for (i = 0, len = data.length; i < len; i++) {
            el.append( angular.element("<li>").text(data[i].name) );
          }
          element.append(el);
        } else { console.log("'data' не является массивом!"); }

      }
    });

})();