(function() {
  'use strict';

angular
	.module('anApp')
    .controller('sbConfigCtrl', [ '$stateParams', '$scope', 'fbSvc', sbConfigCtrl ]);

      
      function sbConfigCtrl ($stateParams, $scope, fbSvc) {
        var self = this;

        this.sb = {};

        fbSvc('sidebar').getData()
          .then( function (data) {
            self.sbData = data;
            self.sbShow = true;
            // console.log("Данные сайдбара: ", self.sbData);
          }); 

        this.uSb = function (url) {
          this.sb.url   = url;
          this.sb.name  = this.sbData[url].name;
          this.sb.glyph = this.sbData[url].glyph;
        }

        this.dSb = function (url) {
          fbSvc('sidebar').saveData(url, null)
            .then( function () {
              console.log("Данные удалены.");
            });
        }

        this.saveSb = function () {
          var data = {};
          data.name = this.sb.name;
          data.glyph = this.sb.glyph || "";

          fbSvc('sidebar').saveData(this.sb.url, data)
            .then( function () {
              self.sb.url  = "";
              self.sb.name = "";
              self.sb.glyph = "";
              $scope.$apply();  //   подумать, как по-другому (без инджекта скоупа)? Может, $scope.sb.url = ""?
              console.log("Данные сайдбара сохранены!"); 
            });
        }

      }

})();