(function() {
  'use strict';


  angular
    .module( 'anApp' )
    .controller( 'commentsCtrl', [ 
      '$timeout',
      'fbSvc',
      commentsCtrl
    ]);


  /** @ngInject */
  function commentsCtrl ($timeout, fbSvc) {
  	var self = this;

    this.showSpinner = false;
    this.showInfo    = true;   //  надпись, предлагающая кликнуть на посте

    this.addPost = function () {
     	this.showSpinner = true;

      var post = {
        "id"  : self.npUrl,  
        "name": self.npName || "name of new post!",
        "text": self.npCaption || "Text of new post...",
        "date": Date.now()
      };
      // console.log(Date.now());
	
	   	$timeout( function () {
        self.posts.push( post );
        fbSvc('posts').pushData( post );
     	}, 3000 )
      .then( function () {
        self.npUrl = "";
        self.npName = "";
        self.npCaption = "";
        self.showSpinner = false;
        console.log("Прошло 3сек.");
        return fbSvc('posts').getData(); 
      })
      .then (function (data) {
        console.log(data);
      }) ;
    }
   
    this.clearF       = function () { this.f = ""; }
    this.clickPostRef = function () { this.showInfo = false; }

  }// end of  commentsCtrl


})();