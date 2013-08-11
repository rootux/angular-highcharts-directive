'use strict';

angular.module('highcharts',[])

.directive('chart', function () {
  return {
		restrict: 'E',
		scope: {
			data: "="
		},
		transclude: true,
		link: function (scope, element, attrs) {
			var chartsDefaults = {
				chart: {
					renderTo: element[0],
					type: attrs.type || null,
					height: attrs.height || null,
					width: attrs.width || null
				}
			};

			//Update when charts data changes
			scope.$watch('data', function(value) {
				if(!value)
					return;

				var newSettings = {};
				angular.extend(newSettings, chartsDefaults, scope.data);
				var chart = new Highcharts.Chart(newSettings);
			}, true);
		}
	};
});
