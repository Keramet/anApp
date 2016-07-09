(function() {
  'use strict';

  angular
    .module('anApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('posts', {
        url: '/posts',
        templateUrl:  'app/Posts/myPosts.html',
        controller:   'myPostsCtrl',
        controllerAs: 'mpCtrl'
      })
      .state('posts.item', {
      //  url: '/:item',
        url:          '/{item}',
        templateUrl:  'app/Posts/post.html',
        controller:   'postCtrl',
        controllerAs: 'pC'
      });
  }

})();
