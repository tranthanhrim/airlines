'use strict';

airlinesApp.controller("bookTripController", function($scope, $http, $stateParams) {
    var vm = this;
    vm.tab = 0;
    vm.mode = '';
    vm.departFlights = '';
    vm.returnFlights = '';

    vm.init = function(){
    	vm.mode = $stateParams.mode;
    	if(vm.mode === 'isRoundTrip'){
    		vm.departFlights = $stateParams.flights;
    	}else{
    		//vm.departFlights = $stateParams.flights
    	}
    	console.log($stateParams.flights);
    }

    vm.navigate = function (param){
		if(param==='next'){
			if(vm.tab<2){
				vm.tab++;
				//$('.nav-pills li:eq("'+ vm.tabId +'") a').tab('show');
			}
		}else{
			if(vm.tab>0){
				vm.tab--;
				//$('.nav-pills li:eq("'+ vm.tabId +'") a').tab('show');
			}
		}
	};

	vm.isSet = function(tabId){
		return vm.tab === tabId;
	};
  
    vm.isSetActive = function(tabId){
		return vm.tab >= tabId;
	};  
});
