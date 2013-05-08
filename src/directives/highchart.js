'use strict';

angular.module('chartsExample.directives',[])

.directive('chart', ['$filter',
    function ($filter) {
        return {
            restrict: 'E',
            template: '<div></div>',
            transclude: true,
            replace: true,
            scope: {
                value: '@',
                hiddenSeries: '='
            },

            link: function (scope, element, attrs) {
                scope.chart = null;

                // When the chart is redrawn we want to consolidate the visible items
                // with the object scope.hiddenSeries
                var redrawCallback = function (event) {
                    var series = event.currentTarget.series;
                    var hiddenItems = [];
                    // Push all of the invisible items
                    for (var s in series) {
                        if (!series[s].visible) {
                            hiddenItems.push(s);
                        }
                    };
                    // If the new array is different than the old one, edit the scope variable
                    if (!angular.equals(scope.hiddenSeries, hiddenItems)) {
                        angular.copy(hiddenItems, scope.hiddenSeries);
                        // Since the event is called outside of AngularJS, we have to apply the changes
                        scope.$apply();
                    }
                };

                var chartsDefaults = {
                    chart: {
                        renderTo: element[0],
                        events: { redraw: redrawCallback },
                        type: attrs.type || null,
                        height: attrs.height || null,
                        width: attrs.width || null
                    }
                };

                var showHideSeries = function () {
                    if (!scope.chart) return;
                    // Loop through the chart series
                    for (var s in scope.chart.series) {
                        // Show or hide the series in scope.hiddenSeries
                        var show = !($filter('filter')(scope.hiddenSeries, s).length);
                        scope.chart.series[s].setVisible(show, false);
                    }
                    scope.chart.redraw();
                };

                // Update when charts data changes
                scope.$watch(function () { return attrs.value; }, function (value) {
                    if (!attrs.value) return;
                    // We need deep copy in order to NOT override original chart object.
                    // This allows us to override chart data member and still the keep
                    // our original renderTo will be the same
                    var deepCopy = true;
                    var newSettings = {};
                    $.extend(deepCopy, newSettings, chartsDefaults, JSON.parse(attrs.value));
                    scope.chart = new Highcharts.Chart(newSettings);
                    // Consolidate series
                    showHideSeries();
                });

                // Hide or show some series when they change
                scope.$watch('hiddenSeries', function (newValue, oldValue) {
                    if (!scope.chart) return;
                    showHideSeries();
                });
            }
        }

    }
]);