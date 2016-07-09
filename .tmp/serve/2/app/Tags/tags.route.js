(function() {
  'use strict';

  angular
    .module( 'anApp' )
    .config( ['$stateProvider', routerConfig] );
    // .config(routerConfig);


  /** @ngInject */
  function routerConfig ($stateProvider) {
    $stateProvider
      .state('tags', {
        url:          '/tags',
        templateUrl:  'app/Tags/tags.tpl.html',
        controller:   'tagsCtrl',
        controllerAs: 'tC'
      })
      .state('tags.item', {
      //  url: '/:item',
        url:          '/{item}',
        template:  '<h4>Tags - item</h4>'
        // templateUrl:  'app/Posts/post.html',
        // controller:   'postCtrl',
        // controllerAs: 'pC'
      });
  }

})();
