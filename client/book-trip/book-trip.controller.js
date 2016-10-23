'use strict';

airlinesApp.controller("bookTripController", function($scope, $http, $stateParams) {
    var vm = this;
    vm.tab = 0;
    vm.mode = '';
    vm.departFlights = '';
    vm.returnFlights = '';
    vm.passengers = '';
    vm.totalPassengers = -1;
    vm.allCountries = '';

    vm.bookDetail = {
    	code_depart_flight: '',
    	code_return_flight: '',
    	depart: '',
    	adult: '',
    	children: '',
		infan: '',
		class: ''
    };

    vm.bookDetailRoundTrip = {
    	
    };

    vm.init = function(){
    	$('#dateOfBirth').datepicker();
    	$('#expiredDay').datepicker();

    	vm.mode = $stateParams.mode;
    	vm.passengers = $stateParams.passengers;
    	vm.totalPassengers = parseInt(vm.passengers.adult, 10) + parseInt(vm.passengers.children, 10) + parseInt(vm.passengers.infan, 10);
    	
    	if(vm.mode === 'isOneWay'){
    		vm.departFlights = $stateParams.flights;
    	}else{
    		vm.departFlights = $stateParams.flights.departure;
    		vm.returnFlights = $stateParams.flights.return;

    	}

    	$http.get('https://restcountries.eu/rest/v1/all').then(function(res){
	      console.log(res.data);
	      vm.allCountries = res.data;
	    });
    }

    vm.navigate = function (param){
		if(param==='next'){
			if(vm.tab===0){
				if(checkSelectedFlight() === true){
					$('#modalSelectedFlight').modal('show');
					return;
				}
			}



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

	vm.isModeOneWay = function(){
		return vm.mode === 'isOneWay';
	}

	vm.finishBookTrip = function(){
		// if(vm.formPassengers.$valid){

		// }
		//$('#formPassengers').submit();
		$(':input[required]', $('#formSearch')).each( function () {
	      if (this.value.length === 0 || !this.value.trim()) {
	          console.log('hihi');
	      }
	    });
	}

	function checkSelectedFlight(){
		if(vm.mode === 'isOneWay'){
			return vm.bookDetail.code_depart_flight !== '';
		}else{
			return vm.bookDetail.code_depart_flight !== '' && vm.bookDetail.code_return_flight !== '';
		}
	}
});
