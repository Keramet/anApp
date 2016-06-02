(function() {
  'use strict';


  angular
    .module( 'anApp' )
    .controller( 'commentsCtrl', [ '$timeout', 'fbSvc', commentsCtrl ]);


  /** @ngInject */
  function commentsCtrl ($timeout, fbSvc) {
  	var self = this;

    this.commentsCount  = 5;
    this.nextId         = null;
    this.showSpinner    = false;
    this.showAddComment = false;
    this.isLoadData     = false;

    this.loadData = function () {
      fbSvc('comments').getDataByCount( this.commentsCount, this.nextId )
        .then( function (data) {
          // if (self.nextId) console.log("nextId", self.nextId);
          self.comments   = data;
          self.nextId     = data[0].$id;
          self.isLoadData = true;
          // console.log("data", data);
        });
    }
    this.loadData();
    
  //  fbSvc('comments').getData()
  //    .then( function (data) { self.comments = data; });

    fbSvc('posts').getDataA()
      .then( function (data) {
        self.posts  = data;
        console.log("Посты загружены!");
      });


    this.clickAdd = function () {
      this.showAddComment = !this.showAddComment;

      if (this.showAddComment) {
        this.ncAgreed = false;
        $timeout( function () {
          angular.element("#ncPostId").focus();
        }, 0 ); 
      }
    }

    this.addComment = function () {
     	this.showSpinner = true;

      var comment = {
        "date"  : Date.now(),
        "text"  : this.ncText,
        "postId": this.ncPostId,  
        "author": this.ncAuthor || "Anonim",
        "agreed": this.ncAgreed
      },
          newComment = {};

      // fbSvc('comments').pushDataChild( this.ncPostId, comment )
      //   .then (function () {
      //     console.log("Комментарий сохранен.");
      //     return fbSvc("comments_posts").getCommentsByPost( self.ncPostId );
      //   })
      //   .then (function (data) {
      //     console.log(data);
      //   });
	
	   	$timeout( function () {
        fbSvc('comments').pushData( comment );
     	}, 3000 )
      .then( function () {
        self.ncText   = "";
        self.ncPostId = "";
        self.ncAuthor = "";
        self.showSpinner    = false;
        self.showAddComment = false;
        console.log("Прошло 3сек.");
        return fbSvc('comments').getDataA(); 
      })
      .then (function (data) {
        console.log("comments: ", data);
      });
    }
    
    this.changeF = function () {
      console.log(this.postF);
    }

    this.showPostF = function () {
      this.isShowPostF = !this.isShowPostF;
      if (this.isShowPostF) {
        $timeout( function () {
          angular.element("#postF").focus();
        }, 0 ); 
      }
    }

    this.uCom = function (id) {
      alert("В процессе... :(");
      console.log( "Update", id/*this.comments[index]*/ );
    }

    this.dCom = function (id) {
      fbSvc( "comments" ).saveData( id, null )
        .then( function () { console.log("Комментарий удалён"); } );
    }

    this.clearF       = function () { this.f = ""; }
    this.clickPostRef = function () { this.showInfo = false; }
    
    this.showList = function () {
      return this.isLoadData && !this.showAddComment;
    }

  }// end of  commentsCtrl


})();