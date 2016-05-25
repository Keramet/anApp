(function() {
  'use strict';

  angular
    .module('anApp')
    .factory('fbSvc', [ '$firebaseObject', 'FB_URL', fbSvc ]);
  

  function fbSvc ($firebaseObject, FB_URL) {
    var fb = new Firebase(FB_URL);

    return function (ref) {
      var fbObj = $firebaseObject( fb.child(ref) ),
          result = {};

      result.getData = function () {
        return fbObj.$loaded();
      }

      result.saveData = function (id, data) {
        return fb.child(ref).child(id).set( data );
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