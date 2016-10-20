// var app =  angular.module('Airlines', ['ngMaterial']);

// app.controller("AirlinesCtrl", function($scope,$http) {

//   var vm = this;
//   vm.fromAirport = [];

//   vm.init = function(){
//     $http.get('https://webbooking.herokuapp.com/api/v1/airports').then(function(res){
//       //console.log(res.data[0].airports);
//       vm.fromAirport = res.data[0].airports;
//     });
//   };
  
  
//   $("input[name='round']").change(function(){
//     if ($("input[name='round']:checked").val() === "roundTrip"){
//       //alert("Hello! I am an alert box!!");
//       $("#return").show();
//     }
//     else{
//       $("#return").hide();
//     }
//   });
// });