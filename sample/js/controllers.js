'use strict';

angular.module('chartsExample.controllers',[]).controller('MainCtrl', ['$scope','$http', 
	function($scope,$http) {
	    $scope.chartObj; // this will contain a reference to the highcharts' chart object
 		$http.get("charts/basicAreaChart.json").success(function(data) {
    		$scope.basicAreaChart = data;
		});
}]);