'use strict'

app.controller('addticketpriceCtrler', function($scope, $http, $state){

 	$scope.value = '';
 	$scope.price_code = '';

   $scope.getTaxesCode = function(){
    	
    	$.ajax({
		   url: _url_host + 'api/v1/admin/price?type=0',
		  
		   type: 'GET',
		   error: function() {
		      
		   },
		   dataType: 'json',
		   success: function(data) {
		   	 $scope.price_code = data.code;
		   }
		   
		});
    };

    $scope.addPrice = function(){
    	if($scope.price_code != '' & $scope.value != ''){
    		$.ajax({
			   	url: _url_host + 'api/v1/admin/price',
			   	data: {
			      'code' : $scope.price_code,
			      'value' : $scope.value
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
