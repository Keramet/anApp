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
      // .state('config', {
      //   url: '/config',
      //   templateUrl: 'app/Config/config.tpl.html'
      // //  controller: 'myMainCtrl',
      // })
      // .state('posts', {
      //   url: '/posts',
      //   template: '<div>Записи (посты)</div>',
      // //  controller: 'myMainCtrl',
      // })
      .state('tags', {
        url: '/tags',
        template: '<div>Категории</div>',
      //  controller: 'myMainCtrl',
      })
      .state('comments', {
        url: '/comments',
        template: '<div>Комментарии</div>',
      //  controller: 'myMainCtrl',
      })  ;

    
  }

})();
