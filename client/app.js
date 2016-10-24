var airlinesApp = angular.module('AirlinesApp', ['ngMaterial','ui.router']); //ngRoute

airlinesApp.config(function($stateProvider, $urlRouterProvider) {
    
    $urlRouterProvider.otherwise('/');
    
    $stateProvider
        .state('home', {
            url: '/',
            templateUrl: './home/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })
        .state('booktrip', {
        	url: '/booktrip',
        	templateUrl: './book-trip/book-trip.html',
        	controller: 'bookTripController',
        	controllerAs: 'vm',
        	params: {
        		mode: null,
        		flights: null,
        		passengers: null
        	}
        })
        .state('yourcode',{
            url: '/yourcode',
            templateUrl: './list-passengers/list-passengers.html',
            controller: 'listPassengersController',
            controllerAs: 'vm',
            params: {
                code: null,
                passengers: null
            }
        });
});