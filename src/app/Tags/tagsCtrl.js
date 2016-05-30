(function() {
  'use strict';


  angular
    .module('anApp')
    .controller('tagsCtrl', [ '$timeout', 'fbSvc', tagsCtrl ]);


/** @ngInject */
  function tagsCtrl ($timeout, fbSvc) {
    var self     = this,
        tags_url = 'tags',
        nt       = {};    // new Tag

    refreshData(); 
    this.showSpinner = false;
    this.showAddTag  = false;
   

    this.clickAddTag = function () {
      this.showAddTag  = true;
      $timeout( function () {
        angular.element("input[name=ntUrl]").focus();
      }, 0 );  
    }

    this.clearF = function () { this.f = ""; }

    this.addTag = function () {
      var time = 3000,  // мс
          tag = {
            "name": this.ntName || "new name",
            "desc": this.ntDesc || "new description"
          };
      
      this.showSpinner = true;

      $timeout( function () {
        console.log("Прошло ", time/1000, " сек.");
        // console.log("tag: ", tag);
        self.showSpinner = false;
        return fbSvc( tags_url ).saveData( self.ntUrl, tag );
      }, time)
        .then( function () {
          self.ntUrl  = "";
          self.ntName = "";
          self.ntDesc = "";
          self.showAddTag  = false;
          return refreshData(); //fbSvc( tags_url ).getData();
        })
        .then( function (fbData) {
          console.log( "Данные по категориям из FB: ",  fbData);
        });
    }

    this.uTag = function (index) {  //  реализовать через update
      this.showAddTag  = true;
      this.ntUrl  = this.data[ index ].id;
      this.ntName = this.data[ index ].name;
      this.ntDesc = this.data[ index ].desc;
    }

    this.dTag = function (index) {
      var id = this.data[ index ].id;

      fbSvc( tags_url ).saveData( id, null )
        .then( function () {
          console.log("Категория удалена.");
          refreshData();
        });
    }


    function formatData (fbData) {  // преобразуем данные в массив для использования фильтра
      var res = [];

      angular.forEach( fbData, function (val, key) {
        res.push({ "id"  : key,
                   "name": val.name,
                   "desc": val.desc  });
      });
      return res;
    }

    function refreshData () {
      return fbSvc( tags_url ).getData()
        .then( function (fbData) {
          self.data = formatData( fbData );
          return fbData;
        });
    }

  }// end of  tagsCtrl


})();