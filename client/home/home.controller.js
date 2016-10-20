(function(){
  'use strict'

  airlinesApp.controller('homeController', function($scope,$http) {
    var vm = this;
    vm.Hello = 'Hello World';
    vm.fromAirports = [];
    vm.arrivalAirports = [];
    vm.from = '';

    $('#dateDepart').datepicker();
    $('#dateReturn').datepicker();

    vm.init = function(){
      $http.get('https://webbooking.herokuapp.com/api/v1/departure_airports').then(function(res){
        console.log(res.data);
        vm.fromAirports = res.data;
      });
    };

    vm.requestArrivalAirport = function(){
      //console.log(vm.from);
      var request = 'https://webbooking.herokuapp.com/api/v1/arrival_airports?code=' + vm.from.code;
      $http.get(request).then(function(res){
        console.log(res.data);
        vm.arrivalAirports = res.data;
      });
    };
    
    
    $("input[name='round']").change(function(){
      if ($("input[name='round']:checked").val() === "roundTrip"){
        //alert("Hello! I am an alert box!!");
        $("#return").show();
      }
      else{
        $("#return").hide();
      }
    });
  });
})();