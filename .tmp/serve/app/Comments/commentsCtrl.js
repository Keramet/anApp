(function() {
  'use strict';


  angular
    .module( 'anApp' )
    .controller( 'commentsCtrl', [ '$timeout', '$location', '$anchorScroll', 'fbSvc', commentsCtrl ]);


  /** @ngInject */
  function commentsCtrl ($timeout, $location, $anchorScroll, fbSvc) {
  	var self       = this,
        updateMode = false,   //  режим редактирования
        commentId  = null;    //  для редактирования коммента

    self.commentsCount  = 5;
    self.loadCount      = 1;

    self.showSpinner    = false;
    self.showAddComment = false;
    self.isLoadData     = false;
    self.isShowPostF    = false;  //  включен/выключен фильрт комментов по постам
    self.isShowScrollMsg= false;

    self.loadData = function () {
      var count = self.commentsCount * self.loadCount,
          field, id;

      if ( self.isShowPostF && self.postF ) {
        field = 'postId';
        id    = self.postF;
      }
      return fbSvc('comments').getDataA( count, field, id )
          .then( function (data) {
            self.comments   = data; 
            self.isLoadData = true;   
          });
    }

    self.loadData();

    fbSvc('posts').getDataA()   // подумать, как оптимизировать!
      .then( function (data) { self.posts = data; });
    
    self.loadMore = function () {     // подгружать комменты
      if (self.commentsCount * self.loadCount <= self.comments.length) {
        self.loadCount++;
        self.loadData()
          .then ( function () {
            $location.hash('endScroll');
            $timeout( function () { $anchorScroll(); }, 0 ); 
          });
      } else { 
        self.isShowScrollMsg = true;
        $timeout( function () {
          self.isShowScrollMsg = false;
          self.loadCount--;     //  чтобы при клике подгружать данные
        }, 6000 ); 
      }
    }


    self.showPostF = function () {    //  
      self.isShowPostF = !self.isShowPostF;

      if ( self.isShowPostF ) {
        $timeout( function () { angular.element("#postF").focus() }, 0 ); 
      } else {
        self.isLoadData = false;
        self.loadCount  = 1;
        self.comments   = null;
        // self.nextId     = null;
        self.loadData();
      }
    }


    self.clickAdd = function () {
      self.showAddComment = !self.showAddComment;
      updateMode = false;

      if (self.showAddComment) {
        self.ncAgreed = false;
        $timeout( function () { angular.element("#ncPostId").focus() }, 0 ); 
      }
    }

    self.addComment = function () {
      var comment = {
        "date"  : Date.now(),   //  дата создания
        "dateU" : Date.now(),   //  дата изменеия
        "text"  : self.ncText,
        "postId": self.ncPostId,  
        "author": self.ncAuthor || "Anonim",
        "agreed": self.ncAgreed || false
      };

      self.showSpinner = true;

      //  ---[ Если связь постов и комментов реализована через промежуточную таблицу ]---
      // fbSvc('comments').pushDataChild( self.ncPostId, comment )
      //   .then (function () {
      //     console.log("Комментарий сохранен.");
      //     return fbSvc("comments_posts").getCommentsByPost( self.ncPostId );
      //   })
      //   .then (function (data) { console.log(data); });


      if ( updateMode ) {
        $timeout( function () {
          delete comment["date"];   //  дату создания не изменяем
          fbSvc('comments').updateData( commentId, comment )
            .then( function () { console.log("Прошло 3сек.: комментарий изменён"); });                         
        }, 3000)
          .then( function () {
              self.showSpinner    = false;
              self.showAddComment = false;
          });
        return;
      }
	
	   	$timeout( function () {
        return fbSvc('comments').pushData( comment );
     	}, 3000 )
      // .then( function (cid) {    // не использую, т.к. связь без промежуточной таблицы. Будем использовать при отношении "многие ко многим"
      //   fbSvc('comments_posts').pushData( {"cId": cid,
      //                                      "pId": self.ncPostId} );
      // })
      .then( function () {
        console.log("Прошло 3сек.: комментарий сохранен!");
        self.showSpinner    = false;
        self.showAddComment = false;
        self.ncText   = "";
        self.ncPostId = "";
        self.ncAuthor = "";
       // commentId = null;
        self.loadData();
      });
    }// end of  self.addComment


    self.uCom = function (comment) {    //  updateComment
      updateMode = true;
      commentId  = comment.$id;
      self.ncText   = comment.text;
      self.ncPostId = comment.postId;
      self.ncAuthor = comment.author;
      self.ncAgreed = comment.agreed;
      self.showAddComment = true;
    }

    self.dCom = function (id) {       //  deleteComment
      fbSvc( "comments" ).saveData( id, null )
        .then( function () { console.log("Комментарий удалён"); } );
    }
    
    self.showList = function () {
      return self.isLoadData && !self.showAddComment;
    }
    
    self.commonFilter = function () { 
      angular.element("#commonF").focus();
      history.pushState('', document.title, window.location.pathname);  // убираю хеш из адресной строки 
    };
 
  }// end of  commentsCtrl

})();