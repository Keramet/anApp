(function() {
  'use strict';

  angular
    .module('anApp')
    .config(routerConfig);


  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('comments', {
        url: '/comments',
        templateUrl:  'app/Comments/comments.tpl.html',
        controller:   'commentsCtrl',
        controllerAs: 'cC'
      });
  }

})();
