(function() {
  'use strict';


angular
	.module('anApp')
    .controller('myPostsCtrl', [ '$http', '$timeout', '$location', '$anchorScroll', '$rootScope', 'fbSvc', myPostsCtrl ])
    .controller('postCtrl', [ '$stateParams', '$location', '$anchorScroll', 'fbSvc', postCtrl ]);


  function myPostsCtrl ($http, $timeout, $location, $anchorScroll, $rootScope, fbSvc) {
  	var self       = this,
        updateMode = false,   //  режим редактирования
        postId     = null,
        postCount  = 5,
        loadCounter= 1;       //  для редактирования поста

    // self.postCount   = 10;
    // self.nextId      = null;
    self.showSpinner = false;
    self.showAddPost = false;
    self.isShowTagF  = false;
    self.isLoadData  = false;
    self.showInfo    = true;   //  надпись, предлагающая кликнуть на посте
    self.isShowScrollMsg = false;
    
    // self.loadData = function () {
    //   fbSvc('posts').getDataByCount( self.postCount, self.nextId )
    //     .then( function (data) {
    //       self.posts  = data;
    //       self.nextId = data[0].$id;
    //       self.isLoadData = true;
    //     });
    // }

    self.loadData = function () {
      var count = loadCounter * postCount,
          field, id;

      if (self.isShowTagF && self.tagF) { field = 'tagId';
                                             id = self.tagF; }
      return fbSvc('posts').getDataA( count, field, id )
        .then( function (data) {  
          self.posts      = data; 
          self.isLoadData = true;   
        });
    }

    self.loadData();

    fbSvc('tags').getData() 
      .then( function (data) { self.tags = data;  console.log(self.tags); });

    self.loadMore = function () {     // подгружать посты
      if (postCount * loadCounter <= self.posts.length) {
        loadCounter++;
        self.loadData()
          .then ( function () {
            $location.hash('endScroll');
            $timeout( function () { $anchorScroll(); }, 0 ); 
          });
      } else { 
        self.isShowScrollMsg = true;
        $timeout( function () {
          self.isShowScrollMsg = false;
          loadCounter--;     //  чтобы при клике подгружать данные
        }, 6000 ); 
      }
    }

    self.showTagF = function () {
      self.isShowTagF = !self.isShowTagF;

      if ( self.isShowTagF ) {
        $timeout( function () { angular.element("#tagF").focus(); }, 0 ); 
      } else {
        self.isLoadData = false;
        self.loadCount  = 1;
        self.posts      = null;
        self.loadData();
      }
    }

    self.clickAdd = function () {
      self.showAddPost = !self.showAddPost;
      updateMode = false;
      
      if (self.showAddPost) {
        self.published  = true;
        $timeout( function () { angular.element("input[name=np]").focus();  }, 0 ); 
      }
    }

    self.addPost = function () {
      var post = {
            "date" : Date.now(),
            "dateU": Date.now(),    //  дата редактирования
            "name" : self.npName || "name of new post!",
            "text" : self.npText || "Text of new post...",
            "tagId": self.tagId,
            "published": self.published
          };
     	
      self.showSpinner = true;

      if ( updateMode ) {
        $timeout( function () {
          delete post["date"];   //  дату создания не изменяем
          fbSvc('posts').updateData( postId, post )
            .then( function () { console.log("Прошло 3сек.: пост изменён"); });                         
        }, 3000)
          .then( function () {
            self.showSpinner = false;
            self.showAddPost = false;
          });
        return;
      }
  	
	   	$timeout( function () {
        self.posts.$add( post );
     	}, 3000 )
      .then( function () {
        console.log("Прошло 3сек.");
        self.showSpinner = false;
        self.showAddPost = false;  
        self.npName = "";
        self.npText = "";
        self.loadData();
      }) ;
    }

    self.uPost = function (post) {    //  updatePost
      updateMode = true;
      postId     = post.$id;
      self.npName   = post.name;
      self.npText   = post.text;
      self.tagId    = post.tagId;
      self.published= post.published || false;
      self.showAddPost = true;
    }

    self.dPost = function (post) {       //  deletePost
      self.posts.$remove( post )
        .then( function () { console.log("Пост удалён") });
    }
   
    self.clickPostRef = function () { self.showInfo = false; }

    self.showList = function () {
      return self.isLoadData && !self.showAddPost;
    }
   
    self.commonFilter = function () { 
      angular.element("#commonF").focus();
      history.pushState('', document.title, window.location.pathname);  // убираю хеш из адресной строки 
    };

  }// end of  mypostsCtrl



  function postCtrl ($stateParams, $location, $anchorScroll, fbSvc) {
  	var self  = this;

    self.loadData = false;
    self.postId     = $stateParams.item;

    fbSvc('posts').getRecord( self.postId )
      .then( function (data) { 
        self.post     = data;  
        self.loadData = true;
      });

    fbSvc('posts').getRecord( self.postId )
      .then( function (data) { 
        self.post     = data;  
        self.loadData = true;
      });

    fbSvc('tags').getData()
      .then( function (data) { self.tags = data; });

    fbSvc('comments').getDataA( null, "postId", self.postId )
      .then( function (data) { self.comments = data; });

    self.close = function () { window.history.back(); }

    // self.uPost = function () {
    //   $location.hash('addPost');
    //   $anchorScroll();
    // }

    // self.dPost = function () {
    //   fbSvc('posts').removeRecord(mpCtrl.posts, self.post);
      
    //   $location.hash('allPosts');
    //   $anchorScroll();
    // }

    $location.hash('postEnd');
    $anchorScroll();
  }

})();