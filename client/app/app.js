/*parent module definitions*/

var vidyaSagar = angular.module('vidyasagarApp', ['ui.router', 'ngResource']);
vidyaSagar.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'app/home/partial-home.html'
        })
        .state('about', {
            url: '/about',
            views: {
                // the main template will be placed here (relatively named)
                '': { templateUrl: 'app/about/partial-about.html' },
                'columnOne@about': { template: 'Look I am a column!' },
                // for column two, we'll define a separate controller 
                'columnTwo@about': {
                    templateUrl: 'app/table-data.html',
                    controller: 'scotchController'
                }
            }
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'app/contact/partial-contact.html',
            controller: 'scotchController'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'app/login/partial-login.html',
            controller: 'formController'
        });


});

vidyaSagar.controller('scotchController', function($scope) {

    $scope.message = 'test';

    $scope.scotches = [{
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