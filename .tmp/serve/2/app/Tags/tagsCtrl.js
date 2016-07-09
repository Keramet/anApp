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
    self.showSpinner = false;
    self.showAddTag  = false;
   

    self.clickAddTag = function () {
      self.showAddTag = !self.showAddTag;
      $timeout( function () {
        angular.element("input[name=ntUrl]").focus();
      }, 0 );  
    }

    self.clearF = function () { self.f = ""; }

    self.addTag = function () {
      var time = 3000,  // мс
          tag = {
            "name": self.ntName || "new name",
            "desc": self.ntDesc || "new description"
          };
      
      self.showSpinner = true;

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

    self.uTag = function (index) {  //  реализовать через update
      self.showAddTag  = true;
      self.ntUrl  = self.data[ index ].id;
      self.ntName = self.data[ index ].name;
      self.ntDesc = self.data[ index ].desc;
    }

    self.dTag = function (index) {
      var id = self.data[ index ].id;

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