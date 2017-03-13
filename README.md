Angular Highcharts Directive
============================

An [angular](http://angularjs.org/) directive that wraps around [highcharts](http://www.highcharts.com).

See the code below for this convenient and modelar integration.

![USing this directive along with some of the code](https://raw.github.com/rootux/angular-highcharts-directive/master/screenshot_sample.png "Using angular highcharts directive")


### HTML
```html
<div>
    <chart value="basicAreaChart" type="area" height="400"></chart>
</div>
```

### Angular
```javascript
'use strict';

angular.module('chartsExample.controllers', []).controller('MainCtrl', ['$scope', '$http', function($scope, $http) {
    $http.get("charts/basicAreaChart.json").success(function(data) {
        $scope.basicAreaChart = data;
    });
}]);
```
