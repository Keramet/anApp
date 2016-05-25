(function() {
  'use strict';


angular
	.module('anApp')
    .controller('myPostsCtrl', [ '$http', '$timeout', '$rootScope', 'FB_URL', myPostsCtrl ])
    .controller('postCtrl', [ '$stateParams', '$rootScope', postCtrl ]);


  function myPostsCtrl ($http, $timeout, $rootScope, FB_URL) {
  	var self = this;

  	$http.get('app/Posts/posts.json')
  		.success( function (data) { 
  			self.posts = data;
  			$rootScope.posts = data;
  		})
    	.error( function () {
    		self.posts = [ "P1", "P2" ];
    		$rootScope.posts = self.posts;
    		console.log("Error with 'posts.json'");
    	});

    this.showSpinner = false;
    this.showInfo = true;

    this.addPost = function () {
    	this.showSpinner = true;
    	console.log(FB_URL);
	
	   	$timeout( function () {
			self.posts.push( {
				"id"  : self.npUrl,  
				"name": self.npName || "name of new post!",
				"text": self.npCaption || "Text of new post..."
			});
			self.npUrl = "";
			self.npName = "";
			self.npCaption = "";
    		self.showSpinner = false;
    		console.log("Прошло 3сек.");
    	}, 3000 );
    };

    this.clearF = function () { this.f = ""; }

  }// end of  mypostsCtrl




  function postCtrl ($stateParams, $rootScope) {
  	this.post = $stateParams.item;
  //	mpCtrl.showInfo = false; 
  }

})();