(function() {
  'use strict';

  angular
    .module('anApp')
    .factory('fbSvc', [ '$firebaseObject', '$firebaseArray', 'FB_URL', fbSvc ]);
  

  function fbSvc ($firebaseObject, $firebaseArray, FB_URL) {
    var fb = new Firebase(FB_URL);

    return function (ref, child) {
      var fbObj = $firebaseObject( fb.child(ref) ),
          fbArr = $firebaseArray( fb.child(ref) ),
          result = {};

      result.getData = function () {
        return fbObj.$loaded();
      }

      // result.getDataA = function () {
      //   return fbArr.$loaded();
      // }

      result.getDataByCount = function (count, nextId) {
        var refC = fb.child(ref)
          .orderByKey()
          .limitToLast(count);

        if (nextId) refC = refC.endAt(nextId);
        return $firebaseArray( refC ).$loaded();
      }

      result.getDataA = function ( count, nextId, tagId ) {
        var refA = fb.child(ref);

        if (tagId)  refA = refA.orderByChild("tagId").equalTo( tagId );
        if (count)  refA = refA.limitToLast( count );
        if (nextId) refA = refA.endAt( nextId );

        // var reff = new Firebase(FB_URL + 'posts/').orderByKey();
        
        // if (count)  reff = reff.limitToLast(count);
        // if (nextId) reff = reff.endAt(nextId);
        var reff = new Firebase(FB_URL + 'posts/')
          .orderByChild("text").equalTo("Text of new post...").limitToLast(10);
        
        // if (count)  reff = reff.limitToLast(count);
        // if (nextId) reff = reff.endAt(nextId);

       return $firebaseArray( refA/*reff */).$loaded();
      }


      result.getRecord = function (rec) {
        return fbArr.$loaded()
          .then( function (data) {
            // var r = data.$getRecord( rec );
            // console.log("getRecord: ", r);
            // return r;
            return data.$getRecord( rec );
          });
      }

      result.removeRecord = function (data, rec) {
        return data.$remove(rec)
          .then( function () {
            console.log("Пост удалён");
          });
      }

      result.saveData = function (id, data) {
        return fb.child(ref).child(id).set( data );
      }

      result.pushData = function (data) {
        return fb.child(ref).push( data );
      }

      result.pushDataChild = function (ch, data) {
        return  fb.child(ref + "/" + ch)
          .once("value", function (snapshot) {
            if ( /*!snapshot.val()*/ !snapshot.exists() ) { 
              fb.child(ref).child(ch).set(null);
            }
            var comId = fb.child(ref + "/" + ch).push( data );
            fb.child("comments_posts").push({
              cId: comId.key(),
              pId: ch
            });
          });
      }

      result.getCommentsByPost = function(postId, count) {
        var arr = [],
            cRef = fb.child(ref)
          .orderByChild("pId").equalTo(postId);
     
        if (count) cRef = cRef.limitToLast(count);

        return $firebaseArray( cRef ).$loaded()
          .then( function (data) {
            angular.forEach(data, function (item) {
            //  var cId = item["cId"];

              arr.push(item["cId"]);
            })
            return arr;
          });
      }

      


      // result.data = [];

      // result.getData = function ( cb )  {
      //   fbObj.$loaded()
      //     .then( function (data) {
      //       angular.forEach( data, function (val, key) {
      //         result.data.push( {"name": val, "url": key} ); 
      //       });

      //       if (cb) cb(result.data); 
      //     })
      //     .catch( function (e) { console.dir(ref + " loadError: ", e); });
      // } 

 
      return result;
    }
  }
})();




// for a simpler approach, see also:
// https://gist.github.com/katowulf/f78d4a224c06a643ddfa

// var app = angular.module('app', ['firebase']);
// var fb = new Firebase('https://katowulf-normalized-messages.firebaseio-demo.com/');

// app.controller('ctrl', function ($scope, $firebaseArray, userCache) {
//     $scope.posts = $firebaseArray(fb.child('posts'));
//     $scope.users = userCache(fb.child('users'));
// });

// app.factory('userCache', function ($firebaseObject) {
//     return function (ref) {
//         var cachedUsers = {};
//         // loads one user into the local cache, you do not need to
//         // wait for this to show it in your view, Angular and Firebase
//         // will work out the details in the background
//         cachedUsers.$load = function (id) {
//             if( !cachedUsers.hasOwnProperty(id) ) {
//                 cachedUsers[id] = $firebaseObject(ref.child(id));
//             }
//             return cachedUsers[id];
//         };
//         // frees memory and stops listening on user objects
//         // use this when you switch views in your SPA and no longer
//         // need this list
//         cachedUsers.$dispose = function () {
//             angular.forEach(cachedUsers, function (user) {
//                 user.$destroy();
//             });
//         };
//         // removes one user, note that the user does not have
//         // to be cached locally for this to work
//         cachedUsers.$remove = function(id) {
//             delete cachedUsers[id];
//             ref.child(id).remove();
//         };
//         return cachedUsers;
//     }
// });

// // reset demo data on each page load
// fb.set({
//     posts: {
//         "post1": {
//             title: "This is a link to my favorite website!",
//             url: "http://www.firebase.com",
//             user: "simplelogin:1",
//             upvotes: 2,
//             dateCreated: 1397547310
//         },
//         "post2": {
//             title: "Another cool website",
//             url: "http://www.google.com",
//             user: "simplelogin:2",
//             upvotes: 1,
//             dateCreated: 1397584465
//         }
//     },
//     users: {
//         "simplelogin:1": {
//             email: "jake@notarealemailaddress.com",
//             name: "Jake Smith",
//             jobTitle: "Supreme Master of the Universe"
//         },
//         "simplelogin:2": {
//             email: "support@firebase.com",
//             name: "Michael 'Kato' Wulf",
//             jobTitle: "Awesome Dude"
//         }
//     }
// });