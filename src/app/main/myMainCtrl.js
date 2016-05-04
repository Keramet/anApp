(function() {
  'use strict';

  angular
    .module('anApp')
    .controller('myMainCtrl', myMainCtrl);

  function myMainCtrl($scope) {
    $scope.data = [ 
    	{ name: "Страницы", url: "pages" },
    	{ name: "Рубрики",  url: "topics" },
    	{ name: "Новости",  url: "news" }
    ];
  }
})();