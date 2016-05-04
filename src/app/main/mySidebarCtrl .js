(function() {
  'use strict';

  angular
    .module('anApp')
    .controller('mySidebarCtrl', mySidebarCtrl);

  function mySidebarCtrl($scope) {
    $scope.data = [ 
    	{ name: "Страницы", url: "pages" },
    	{ name: "Рубрики",  url: "topics" },
    	{ name: "Новости",  url: "news" }
    ];
  }
})();