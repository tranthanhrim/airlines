'use strict';

airlinesApp.controller("listPassengersController", function($scope, $http, $stateParams) {
	var vm = this;
	vm.code = null;
	vm.passengers = null;

	vm.init = function(){
		vm.code = $stateParams.code;
		vm.passengers = $stateParams.passengers;
	}
});
