'use strict'

app.controller('addTaxCtrler', function($scope, $http, $state){
    $scope.value = '';
    $scope.taxes_code = '';

    $scope.getTaxesCode = function(){
    	$.ajax({
		   url: _url_host + 'api/v1/admin/taxes?type=0',
		  
		   type: 'GET',
		   error: function() {
		      
		   },
		   dataType: 'json',
		   success: function(data) {
		   	 $scope.taxes_code = data.code;
		   }
		   
		});
    };

    $scope.addTaxes = function(){
    	if($scope.taxes_code != '' & $scope.value != ''){
    		$.ajax({
			   	url: _url_host + 'api/v1/admin/taxes',
			   	data: {
			      'code' : $scope.taxes_code ,
			      'value' : $scope.value
			   	},
			   	type: 'post',
			   	error: function(jqXHR, textStatus, errorThrown) {
			      //show popup loi
			    	console.log(jqXHR);
					console.log(textStatus);
					console.log(errorThrown);

			   },
			   dataType: 'json',
			   success: function(data) {
			   		alert("success");
			   }
		   
			});
    	}
    	
    }
})
