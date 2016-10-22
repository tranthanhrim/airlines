var app = angular.module('AdminApp', ['ngMdIcons', 'ui.router']);

app.config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: 'view/addTicketPrice.html'
      })

      .state('addFlight', {
        url: '/addFlight',
        templateUrl: 'view/addFlight.html'
      })

      .state('addFlightRoute', {
        url: '/addFlightRoute',
        templateUrl: 'view/addFlightRoute.html'
      })

      .state('addAirport', {
        url: '/addAirport',
        templateUrl: 'view/addAirport.html'
      })
})




// .config(function($stateProvider, $urlRouterProvider){
//   $urlRouterProvider.otherwise("view/addFlight")
//   $stateProvider
//     .state('addFlight', {
//       url: "/view/addFlight",
//       templateUrl: "view/addFlight.html"
//     })
// });
