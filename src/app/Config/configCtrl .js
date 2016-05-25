(function() {
  'use strict';

angular
	.module('anApp')
    .controller('configCtrl', [ '$stateParams', configCtrl ]);

      
      function configCtrl ($stateParams) {

        this.isShowSb 		= false;
        this.isShowPosts 	= false;
        this.isShowTags 	= false;
        this.isShowComments = false;
        this.isShowAll 		= false;

        this.showSb 	  = function () { this.isShowSb 	  = !this.isShowSb; } 
        this.showPosts 	  = function () { this.isShowPosts 	  = !this.isShowPosts; }
        this.showTags 	  = function () { this.isShowTags 	  = !this.isShowTags; }
        this.showComments = function () { this.isShowComments = !this.isShowComments; }

        this.showAll = function () {
        	this.isShowAll = !this.isShowAll;
        	if (this.isShowAll) {
        		this.isShowSb 		= true;
        		this.isShowPosts 	= true;
        		this.isShowTags 	= true;
        		this.isShowComments = true;
        	} else {
        		this.isShowSb 		= false;
        		this.isShowPosts 	= false;
        		this.isShowTags 	= false;
        		this.isShowComments = false;
        	}
        } 

      }

})();