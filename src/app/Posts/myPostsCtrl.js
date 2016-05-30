(function() {
  'use strict';


angular
	.module('anApp')
    .controller('myPostsCtrl', [ '$http', '$timeout', '$rootScope', 'fbSvc', myPostsCtrl ])
    .controller('postCtrl', [ '$stateParams', '$location', '$anchorScroll', 'fbSvc', postCtrl ]);


  function myPostsCtrl ($http, $timeout, $rootScope, fbSvc) {
  	var self = this;

    this.published = true;
  	// $http.get('app/Posts/posts.json')
  	// 	.success( function (data) { 
  	// 		self.posts = data;
  	// 		$rootScope.posts = data;
  	// 	})
   //  	.error( function () {
   //  		self.posts = [ "P1", "P2" ];
   //  		$rootScope.posts = self.posts;
   //  		console.log("Error with 'posts.json'");
   //  	});

    fbSvc('posts').getDataA()
      .then( function (data) {
        self.posts = data;
        console.log("posts (array): ", data);
      });

    // fbSvc('posts').getData() 
    //   .then( function (data) {
    //     self.postsObj = data;
    //     console.log("postsObj: ", data);
    //   } );

    fbSvc('tags').getData() 
      .then( function (data) {
        self.tags = data;
        // console.log("self.tags: ", data);
        // console.log("self.tags == data: ", self.tags == data);
      })
      .then( function () {
        self.sel = [ "u2", "bnnn" ];
      });

    this.showSpinner = false;
    this.showInfo    = true;   //  надпись, предлагающая кликнуть на посте

    this.addPost = function () {
     	this.showSpinner = true;

      var post = {
        "id"    : self.npUrl,  
        "name"  : self.npName || "name of new post!",
        "text"  : self.npCaption || "Text of new post...",
        "date"  : Date.now(),
        "tagIds": this.sel,
        "published": self.published,
      };
      
      console.log("this.sel: ", this.sel);
      console.log("this.tags: ", this.tags);
      console.log("this.sel[0]: ", this.sel[0]);
      
	
	   	$timeout( function () {
        self.posts.$add( post );
     	}, 3000 )
      .then( function () {
        self.npUrl = "";
        self.npName = "";
        self.npCaption = "";
        self.showSpinner = false;
        console.log("Прошло 3сек.");
        return fbSvc('posts').getDataA(); 
       })
      .then (function (data) {
        console.log("self.posts: ", self.posts);
        console.log("data: ", data);
        console.log("data == self.posts: ", data == self.posts);
      }) ;
    }
   
  //  this.clearF       = function () { this.f = ""; }
    this.clickPostRef = function () { this.showInfo = false; }
    this.clickAdd = function () { console.log("clickAdd"); }

  }// end of  mypostsCtrl



  function postCtrl ($stateParams, $location, $anchorScroll, fbSvc) {
  	var self = this;

    this.post = $stateParams.item;

    fbSvc('posts').getRecord(this.post)
      .then( function (r) {
        self.postInfo = r;
      });

    this.uPost = function () {
      $location.hash('addPost');
      $anchorScroll();
    }

    this.dPost = function () {
      fbSvc('posts').removeRecord(mpCtrl.posts, this.post);
      
      $location.hash('allPosts');
      $anchorScroll();
    }


    $location.hash('postEnd');
    $anchorScroll();
  //	mpCtrl.showInfo = false; 
  }

})();