(function() {
  'use strict';

  angular
    .module('anApp')
    .controller('sidebarCtrl', sidebarCtrl);

  function sidebarCtrl() {
    this.data = [ 
    	{ name: "Страницы", url: "pages" },
    	{ name: "Рубрики",  url: "topics" },
    	{ name: "Новости!",  url: "news" }
    ];

     
  }
})();