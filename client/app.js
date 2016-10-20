var airlinesApp = angular.module('AirlinesApp', ['ngMaterial','ngRoute']);

// airlinesApp.config(function($stateProvider, $urlRouterProvider) {
    
//     $urlRouterProvider.otherwise('/');
    
//     $stateProvider
        
//         // HOME STATES AND NESTED VIEWS ========================================
//         .state('home', {
//             url: '/',
//             templateUrl: './home/home.html',
//             controller: 'homeController',
//             controllerAs: 'vm'
//         });
// });

airlinesApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
        when('/',{
            templateUrl: './home/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        }).
        otherwise({
            redirectTo: '/'
        });
}]);