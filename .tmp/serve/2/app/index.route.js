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
        url:          '/',
        controller:   'mainPageCtrl',
        controllerAs: 'mpC', 
        template: [ 
          '<h1>Главная страница!</h1>',
          '<div class="row stylish-panel" ng-if="mpC.showPanel">',
            '<panel-dir ng-repeat="(key, value) in mpC.data"></panel-dir>',
          '</div>' ].join("")                
      })
      .state('topics', {
        url: '/topics',
        template: '<div>Рубрики...</div>'
      });


    
  }

})();
