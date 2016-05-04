(function() {
  'use strict';

  angular
    .module('anApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    /*$stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      });*/

    $stateProvider
      .state('home', {
        url: '/',
        template: '<h1>Главная страница!</h1>',
      //  templateUrl: 'app/main/myMain.html',
      //  controller: 'myMainCtrl'
      //  controllerAs: 'main'
      })
      .state('pages', {
        url: '/pages',
        templateUrl: 'app/main/myPages.html',
        controller: function($scope) { $scope.pages = [ "P1", "P2", "P3", "P4" ]; }
      })
      .state('pages.item', {
        url: '/:item',
        templateUrl: 'app/main/page.html',
        controller: function($scope, $stateParams) {
          $scope.page = $stateParams.item; 
        }
      })
      .state('topics', {
        url: '/topics',
        template: '<div>Рубрики...</div>'
      })
      .state('news', {
        url: '/news',
        template: '<div>Новости</div>',
      //  controller: 'myMainCtrl',
      });

    
  }

})();
