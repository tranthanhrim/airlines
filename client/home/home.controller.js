'use strict'

airlinesApp.controller('homeController', function($scope,$http,$state) {
  var vm = this;

  vm.limitNumOfChild = limitNumOfChild;
  vm.searchFlight = searchFlight;

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

  $('#dateDepart').datepicker();
  $('#dateReturn').datepicker();

  vm.init = function(){
    $http.get('https://webbooking.herokuapp.com/api/v1/departure_airports').then(function(res){
      console.log(res.data);
      vm.fromAirports = res.data;
    });
  };

  vm.requestArrivalAirport = function(){
    var request = 'https://webbooking.herokuapp.com/api/v1/arrival_airports?code=' + vm.from.code;
    $http.get(request).then(function(res){
      console.log(res.data);
      vm.arrivalAirports = res.data;
    });
  };

  function limitNumOfChild(){
    console.log(vm.detalSearch.adult);
  }

  function searchFlight(){
    // $(':input[required]', $('#formSearch')).each( function () {
    //   if (this.value.length === 0 || !this.value.trim()) {
    //       return;
    //   }
    // });
    $('#bookTicket').modal('hide');

    // console.log('hihi');
    // console.log(dataToJSON());
    var datax = {
      dep_airport_code: 'SGN',
      arr_airport_code: 'UIH',
      depart: '15/11/2016',
      passengers:[
        {
          "adult": 1
        },{
          "children": 0
        },{
          "infan": 0
        }
      ]
    }
      
    // var config = {
    //     headers : {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'
    //     }
    // }

    // $http.post('https://webbooking.herokuapp.com/api/v1/destinations/oneway', data, config)
    //   .success(function (data, status, headers, config) {
    //       console.log(data);
    //   })
    //   .error(function (data, status, header, config) {
          
    //   });

    $http({
      method: 'POST',
      url: 'https://webbooking.herokuapp.com/api/v1/destinations/oneway',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded' // Note the appropriate header
      },
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
      },
      // data: {
      //   dep_airport_code: 'SGN',
      //   arr_airport_code: 'UIH',
      //   depart: '15/11/2016',
      //   passengers:[
      //     {
      //       "adult": 1
      //     },{
      //       "children": 0
      //     },{
      //       "infan": 0
      //     }
      //   ]         
      // },
      data: datax
    })
    .success(function(response){
      console.log(response);
      console.log('expected!');
      
      
      // $('#bookTicket').on('hidden', function () {
      //   $state.go('booktrip', {mode: vm.mode, flights: response});
      // });

      $state.go('booktrip', {mode: vm.mode, flights: response})

    });

  }
  
  function dataToJSON(){
    return JSON.stringify({
        'dep_airport_code': 'SGN',
        'arr_airport_code': 'UIH',
        'depart': '15/11/2016',
        'passengers':[
          {
            'adult': 1
          },{
            'children': 0
          },{
            'infan': 0
          }
        ]
    });
    // return JSON.stringify({
    //     'dep_airport_code': vm.from.code,
    //     'arr_airport_code': vm.to.code,
    //     'depart': vm.detailSearch.depart,
    //     'return': vm.detailSearch.return,
    //     'passengers':[
    //       {
    //         'adult': vm.detailSearch.adult
    //       },{
    //         'children': vm.detailSearch.children
    //       },{
    //         'infan': vm.detailSearch.infan
    //       }
    //     ]
    // });
  }

  $("input[name='round']").change(function(){
    if ($("input[name='round']:checked").val() === "roundTrip"){
      //alert("Hello! I am an alert box!!");
      $("#return").show();
    }
    else{
      $("#return").hide();
    }
  });
});