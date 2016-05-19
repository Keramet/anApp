(function() {
  'use strict';

  angular
    .module('anApp')
    .directive('mySidebar', function ($firebaseObject) {
      var sbRef = new Firebase("https://my-anapp.firebaseio.com/sidebar/"),
          sbObj = $firebaseObject( sbRef );

      return {
        restrict: "E",
        replace: true,
        scope: {},
        template: [ "<div class='mySidebar' ng-show='show'>",
                      "<em>Директива <b>mySidebar</b></em>",
                      "<h4 ng-repeat='item in data' ui-sref-active='actv'>",
                        "<a ui-sref='{{item.url}}'>{{item.name}}</a>",
                      "</h4>",
                    "</div>" ].join(""),

        link: function (scope, element, attrs) {
          scope.data = [];

          sbObj.$loaded()
            .then( function (data) {
              angular.forEach(data, function (val, key) {
                scope.data.push( {"name": val, "url": key} ); 
              });
              scope.show = true;
            })
            .catch( function (e) { console.dir(e); });
        }        
      }
    });

})();