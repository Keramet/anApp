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
    .controller('myPagesCtrl', [ '$http', '$timeout', '$rootScope', 'FB_URL', myPagesCtrl ])
    .controller('pageCtrl', [ '$stateParams', '$rootScope', pageCtrl ]);


  function myPagesCtrl ($http, $timeout, $rootScope, FB_URL) {
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
    this.showInfo = true;

    this.addPage = function () {
    	this.showSpinner = true;
    	console.log(FB_URL);
	
	   	$timeout( function () {
			self.pages.push( {
				"id"  : self.npUrl,  
				"name": self.npName || "name of new page!",
				"text": self.npCaption || "Text of new page..."
			});
			self.npUrl = "";
			self.npName = "";
			self.npCaption = "";
    		self.showSpinner = false;
    		console.log("Прошло 3сек.");
    	}, 3000 );
    };

    this.clearF = function () { this.f = ""; }

  }// end of  myPagesCtrl




  function pageCtrl ($stateParams, $rootScope) {
  	this.page = $stateParams.item;
  //	mpCtrl.showInfo = false; 
  }

})();