(function() {
  'use strict';

angular
	.module('anApp')
  .controller('sbConfigCtrl', [ '$scope', 'fbSvc', sbConfigCtrl ]);

      
      function sbConfigCtrl ($scope, fbSvc) {
        var self = this;

        self.showForm = false;
        self.sb = {};

        fbSvc('sidebar').getData()
          .then( function (data) {
            self.sbData = data;
            self.sbShow = true;
            // console.log("Данные сайдбара: ", self.sbData);
          }); 

        self.uSb = function (url) {
          self.showForm = true;
          self.sb.url   = url;
          self.sb.name  = self.sbData[url].name;
          self.sb.glyph = self.sbData[url].glyph;
        }

        self.dSb = function (url) {
          fbSvc('sidebar').saveData(url, null)
            .then( function () {console.log("Данные удалены.");} );
        }

        self.saveSb = function () {
          var data = {};
          data.name = self.sb.name;
          data.glyph = self.sb.glyph || "";

          fbSvc('sidebar').saveData(self.sb.url, data)
            .then( function () {
              self.sb.url  = "";
              self.sb.name = "";
              self.sb.glyph = "";
              self.showForm = false;
              $scope.$apply();  //   подумать, как по-другому (без инджекта скоупа)? Может, $scope.sb.url = ""?
              console.log("Данные сайдбара сохранены!"); 
            });
        }

      }

})();