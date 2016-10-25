'use strict'

app.controller('addAirportCtrler', function($scope, $http, $state){

	// $scope.airportcode = '';
	$scope.airportname = '';
	$scope.areas = [];
	// $scope.area = '';
	$scope.areacode = '';
	$scope.areaname = '';
	$scope.to = ''; 

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
		   	$("#airportcode").val(data.code);

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
		   	 $scope.areas = data;
		   	 console.log($scope.areas);
		   }
		   
		});
    };

    $scope.addAirport = function(){
    	var t = [];
    	var temp = {"code" : $scope.to.code};
    	t.push(temp);
    	// console.log(t);
    	// console.log($scope.to.code);
    	// console.log($('#airportcode').val());
    	// console.log($scope.airportname);
    	// console.log($scope.area.code_area);
    	if($scope.price_code != '' & $scope.value != ''){
    		$.ajax({
			   	url: _url_host + 'api/v1/admin/airports',
			   	data: {
			      'code' : $('#airportcode').val(),
			      'name' : $scope.airportname,
			      'code_area' : $scope.area.code_area,
			      'arrival' : t
			   	},
			   	type: 'post',
			   	error: function(jqXHR, textStatus, errorThrown) {
			      //show popup loi
			    	console.log(textStatus);
					console.log(errorThrown);
					alert(textStatus);

			   },
			   dataType: 'json',
			   success: function(data, textStatus) {
			   		console.log(textStatus);
			   		alert("successfully");
			   }
		   
			});
    	}
    	
    }
})