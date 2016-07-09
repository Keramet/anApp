(function() {
  'use strict';

  angular
    .module('anApp')
    .directive('mySidebar', function ($firebaseObject, fbSvc) {
      return {
        restrict: "E",
        replace: true,
        scope: {},
        template: [
          "<div class='mySidebar1 panel panel-info' ng-show='show'>",
            "<div class='panel-heading'><em>Основные разделы</em></div>",
            "<div class='panel-body'>",
              "<h4 ng-repeat='(key, val) in data' ui-sref-active='actv'>",
                "<a ui-sref='{{key}}'>",
                  "<span class='glyphicon {{val.glyph}}' aria-hidden='true'></span>&ensp;{{val.name}}",
                "</a>",
              "</h4>",
            "</div>",  
          "</div>" 
        ].join(""),

        link: function (scope, element, attrs) {
          fbSvc('sidebar').getData()
            .then( function (data) {
              scope.data = data;
              scope.show = true;
            });
        }        
      }
    });

})();

