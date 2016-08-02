
var app = angular.module('myApp',['ngRoute','chart.js'])
  .run(function($rootScope){
    //options for chart from chart.js. 
    $rootScope.options = {

      animation: {
        duration: 0.0
      },
      elements: {
        line: {
          borderWidth: 0.5
        },
        point: {
          radius: 2
        }
      },
      legend: {
        display: false
      },
      scales: {
        xAxes: [{
          display: true
        }],
        yAxes: [{
          display: true
        }],
        gridLines: {
          display: true
        }
      },
      tooltips: {
        enabled: true
      }
    };

    /*Limit data points displayed on graph to avoid congestion. Can add more datapoints
    or less by adjusting limit parameter passed in. */
    $rootScope.limitArrayLength = function(limit,oldArray,newArray){
      var j = 0;

      if(limit <= oldArray.length){
        for(var i = oldArray.length - limit; i < oldArray.length; i++){
          newArray[j] = oldArray[i];
          j++;
        }
        return newArray;
      } else {
        return oldArray;
      }
    }

    //extra options for charts. setting background-color to transparent allows area below the graph to not be drawn
    $rootScope.dataSetOverride = [{
      //backgroundColor:"transparent",
      pointHoverRadius: 8
    }]

    //function to change color of critical raw table data depending on warn value passed in of metric and thresholds.
    $rootScope.changeTableColor = function(warningLabel){
      switch(warningLabel){
        case "above": return '#8E0F0F';
        case "below": return '#0B84C1';
        default: return;
      }
    }

    //function to change color of number data depending on value and thresholds.
    $rootScope.changeNumberColor = function(value, minValue, maxValue){
      if(minValue <= -1 || maxValue <= -1){
        return;
      }
      if(value <= minValue){
        return '#0B84C1';
      }
      if(value >= maxValue){
        return '#8E0F0F';
      }
    }

  });

//sets template and controllers based on route
app.config(['$routeProvider','$locationProvider',function($routeProvider,$locationProvider,$routeParams) {
  
  $routeProvider
    .when('/',
      {
        templateUrl: "dashboard.html",
        controller:"dashboardCtrl"
      })
    .when('/stacked',
      {
        templateUrl:"stackedDashboard.html",
        controller: "dashboardCtrl"
      })
    .when('/metric/find/:kpi',
    {
      templateUrl:"kpi.html",
      controller: "kpiCtrl"
    });
}]);

//controller for individual metric
app.controller("kpiCtrl", function($scope, $http, $routeParams,$interval){
 
  //function to query database every second and return metric based on the route and routeparams specified
  var queryDatabase = $interval(function () {
    $http.get('/metric/find/' + $routeParams.kpi).then(function(res){
      if(!angular.equals($scope.kpiData,res.data)){
        $scope.kpiData = res.data; 
      }
    })
  },1000);

  //ends interval after route is changed
  $scope.$on('$destroy',function(){
    if(queryDatabase)
        $interval.cancel(queryDatabase);   
  });

});

//controller for bar and links on top of page
app.controller("indexCtrl", function ($scope,$interval,$http,$timeout){

  $scope.list = []

  //set list to data received from query  
  $http.get('/metric/list').then(function(res){
    $scope.list = res.data;
  });

  //query database every second to update values
  $interval(function () {
    $http.get('/metric/list').then(function(res){

      //compares new data from query request to current list of data to not always replace current list. Just a quick fix
      if(!angular.equals($scope.list,res.data)){ 
          
          $scope.list = res.data;
      }
    })
  },1000);

});

//controller for dashboard view
app.controller("dashboardCtrl", function ($scope,$interval,$http,$timeout) {
  
  //quick fix for ng-repeating over 5 elements
  $scope.indexForRepeat = 5;
  $scope.getNumber = function(num){
      return new Array(num);
  }
    
  $scope.list = []

  //set list to data received from query  
  $http.get('/metric/list').then(function(res){
   $scope.list = res.data;
  })

  //query database every second to update values
  var queryDatabase =  $interval(function () {
    
    //compares new data from query request to current list of data to not always replace current list. Just a quick fix
    $http.get('/metric/list').then(function(res){
      if(!angular.equals($scope.list,res.data)){ 
        $scope.list = res.data;
      }
    })
  },1000);

  //ends interval after route is changed
  $scope.$on('$destroy',function(){
      if(queryDatabase)
        $interval.cancel(queryDatabase);   
  });

});




        

	
