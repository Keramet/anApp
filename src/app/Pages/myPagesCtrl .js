(function() {
  'use strict';

  angular
    .module('anApp')
    .controller('myPagesCtrl', myPagesCtrl);

  function myPagesCtrl () { 
    this.pages = [ "P1", "P2", "P3", "P4" ];
    this.newPage = "";

    this.addPage = function () {
		this.pages.push(this.newPage);
    	this.newPage = "";
    }
  }


})();