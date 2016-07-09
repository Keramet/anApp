(function() {
  'use strict';

angular
	.module( 'anApp' )
    .controller( 'configCtrl', [ function () {
        var self = this;
        
        self.isShowSb       = false;
        self.isShowPosts    = false;
        self.isShowTags     = false;
        self.isShowComments = false;
        self.isShowAll      = false;

        self.showSb       = function () { self.isShowSb       = !self.isShowSb;       } 
        self.showPosts    = function () { self.isShowPosts    = !self.isShowPosts;    }
        self.showTags     = function () { self.isShowTags     = !self.isShowTags;     }
        self.showComments = function () { self.isShowComments = !self.isShowComments; }

        self.showAll = function () {
            self.isShowAll = !self.isShowAll;
            if (self.isShowAll) {
                self.isShowSb       = true;
                self.isShowPosts    = true;
                self.isShowTags     = true;
                self.isShowComments = true;
            } else {
                self.isShowSb       = false;
                self.isShowPosts    = false;
                self.isShowTags     = false;
                self.isShowComments = false;
            }
        } 
    }]);


})();