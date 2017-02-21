/*parent module definitions*/

angular.module('vidyasagarApp', ['ui.router', 'ngResource'])	
	   .config(function($stateProvider, $urlRouterProvider) {  
	       	$urlRouterProvider.otherwise('/home');  		
    		$stateProvider
    		.state('home', {
            	url: '/home',
            	templateUrl: 'test/home/partial-home.html'
        	})

            // nested list with custom controller
            .state('home.list', {
                url: '/list',
                templateUrl: 'test/home/partial-home-list.html',
                controller: function($scope) {
                    $scope.dogs = ['Bernese', 'Husky', 'Goldendoodle'];
                }
            })
            // nested list with just some random string data
            .state('home.paragraph', {
                url: '/paragraph',
                template: 'I could sure use a drink right now.'
            })
        	.state('about', {
            	url: '/about',
            	views: { // demonstrate multiple views in single page!
					// the main template will be placed here (relatively named)
            		'': { templateUrl: 'test/about/partial-about.html' },
                    // nested view1, view1@state
            		'columnOne@about': { template: 'Look I am a column!' },
            		// nested view2, view2@state 
            		'columnTwo@about': { 
                		templateUrl: 'test/table-data.html',
                		controller: 'scotchController'
            		}
        		} 
        	})
        	.state('contact', {
            	url: '/contact',
            	templateUrl: 'test/contact/partial-contact.html',
            	controller: 'studentController'  
        	});

        
		});


angular.module('vidyasagarApp')
.factory('StudentService', ['$resource', function ($resource) {
    //$resource() function returns an object of resource class.
    return $resource(
            'api/students/:id', //url
            {},//parameters
            {
                update: {
                      method: 'PUT' // To send the HTTP Put request when calling this custom update method.
                },
                get: {
                      method: 'GET', cache: true // Override GET to cache the GET request fired using 'get' method.
                }
            }, // actions
            {
                stripTrailingSlashes: false
            } //options
    );
}])  
.controller('studentController', function($scope,StudentService) {
   
            $scope.students = StudentService.query();
    
})    
.controller('scotchController', function($scope) {
   
    		$scope.scotches = [
        		{
            		name: 'Macallan 12',
            		price: 50
        		},
        		{
            		name: 'Chivas Regal Royal Salute',
            		price: 10000
        		},
        		{
            		name: 'Glenfiddich 1937',
            		price: 20000
        		}
    		];
    
});

		