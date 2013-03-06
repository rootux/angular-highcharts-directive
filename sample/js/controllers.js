'use strict';

angular.module('chartsExample.controllers',[]).controller('MainCtrl', ['$scope','$http', 
	function($scope,$http) {
 		$http.get("charts/basicAreaChart.json").success(function(data) {
    		$scope.basicAreaChart = data;
		});
}]);