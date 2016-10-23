'use strict'

airlinesApp.controller('homeController', function($scope,$http,$state) {
  var vm = this;

  vm.limitNumOfChild = limitNumOfChild;
  vm.searchFlight = searchFlight;
  vm.searchCode = searchCode;

  vm.mode = 'isRoundTrip';

  vm.Hello = 'Hello World';
  vm.fromAirports = [];
  vm.arrivalAirports = [];
  vm.detailSearch = {
    'dep_airport_code': '',
    'arr_airport_code': '',
    'depart': '',
    'return': '',
    'adult':'',
    'children':'',
    'infan':''
  };


  vm.from = '';
  vm.to = '';
  var linkAPI = '';
  vm.yourCode = '';

  $('#dateDepart').datepicker();
  $('#dateReturn').datepicker();

  vm.init = function(){
    $.getJSON("./config.json", function(data) {
      linkAPI = data.link;

      var apiGetDepartureAirport = linkAPI + '/api/v1/departure_airports';
      $http.get(apiGetDepartureAirport).then(function(res){
        console.log(res.data);
        vm.fromAirports = res.data;
      });

    });
  };

  vm.requestArrivalAirport = function(){
    var request = linkAPI + '/api/v1/arrival_airports?code=' + vm.from.code;
    $http.get(request).then(function(res){
      console.log(res.data);
      vm.arrivalAirports = res.data;
    });
  };

  function limitNumOfChild(){
    //console.log(vm.detailSearch.adult);
  }

  function searchCode(){
    var apiGetListPassengers = linkAPI + '/api/v1/passengers?code_ticket=' + vm.yourCode;
    $http.get(apiGetListPassengers).then(function(res){
        console.log(res.data);
        vm.fromAirports = res.data;
      });
  }

  function searchFlight(){
    var isHaveFieldBlank = false;
    $(':input[required]', $('#formSearch')).each( function () {
      if (this.value.length === 0 || this.value.trim() === '') {
          isHaveFieldBlank = true;
      }
    });

    // if(isHaveFieldBlank === true){
    //   return;
    // }

    $('#bookTicket').modal('hide');

    // console.log('hihi');
    // console.log(dataToJSON());
    var data = {
      "dep_airport_code": 'SGN',
      "arr_airport_code": 'UIH',
      "depart": '15/11/2016',
      "passengers":[
        {
          "adult": 1
        },{
          "children": 0
        },{
          "infan": 0
        }
      ]
    };

    var url = '';

    // if(vm.mode === 'isRoundTrip'){
    //   url = 'https://webbooking.herokuapp.com/api/v1/destinations/roundtrip';
    //   data = {
    //     "dep_airport_code": 'UIH',
    //     "arr_airport_code": 'SGN',
    //     "depart": '10/11/2016',
    //     "return": '17/11/2016',
    //     "passengers":[
    //       {
    //         "adult": '1'
    //       },{
    //         "children": '0'
    //       },{
    //         "infan": '0'
    //       }
    //     ]
    //   }
    // }
    // else{
    //   url = 'https://webbooking.herokuapp.com/api/v1/flights/oneway';
    //   data = {
    //     "dep_airport_code": 'UIH',
    //     "arr_airport_code": 'SGN',
    //     "depart": '10/11/2016',
    //     "passengers":[
    //       {
    //         "adult": '1'
    //       },{
    //         "children": '0'
    //       },{
    //         "infan": '0'
    //       }
    //     ]
    //   }
    // }

    // $http({
    //   method: 'POST',
    //   url: url,
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
    //   },
    //   transformRequest: function(obj) {
    //       var str = [];
    //       for(var p in obj)
    //       str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    //       return str.join("&");
    //   },
    //   // data: {
    //   //   dep_airport_code: 'SGN',
    //   //   arr_airport_code: 'UIH',
    //   //   depart: '15/11/2016',
    //   //   passengers:[
    //   //     {
    //   //       "adult": 1
    //   //     },{
    //   //       "children": 0
    //   //     },{
    //   //       "infan": 0
    //   //     }
    //   //   ]         
    //   // },
    //   data: data
    // })
    // .success(function(response){
    //   console.log(response);     
    //   var dataPassengers = {
    //     'adult': vm.detailSearch.adult,
    //     'children': vm.detailSearch.children,
    //     'infan': vm.detailSearch.infan
    //   }
    //   $state.go('booktrip', {mode: vm.mode, flights: response, passengers: dataPassengers})
    // });
    if(vm.mode === 'isOneWay'){
      url = linkAPI + '/api/v1/flights/oneway';
    }else{
      url = linkAPI + '/api/v1/flights/roundtrip';
    }

    $.ajax({
      type: 'POST',
      contentType: 'application/json',
      url: url,
      dataType: 'json',
      data: dataSearchFlightToJSON(),
      success: function(data, textStatus, jqXHR){
        console.log(data);
        var dataPassengers = {
          // 'adult': vm.detailSearch.adult,
          // 'children': vm.detailSearch.children,
          // 'infan': vm.detailSearch.infan
          'adult': 1,
          'children': 0,
          'infan': 0
        };
        $state.go('booktrip', {mode: vm.mode, flights: data, passengers: dataPassengers});
      },
      error: function(jqXHR, textStatus, errorThrown){
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
      }
    });
  }
  
  function dataSearchFlightToJSON(){
    if(vm.mode === 'isOneWay'){
      return JSON.stringify({
        'dep_airport_code': 'UIH',
        'arr_airport_code': 'SGN',
        'depart': '10/11/2016',
        'passengers': [
          {
            'adult': 1
          },{
            'children': 0
          },{
            'infan': 0
          }
        ]
      });
    }
    else{
      return JSON.stringify({
        'dep_airport_code': 'UIH',
        'arr_airport_code': 'SGN',
        'depart': '10/11/2016',
        'return': '15/11/2016',
        'passengers': [
          {
            'adult': 1
          },{
            'children': 0
          },{
            'infan': 0
          }
        ]
      });
    }
  }

  $("input[name='round']").change(function(){
    if ($("input[name='round']:checked").val() === "isRoundTrip"){
      //alert("Hello! I am an alert box!!");
      $("#divReturn").show();
    }
    else{
      $("#divReturn").hide();
    }
  });
});