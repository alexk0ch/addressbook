angular.module('addressBook')
	.config(['$routeProvider', '$locationProvider', function ($routeProvider) {
  
	  $routeProvider
		  
		  .when('/login', {
		  	templateUrl: '../front/templates/guest.html'
		  })

		  .when('/contacts/view/:id', {
		  	templateUrl: '../front/templates/contactDetail.html',
		  	controller: 'ContactDetail'
		  })

		  .when('/contacts/add', {
		  	templateUrl: '../front/templates/add.html'
		  })

		  .when('/contacts/edit/:id', {
		  	templateUrl: '../front/templates/edit.html',
		  	controller: 'ContactDetail'
		  })

		  .otherwise({
		    redirectTo: '/login'
		  })

	}])

