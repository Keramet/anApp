(function() {
  'use strict';

  angular
    .module('anApp')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('config', {
        url: '/config',
        views: {
          '': {
            templateUrl:  'app/Config/config.tpl.html',
            controller:   'configCtrl',
            controllerAs: 'confC' 
          },
          'sbConfig@config': {
            templateUrl: 'app/Config/sbConfig.tpl.html',
            controller:   'sbConfigCtrl',
            controllerAs: 'sbConfC'   
          },
          'postsConfig@config': {
            template: '<h3><i>Настройка постов</i></h3>'
          },
          'tagsConfig@config': {
            template: '<h3><i>Настройка категорий</i></h3>'
          },
          'commentsConfig@config': {
            template: '<h3><i>Настройка комментариев</i></h3>'
          }
        }
      });

  }

})();








