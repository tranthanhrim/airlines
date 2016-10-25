'use strict'

app.controller('addAirportCtrler', function($scope, $http, $state){

	$scope.airportcode = '';
	$scope.airportname = '';
	$scope.area = [];
	$scope.areacode = '';
	$scope.areaname = '';
	$scope.to = ''; 
	$scope.acode = '';
	$scope.Airports = [];

   	$scope.getAirportCode = function(){
    	
    	$.ajax({
		   url: _url_host + 'api/v1/admin/airports?type=0',
		  
		   type: 'GET',
		   error: function(textStatus, errorThrown) {
		   	 alert(textStatus, errorThrown);
		   },
		   dataType: 'json',
		   success: function(data, textStatus) {
		   	 $scope.airportcode = data.code;
		   	 console.log($scope.airportcode);
		   }		   
		});
    };

    $scope.init = function() { 
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
    };

    $scope.getAreas = function(){
    	
    	$.ajax({
		   url: _url_host + 'api/v1/admin/areas',
		  
		   type: 'GET',
		   error: function() {
		      
		   },
		   dataType: 'json',
		   success: function(data) {
		   	 $scope.area = data;
		   	 console.log(data);
		   }
		   
		});
    };

    $scope.addAirport = function(){
    	if($scope.price_code != '' & $scope.value != ''){
    		$.ajax({
			   	url: _url_host + 'api/v1/admin/airports',
			   	data: {
			      'code' : $scope.acode,
			      'name' : $scope.airportname,
			      'code_area' : $scope.areacode,
			      'arrival' : [{"code" : $scope.to.code}]
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
			   success: function(data, textStatus) {
			   		console.log(textStatus);
			   		alert("success");
			   }
		   
			});
    	}
    	
    }
})