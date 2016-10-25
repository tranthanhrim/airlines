'use strict'

app.controller('addFlightRouteCtrler', function($scope, $http, $state){
    $scope.airports = [];
    $scope.from = '';
    $scope.to = '';
    $scope.departdate = '';
    $scope.arrivaldate = '';
    $scope.departtime = '';
    $scope.arrivaltime = '';

  $scope.init = function(){
    
    $.ajax({
       url: _url_host + 'api/v1/admin/airports?type=1',
      
       type: 'GET',
       error: function() {
          
       },
       dataType: 'json',
       success: function(data) {
        $scope.airports = data;
        console.log($scope.airports);
       }
       
    });
  };



  $scope.addflightRoute = function(){
    console.log($scope.departdate);
    console.log($scope.departdate);
    console.log($scope.departtime);
    console.log($scope.from.code);
    console.log($scope.arrivaldate);
    console.log($scope.arrivaltime);
    console.log($scope.to.code);
    console.log(transformDate($scope.departdate));
    console.log(transformDate($scope.arrivaldate));
    $.ajax({
        url: _url_host + 'api/v1/admin/destinations',
        data: {
          'dep_date' : transformDate($scope.departdate),
          'dep_time' : $scope.departtime,
          'dep_code' : $scope.from.code,
          'arr_date' : transformDate($scope.arrivaldate),
          'arr_time' : $scope.arrivaltime,
          'arr_code' : $scope.to.code
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
       success: function(data) {
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
