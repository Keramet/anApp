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
    .controller('myPagesCtrl', [ '$http', '$timeout', '$rootScope', myPagesCtrl ])
    .controller('pageCtrl', [ '$stateParams', '$rootScope', pageCtrl ]);


  function myPagesCtrl ($http, $timeout, $rootScope) {
  	var self = this;

  	$http.get('app/pages/pages.json')
  		.success( function (data) { 
  			self.pages = data;
  			$rootScope.pages = data;
  		})
    	.error( function () {
    		self.pages = [ "P1", "P2" ];
    		$rootScope.pages = self.pages;
    		console.log("Error with 'pages.json'");
    	});

    this.showSpinner = false;

    this.addPage = function () {
		this.pages.push( { 
			"name": this.newPage,
			"text": "Text of  page '" + this.newPage +"'"
		});
    	this.newPage = "";

    	this.showSpinner = true;

    	$timeout( function () {
    		self.showSpinner = false;
    		// self.pages.push( { 
    		// 	"name": self.newPage,
    		// 	"text": `Text of  page '${self.newPage}'`
    		// });
    		// self.newPage = "";
    		console.log("Прошло 3сек.");
    	}, 3000 );
    };

    
  	console.log("self:");
  	console.dir(self);
  }// end of  myPagesCtrl




  function pageCtrl ($stateParams, $rootScope) {
  	this.page = $stateParams.item;

  	// console.dir($rootScope.pages);
  	// if (angular.isDefined( $rootScope.pages )) {
  	// 	$rootScope.pages.forEach (function (elm, i) {
  	// 		if (elm.name === this.page) this.n = i;
  	// 	});
  	// }
  	


  }

})();