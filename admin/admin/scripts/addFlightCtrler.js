'use strict'

app.controller('addFlightCtrler', function($scope, $http, $state){
    $scope.Airports = [];
    $scope.from = '';
    $scope.to = '';
    $scope.departdate = '';
    $scope.arrivaldate = '';
    $scope.departtime = '';
    $scope.arrivaltime = '';
    $scope.routecode = '';
    $scope.routes = [];
    $scope.ticketprices = [];
    $scope.taxes = [];
    $scope.normalprice = '';
    $scope.bussinessprice = '';
    $scope.normal_seats = '';
    $scope.bussiness_seats = '';
    $scope.taxtype = '';

  $scope.init = function(){
    // $http.get('https://webbooking.herokuapp.com/api/v1/admin/airports?type=1').then(function(res){
    //   console.log(res.data);
    //   $scope.fromAirports = res.data;
    // });

    $.ajax({
       url: _url_host + 'api/v1/admin/airports?type=1',
      
       type: 'GET',
       error: function() {
          
       },
       dataType: 'json',
       success: function(data) {
        $scope.Airports = data;
       }
       
    });

    $http.get('https://webbooking.herokuapp.com/api/v1/admin/destinations').then(function(res){
      console.log(res.data);
      $scope.routes = res.data;
    });

    $http.get('https://webbooking.herokuapp.com/api/v1/admin/price?type=1').then(function(res){
      console.log(res.data);
      $scope.ticketprices = res.data;
    });

    $http.get('https://webbooking.herokuapp.com/api/v1/admin/taxes?type=1').then(function(res){
      console.log(res.data);
      $scope.taxes = res.data;
    });
  };

 

  $scope.addflight = function(){

    $.ajax({
        url: _url_host + 'api/v1/admin/destinations',
        data: {
          'dep_date' : transformDate($scope.departdate),
          'dep_time' : $scope.departtime,
          'dep_code' : $scope.from.code,
          'arr_date' : transformDate($scope.arrivaldate),
          'arr_time' : $scope.arrivaltime,
          'arr_code' : $scope.to.code,
          'destinations' : $scope.route,
          'class' : [
          {
            'code' : "Y",
            'code_price' : $scope.bussinessprice.code,
            'seats' : $scope.bussiness_seats
          },

          {
            'code' : "C",
            'code_price' : $scope.normalprice.code,
            'seats' : $scope.normal_seats
          }],
          'taxes' : $scope.taxtype
        },
        type: 'post',
        error: function(jqXHR, textStatus, errorThrown) {
          //show popup loi
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
          alert(textStatus);
       },
       dataType: 'json',
       success: function(textStatus) {
          console.log(textStatus);
          alert("success");
       }
       
    });
  };

  var transformDate = function(fulldate) {
   
    var date = new Date(fulldate);
    var day = date.getDate();
    var month = date.getMonth() + 1;
    var year = date.getFullYear();
    var res='';
    if(month >= 10){
      return res.concat(day, "/", month, "/", year);
    }
    else
    {
      return res.concat(day, "/", month, "/", year);
    }
  };

})
