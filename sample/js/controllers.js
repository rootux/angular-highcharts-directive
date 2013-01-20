'use strict';

function MainCtrl($scope, $http) {
 	$http.get("charts/basicAreaChart.json").success(function(data) {
    	$scope.basicAreaChart = data;
	});
};