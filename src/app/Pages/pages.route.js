(function() {
  'use strict';

  angular
    .module('anApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('pages', {
        url: '/pages',
        templateUrl: 'app/Pages/myPages.html',
        controller: 'myPagesCtrl',
        controllerAs: 'mpCtrl'
      })
      .state('pages.item', {
      //  url: '/:item',
        url: '/{item}',
        templateUrl: 'app/Pages/page.html',
        controller: function($scope, $stateParams) {
          $scope.page = $stateParams.item; 
        }
      });
  }

})();
