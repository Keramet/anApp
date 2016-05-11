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
