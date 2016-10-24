'use strict';

airlinesApp.controller("bookTripController", function($scope, $http,$state, $stateParams) {
    var vm = this;
    vm.tab = 0;
    vm.mode = '';
    vm.departFlights = '';
    vm.returnFlights = '';
    vm.allCountries = '';

    vm.typePassengers = '';
    vm.totalPassengers = -1;
    vm.mainPassengers = {
		'firstname': '',
		'lastname': '',
		'sex': '',
		'birth': '',
		'email': '',
		'phone_mobile': '',
		'phone_home': '',
		'passport': {
			'number': '',
			'country': '',
			'nationality': '',
			'expdate': ''
		}
    };
    vm.subPassengers = { fields: [] };

    vm.bookDetail = {
    	'depart_flight': null,
    	'return_flight': null,
    	'class_depart_selected': '',
    	'class_return_selected': ''
    };

    var linkAPI = '';
    var apiUrlTicket = '';
    vm.codeTicket = '';

    vm.init = function(){
    	$('#dateOfBirth').datepicker();
    	$('#expiredDay').datepicker();

	    $.ajax({
	      type: "GET" ,
	      url: "./config.xml" ,
	      dataType: "xml" ,
	      success: function(xml) {
	        linkAPI = $(xml).find('api').text();

	    	vm.mode = $stateParams.mode;
			vm.typePassengers = $stateParams.passengers;
			vm.totalPassengers = parseInt(vm.typePassengers.adult, 10) + parseInt(vm.typePassengers.children, 10) + parseInt(vm.typePassengers.infan, 10);

			for(var i=0; i<vm.totalPassengers; i++){
				vm.subPassengers.fields.push({
					'firstname': '',
					'lastname': '',
					'sex': '',
					'birth': '',
					'email': '',
					'phone_mobile': '',
					'phone_home': '',
					'passport': {
						'number': '',
						'country': '',
						'nationality': '',
						'expdate': ''
					}
				});
			}
			
			if(vm.mode === 'isOneWay'){
				vm.departFlights = $stateParams.flights;
				apiUrlTicket = linkAPI + '/api/v1/tickets/oneway';
			}else{
				vm.departFlights = $stateParams.flights.departure;
				vm.returnFlights = $stateParams.flights.return;
				apiUrlTicket = linkAPI + '/api/v1/tickets/roundtrip';
			}
	      }
	    });

		// $.getJSON("./config.json", function(data) {
		// 	linkAPI = data.link;			
		// });

    	$http.get('https://restcountries.eu/rest/v1/all').then(function(res){
	      console.log(res.data);
	      vm.allCountries = res.data;
	    });
    }

    vm.navigate = function (param){
		if(param==='next'){
			if(vm.tab===0){
				if(isSelectedFlightNULL() === true){
					$('#modalSelectedFlight').modal('show');
					return;
				}
				else{
					console.log(dataBookTicketToJSON());
				    $.ajax({
				      type: 'PUT',
				      contentType: 'application/json',
				      url: apiUrlTicket,
				      dataType: 'json',
				      data: dataBookTicketToJSON(),
				      success: function(data, textStatus, jqXHR){
				        vm.codeTicket = String(data.code_ticket);
				        console.log(data);
				      },
				      error: function(jqXHR, textStatus, errorThrown){
				          console.log(jqXHR);
				          console.log(textStatus);
				          console.log(errorThrown);
				      }
				    });	
				}			
			}
			else if (vm.tab===1){
				console.log(dataPassengersToJSON());
			    $.ajax({
			      type: 'PUT',
			      contentType: 'application/json',
			      url: linkAPI + '/api/v1/passengers',
			      dataType: 'json',
			      data: dataPassengersToJSON(),
			      success: function(data, textStatus, jqXHR){
			        vm.codeTicket = String(data.code_ticket);
			        if(vm.tab<2){
			        	vm.tab++;
			        }
			        console.log(data);
			      },
			      error: function(jqXHR, textStatus, errorThrown){
			          console.log(jqXHR);
			          console.log(textStatus);
			          console.log(errorThrown);
			      }
			    });	
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

	vm.checkSeat = function(param){
		return param == 0;
	}

	vm.finishBookTrip = function(){
	    $state.go('home');
	}

	vm.setDepartFlight= function(paramFlight, paramClass){
		vm.bookDetail.depart_flight = paramFlight;
		vm.bookDetail.class_depart_selected = paramClass;
	}

	vm.setReturnFlight = function(paramFlight, paramClass){
		vm.bookDetail.return_flight= paramFlight;
		vm.bookDetail.class_return_selected = paramClass;
	}

	function isSelectedFlightNULL(){
		if(vm.mode === 'isOneWay'){
			return vm.bookDetail.depart_flight === null;
		}else{
			return vm.bookDetail.depart_flight === null || vm.bookDetail.return_flight === null;
		}
	}

	function dataBookTicketToJSON(){
		if(vm.mode === 'isOneWay'){
			return JSON.stringify({
				'code_flight': vm.bookDetail.depart_flight.code,
				'depart': vm.bookDetail.depart_flight.from.date,
				'class': vm.bookDetail.class_depart_selected,
				'passengers': [
					{
					'adult': vm.typePassengers.adult
					},{
					'children': vm.typePassengers.children
					},{
					'infan': vm.typePassengers.infan
					}
				]
			});
		}else{
			return JSON.stringify({
				'code_flight_depart': vm.bookDetail.depart_flight.code,
				'code_flight_return': vm.bookDetail.return_flight.code,
				'depart': vm.bookDetail.depart_flight.from.date,
				'return': vm.bookDetail.return_flight.from.date,
				'class_depart': vm.bookDetail.class_depart_selected,
				'class_return': vm.bookDetail.class_return_selected,
				'passengers': [
					{
					'adult': vm.typePassengers.adult
					},{
					'children': vm.typePassengers.children
					},{
					'infan': vm.typePassengers.infan
					}
				]
			});
		}
	}

	function dataPassengersToJSON(){
		for(var i=0; i<vm.subPassengers.fields.length; i++){
			vm.subPassengers.fields[i].passport.country = vm.subPassengers.fields[i].passport.country.name;
			vm.subPassengers.fields[i].passport.nationality = vm.subPassengers.fields[i].passport.nationality.name;
		}
		return JSON.stringify({
			'code_ticket': vm.codeTicket,
			'passengers': vm.subPassengers.fields
		});
	}
});
