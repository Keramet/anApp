(function() {
  'use strict';


angular
	.module('anApp')
    .controller('myPostsCtrl', [ '$http', '$timeout', '$rootScope', 'fbSvc', myPostsCtrl ])
    .controller('postCtrl', [ '$stateParams', '$location', '$anchorScroll', 'fbSvc', postCtrl ]);


  function myPostsCtrl ($http, $timeout, $rootScope, fbSvc) {
  	var self = this;

    this.postCount   = 10;
    this.nextId      = null;
    this.showSpinner = false;
    this.showAddPost = false;
    this.isShowTagF  = false;
    this.showInfo    = true;   //  надпись, предлагающая кликнуть на посте
    
    this.loadData = function () {
      fbSvc('posts').getDataA( this.postCount, this.nextId )
        .then( function (data) {
          self.posts  = data;
          self.nextId = data[0].$id;
        });
    }
    this.loadData();

    this.changeF = function () {
      console.log(this.tagF);
      fbSvc('posts').getDataA( this.postCount, this.nextId, this.tagF )
        .then( function (data) {
          self.posts  = data;
          self.nextId = data[0].$id;
        });
    }

    fbSvc('tags').getData() 
      .then( function (data) {
        self.tags = data;
      })
      /*.then( function () {
        self.sel = [ "u2", "bnnn" ];
      })*/;

    this.showTagF = function () {
      this.isShowTagF = !this.isShowTagF;
      if (this.isShowTagF) {
        $timeout( function () {
          angular.element("#tagF").focus();
        }, 0 ); 
      }
    }

    this.clickAdd = function () {
      this.showAddPost = !this.showAddPost;
      
      if (this.showAddPost) {
        this.published  = true;
        $timeout( function () {
          angular.element("input[name=npUrl]").focus();
        }, 0 ); 
      }
    }

    this.addPost = function () {
     	this.showSpinner = true;

      var post = {
            "name" : self.npName || "name of new post!",
            "text" : self.npCaption || "Text of new post...",
            "date" : Date.now(),
            "tagId": this.sel,
            "published": self.published
          },
          tagsObj = {};

      // if (this.sel.length > 0) {
      //   angular.forEach(this.sel, function(val) {
      //     tagsObj[ val ] = true;   
      //   });
      //   post["tagIds"] = tagsObj
      // } else {
      //   console.log("this.sel: ", this.sel);
      // }
          
      // console.log("this.sel: ", this.sel);
      // console.log("this.tags: ", this.tags);
      // console.log("this.sel[0]: ", this.sel[0]);
      
	
	   	$timeout( function () {
        self.posts.$add( post );
     	}, 3000 )
      .then( function () {
        self.npUrl = "";
        self.npName = "";
        self.npCaption = "";
        self.showSpinner = false;
        self.showAddPost = false;
        console.log("Прошло 3сек.");
        return fbSvc('posts').getDataA(); 
       })
      .then (function (data) {
        console.log("self.posts: ", self.posts);
        console.log("data: ", data);
        console.log("data == self.posts: ", data == self.posts);
      }) ;
    }
   
    this.clearF = function () { this.f = ""; }  
    this.clickPostRef = function () { this.showInfo = false; }

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