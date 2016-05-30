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
          "<div class='mySidebar1 panel panel-info' ng-show='showSb()'>",
            "<div class='panel-heading'><em>Директива <b>mySidebar</b></em></div>",
            "<div class='panel-body'>",
              "<h4 ng-repeat='item in data' ui-sref-active='actv'>",
                "<a ui-sref='{{item.url}}'>",
                  "<span class='glyphicon {{item.glyph}}' aria-hidden='true'></span>&ensp;{{item.name}}",
                "</a>",
              "</h4>",
            "</div>",  
          "</div>" 
        ].join(""),

        link: function (scope, element, attrs) {
          scope.data = [];
          fbSvc('sidebar').getData()
            .then( function (data) {
              angular.forEach( data, function (val, key) {  // надо ли преобразовывать или сразу scope.data = data ?
                scope.data.push( {"name": val.name, "url": key, "glyph": val.glyph} ); 
              });
            });

          scope.showSb = function () { return scope.data.length > 0 }
        }        
      }
    });

})();


// <div class="panel panel-info">
//  <div class="panel-heading">Панель с классом panel-info</div>
//  <div class="panel-body">Текст</div>
//  </div>