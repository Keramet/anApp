(function() {
  'use strict';

  // angular
  //   .module('anApp')
  //   .controller('myPagesCtrl', myPagesCtrl);

  // function myPagesCtrl () { 
  //   this.pages = [ "P1", "P2", "P3", "P4" ];

  //   this.addPage = function () {
		// this.pages.push(this.newPage);
  //   	this.newPage = "";
  //   }
  // }

angular
	.module('anApp')
    .controller('myPagesCtrl', [ '$http', '$timeout', myPagesCtrl ])
    .controller('pageCtrl', [ '$stateParams', pageCtrl ]);


  function myPagesCtrl ($http, $timeout) {
  	var self = this;

  	$http.get('app/pages/pages.json')
  		.success( function (data) { 
  			self.pages = data;
  		})
    	.error( function () {
    		self.pages = [ "P1", "P2" ];
    		console.log("Error with 'pages.json'");
    	});

    this.addPage = function () {
		this.pages.push( { 
			"name": this.newPage,
			 text: `Text of  page '${this.newPage}'`
		});
    	this.newPage = "";

    	$timeout( function () {
    		console.log("Прошло 5сек.");
    	}, 5000 );
    };

  	console.log(`self: ${self}.`);
  }


  function pageCtrl ($stateParams) {
  	this.page = $stateParams.item;
  	// console.log($index);
  }

})();