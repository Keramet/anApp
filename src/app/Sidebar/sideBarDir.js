(function() {
  'use strict';

  angular
    .module('anApp')
    .directive('mySidebar', function ($firebaseObject, fbSvc) {
      return {
        restrict: "E",
        replace: true,
        scope: {},
        template: [ "<div class='mySidebar' ng-show='showSb()'>",
                      "<em>Директива <b>mySidebar</b></em>",
                      "<h4 ng-repeat='item in data' ui-sref-active='actv'>",
                        "<a ui-sref='{{item.url}}'>{{item.name}}</a>",
                      "</h4>",
                    "</div>" ].join(""),

        link: function (scope, element, attrs) {
          scope.data = [];
          fbSvc('sidebar').getData()
            .then( function (data) {
              angular.forEach( data, function (val, key) {
                scope.data.push( {"name": val, "url": key} ); 
              });
            });

          scope.showSb = function () { return scope.data.length > 0 }
        }        
      }
    });

})();