(function() {
  'use strict';

  angular
    .module('anApp')
    .controller('sidebarCtrl', [ '$firebaseObject', '$firebaseArray', 'fbSvc', sidebarCtrl ]);

  function sidebarCtrl($firebaseObject, $firebaseArray, fbSvc) {

    this.data = [ 
    	{ name: "Посты", url: "posts" },
    	{ name: "Категории!",  url: "tags" },
    	{ name: "Комментарии...", url: "comments" }
    ];

    var sbRef = new Firebase("https://my-anapp.firebaseio.com/sidebar/"),
        sbObj = $firebaseObject( sbRef );

    this.saveSb = function () {
      sbRef.child(this.url).set(this.val)
        .then( function() {
          console.log("Данные сохранены!");
        }, function () {
          console.log("Ошибка сохранения...");
        });
 
      this.val = "";
      this.url = "";
    }

    this.getSb = function () { 
      fbSvc('sidebar').getData()
        .then( function (data) {
          console.log("Данные сайдбара: ", data);
        });  
      // console.log("Данные сайдбара: ", fbSvc('sidebar').data);   
      // sbObj.$loaded()
      //   .then( function (data) {
      //     angular.forEach(data, function (val, key) {
      //       console.log(key + " : " + val);
      //     });
      //   })
      //   .catch( function (e) {
      //     console.dir(e);
      //   });
    }

  } 
})();





