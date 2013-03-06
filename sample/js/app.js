'use strict';

angular.module('chartsExample', ['chartsExample.directives','chartsExample.controllers'],
	function($routeProvider, $locationProvider) {
		$routeProvider.when('/', { 
			templateUrl: 'views/main.html',
			controller: 'MainCtrl',
		}).otherwise({ //for example when running locally (No '/' at the url), this will be loaded
			templateUrl: 'views/main.htm',
			controller: 'MainCtrl',
		});
	});