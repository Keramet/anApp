/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('anApp')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('FB_URL', "https://my-anapp.firebaseio.com/");
})();
