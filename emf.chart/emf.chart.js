/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.10-dev.581 built: 01-03-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["chart"] = {"libName":"chart","version":"1.0.10-dev.581","built":"2017-03-01"};

(function() {
    'use strict';

    angular.module('ep.chart', [
        'ep.templates',
        'ep.sysconfig'
    ]);
})();

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.chart.directive:epChartC3
    * @restrict E
    *
    * @description
    * Represents the epChartC3 directive - charts using C3.JS library
    *
    * The chart is drawn each time chartData is changed. chartData is of following structure:
    *
    *  {
    *      chartType: {one of defined chart types},
    *      xAxis: {
    *          label: {xAxis label},
    *          type: {xAxis type}
    *      },
    *      yAxis: {
    *          label: {yAxis label},
    *          type: {yAxis type}
    *      },
    *      data: {
    *          xValues: [],
    *          yValues: [[],[],...[]]
    *      },
    *      dateUnit: {'year'/'month'/'week'/'day'},
    *   };
    *
    *   The following chart types are supported:
    *   'LineChart','SplineChart','ScatterChart','BubbleChart','StackedAreaChart','ColumnChart','HorizontalBarChart',
    *   'LineAndBarChart''PieChart','DoughnutChart'
    *
    *   data must be prepared as follows:
    *      for pie/donut charts:
    *          dataX : [ [v1.x, v1.y], [v2.x, v2.y],...[vN.x, vN.y] ]
    *          dataY: undefined
    *      for all others:
    *          dataX : [xLabel, v1.x, v2.x,...vN.x]
    *          dataY : [
    *                      [yLabel_1, v1.y, v2.y,...vN.y],
    *                      [yLabel_2, v1.y, v2.y,...vN.y],
    *                      ...
    *                      [yLabel_N, v1.y, v2.y,...vN.y],
    *                  ]
    *
    *   other settings:
    *       height : 'view' | 'window' | integer (px) | function | element | selector
    *                this defines how the chart height is calculated. The width is responsive to the container
    *       heightOffset: 0 ( 25 - default) - an offset to the calculated height
    *       legend: (bool) - (default - true) display legend option
    *       zoom: (bool) - (default - true) display zoom option for appropriate charts
    *       stacked: (bool) - (default - true) display stacked option for appropriate charts
    *
    *       showOptions: (bool) - (default - true) display options on top of the chart
    *       autoHideLegends: (bool) - (default - true) auto hide legend when height is smaller than certain threshold
    *       legendHiddenText: (bool) - (default - [legend hidden]) text to display when legend is auto hidden
    *
    *
    *   Events:
    *       CHART_HAS_RESIZED_EVENT - fired after chart resize
    *       CHART_RESIZE_EVENT - this event will cause chart to resize
    *
    * @example
    *
    *      <ep-chart-c3 settings="chartData"></ep-chart-c3>
    */
    epChartC3Directive.$inject = ['$log', '$timeout', '$rootScope', 'epShellService', 'epShellConstants', 'epChartConstants'];
    angular.module('ep.chart').
        directive('epChartC3', epChartC3Directive);

    /*@ngInject*/
    function epChartC3Directive($log, $timeout, $rootScope, epShellService, epShellConstants, epChartConstants) {
        var baseChart = {
            ctype: 'bar'
        };

        var chartTypes = {
            'LineChart': _.extend(_.clone(baseChart),
                { name: 'Line', value: 'LineChart', ctype: 'line' }),
            'SplineChart': _.extend(_.clone(baseChart),
                { name: 'Spline', value: 'SplineChart', ctype: 'spline' }),
            'ScatterChart': _.extend(_.clone(baseChart),
                { name: 'Scatter', value: 'ScatterChart', ctype: 'scatter' }),
            'BubbleChart': _.extend(_.clone(baseChart),
                { name: 'Bubble', value: 'BubbleChart', ctype: 'scatter', point: true, color: true }),
            'StackedAreaChart': _.extend(_.clone(baseChart),
                {
                    name: 'Stacked Area', value: 'StackedAreaChart', ctype: 'area-spline', isStacked: true,
                    isArea: true, stackable: true
                }),
            'ColumnChart': _.extend(_.clone(baseChart),
                { name: 'Column', value: 'ColumnChart', ctype: 'bar', color: true, stackable: true }),
            'HorizontalBarChart': _.extend(_.clone(baseChart),
                {
                    name: 'Horizontal Bar', value: 'HorizontalBarChart', ctype: 'bar', rotated: true, color: true,
                    stackable: true
                }),
            'LineAndBarChart': _.extend(_.clone(baseChart),
                { name: 'Line and Bar', value: 'LineAndBarChart', ctype: 'bar' }),
            'PieChart': _.extend(_.clone(baseChart),
                { name: 'Pie', value: 'PieChart', ctype: 'pie', legend: true, category: 'pie' }),
            'DoughnutChart': _.extend(_.clone(baseChart),
                { name: 'Doughnut', value: 'DoughnutChart', ctype: 'donut', legend: true, category: 'pie' })
        };

        var colors = ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896',
            '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22',
            '#dbdb8d', '#17becf', '#9edae5'];

        var cSubChartMinHeight = 400;
        var cLegendHeightMin = 350;

        function getChart(type) {
            return chartTypes[type] || baseChart;
        }

        function getChartWidth(scope) {
            return angular.element(scope.state.chartElement).width();
        }

        function getHeight(scope) {
            var chartEl = angular.element(scope.state.theElement);
            //window option is default
            var newHeight = $(window).height() - chartEl.offset().top;
            var hh = scope.settings.height;
            if (hh === 'view' || hh === undefined) {
                var vc = angular.element('#viewContainer');
                if (vc.length) {
                    newHeight = vc.height() - chartEl.offset().top;
                }
            } else if (angular.isNumber(hh)) {
                newHeight = hh;
            } else if (angular.isFunction(hh)) {
                newHeight = hh();
            } else if (angular.isString(hh) || hh instanceof HTMLElement) {
                //selector passed
                var el = $(hh);
                if (el.length) {
                    newHeight = el.outerHeight(true);
                }
            }
            var heightOffset = (scope.settings.showOptions !== false) ? -25 : 30;
            if (angular.isFunction(scope.settings.heightOffset)) {
                heightOffset = scope.settings.heightOffset(newHeight);
            } else {
                heightOffset = (scope.settings.heightOffset ? scope.settings.heightOffset : heightOffset);
            }
            newHeight += heightOffset;
            return newHeight;
        }

        function setHeight(scope, isResize) {
            var ctrlHeight = getHeight(scope);
            var chartEl = angular.element(scope.state.chartElement);
            if (chartEl && chartEl.length) {
                chartEl.height(ctrlHeight);
            }
            if (isResize && scope.state.chart) {
                scope.state.chart.resize({
                    height: ctrlHeight
                });
                //Let the world know that chart has resized
                $rootScope.$emit(epChartConstants.CHART_HAS_RESIZED_EVENT, {
                    settings: scope.settings,
                    id: scope.state.chartId
                });
            }
            scope.state.chartHeight = ctrlHeight;
            scope.state.chartWidth = chartEl.width();
        }

        function drawChart(scope) {
            //wait until the directive element is visible then draw...
            //this makes sure the height is calculated right...
            var waitAndDraw = function() {
                if (!$(scope.state.theElement).is(':visible')) {
                    $timeout(function() {
                        waitAndDraw(scope)
                    }, 200);
                } else {
                    doDrawChart(scope)
                }
            };

            try {
                waitAndDraw();
            } catch (ex) {
                $log.error(ex);
                epShellService.hideProgressIndicator();
            }
        }

        function doDrawChart(scope) {
            scope.menuLegends = undefined;

            epShellService.showProgressIndicator();

            var settings = scope.settings;
            setHeight(scope, false);

            var xAxisHeight = 140;
            var isDateX = (settings.xAxis.type === 'date');
            var chart = getChart(settings.chartType);
            var isMultiYdata = (settings.data.yValues && settings.data.yValues.length > 1);

            scope.state.chartType = chart;
            scope.state.optStackedDisplay = (settings.stacked !== false) && isMultiYdata && chart.stackable;
            scope.state.optDataFmtDisplay = (chart.category === 'pie');
            scope.state.optZoomDisplay = (settings.zoom !== false) && (chart.category !== 'pie' && !chart.rotated);

            scope.state.legendSupported = (settings.legend !== false) && (chart.legend === true || isMultiYdata);
            scope.state.optLegendListDisplay = scope.state.optLegendDisplay = scope.state.legendSupported;
            var legendCount = chart.category === 'pie' ?
                scope.settings.data.xValues.length : scope.settings.data.yValues.length;
            scope.state.criteriaHideLegend = (scope.settings.autoHideLegends !== false) &&
                ((legendCount > 50) || (scope.state.chartHeight < cLegendHeightMin));
            if (scope.state.criteriaHideLegend) {
                scope.state.optLegend = false;
                scope.state.optLegendDisplay = false;
            }

            function calcBubbleRadius(d) {
                if (d.index === 0) { return 0; }

                var total = 0;
                angular.forEach(settings.data.yValues, function(arr) {
                    total += arr[d.index + 1];
                });
                var ret = (d.value / total) * 30;
                if (ret < 2) {
                    ret = 2;
                }
                return Math.round(ret);
            }

            var fnColor;
            if (!isMultiYdata && chart.color) {
                fnColor = function(color, d) {
                    return colors[d.index % colors.length];
                };
            }

            var ctypes;
            var columns = [];
            if (chart.category === 'pie') {
                columns = settings.data.xValues;
                //TO DO: optimize pie charts with dates
                if (isDateX) {
                    //check if they are really dates besides the 'others'
                    var processDates = false;
                    if (settings.data.xValues.length <= 1) {
                        processDates = true;
                    } else if (angular.isDate(settings.data.xValues[0][0]) ||
                        angular.isDate(settings.data.xValues[1][0])) {
                        processDates = true;
                    }
                    if (processDates) {
                        columns = [];
                        angular.forEach(settings.data.xValues, function(v) {
                            if (angular.isDate(v[0])) {
                                var d = moment(v[0]).format('YYYY, MMMM DD');
                                columns.push([d, v[1]]);
                            } else {
                                columns.push(v);
                            }
                        });
                    }
                }
            } else {
                if (chart.value === 'LineAndBarChart' && settings.data.yValues.length >= 2) {
                    //Line and bar we only display first two y-series
                    var lineLabel = settings.data.yValues[0][0];
                    ctypes = {};
                    ctypes[lineLabel] = 'line';
                    columns.push(settings.data.yValues[0]);
                    columns.push(settings.data.yValues[1]);
                } else {
                    angular.forEach(settings.data.yValues, function(arr) {
                        columns.push(arr);
                    });
                }
            }

            var formatX;
            //var formatX = isDateX ? '%Y-%m-%d' : undefined;
            if (isDateX) {
                xAxisHeight = 80;
                formatX = '%Y-%m-%d';
                if (settings.dateUnit === 'year') {
                    formatX = '%Y';
                } else if (settings.dateUnit === 'month') {
                    formatX = '%Y-%m';
                    //dateFmt    = function(d) {
                    //    return moment(d).format('mm-yy')
                    //}
                }
            } else {
                if (chart.category !== 'pie') {
                    //if string type, find longest
                    var x15 = _.find(settings.data.xValues, function(s) {
                        return (s ? s.length : 0) > 15;
                    });
                    if (!x15) {
                        xAxisHeight = 100;
                    }
                    if (scope.state.chartHeight < 200) {
                        xAxisHeight = 80;
                    }
                }

                formatX = function(x) {
                    var charsTrim = scope.state.chartHeight < 200 ? 10 : 20;
                    var ret = settings.data.xValues[x + 1];
                    if (ret && ret.length > charsTrim) {
                        ret = ret.substring(0, charsTrim) + '...';
                    }
                    return ret;
                };
            }

            var xDataCol;
            var xType = isDateX && chart.category !== 'pie' ? 'timeseries' : 'category';
            if (xType === 'timeseries') {
                columns.push(settings.data.xValues);
                xDataCol = settings.data.xValues[0];
            }

            var point;
            if (chart.value === 'BubbleChart') {
                //For bubble chart we calculate radius based on ratio of Y-axes
                point = {
                    r: isMultiYdata ? calcBubbleRadius : 15
                };
            }

            var g = {
                bindto: scope.state.chartElement[0],
                data: {
                    x: xDataCol,
                    columns: columns,
                    type: chart.ctype,
                    types: ctypes,
                    color: fnColor
                },
                point: point,
                axis: {
                    rotated: (chart.rotated === true),
                    x: {
                        type: xType,
                        tick: {
                            rotate: 75,
                            multiline: false,
                            format: formatX
                        },
                        height: xAxisHeight,
                        label: {
                            text: settings.xAxis.label,
                            position: (chart.rotated !== true) ? 'outer-center' : 'outer-middle'
                        }
                    },
                    y: {
                        label: {
                            text: settings.yAxis.label,
                            position: (chart.rotated !== true) ? 'outer-middle' : 'outer-center'
                        }
                    }
                },
                bar: {
                    width: {
                        ratio: 0.8
                        //max: 30
                    }
                },
                pie: {
                    label: {
                        format: function(value, ratio) {
                            if (scope.state.optDataFmt === 'percent') {
                                return (ratio * 100).toFixed(2) + '%';
                            }
                            return value;
                        }
                    }
                },
                donut: {
                    label: {
                        format: function(value, ratio) {
                            if (scope.state.optDataFmt === 'percent') {
                                return (ratio * 100).toFixed(2) + '%';
                            }
                            return value;
                        }
                    }
                },
                grid: {
                    x: {
                        show: false
                    },
                    y: {
                        show: true
                    }
                },
                legend: {
                    show: scope.state.legendSupported && scope.state.optLegend
                    //position: (chart.category === 'pie') ? 'right' : undefined,
                    //item: {
                    //    onclick: scope.onChartLegendClick
                    //}
                },
                zoom: {
                    enabled: scope.state.optZoomDisplay && scope.state.optZoom
                },
                subchart: {
                    show: scope.state.optZoomDisplay && scope.state.optZoom &&
                        (scope.state.chartHeight > cSubChartMinHeight)
                },
                onrendered: function() {
                    onRendered(scope);
                }
            };

            scope.state.chart = c3.generate(g);
        }

        function onRendered(scope) {
            $timeout(function() {
                scope.state.whenRendered = new Date();
                epShellService.hideProgressIndicator();
            });
        }

        function onResizeEvent(scope) {
            if (scope.state.$chartElement.is(':visible')) {
                $timeout.cancel(scope.state.timeoutResize);
                scope.state.timeoutResize = $timeout(function() {
                    var changed = false;
                    var width = getChartWidth(scope);
                    if (Math.abs(width - scope.state.chartWidth) > 20) {
                        scope.state.chartWidth = width;
                        changed = true;
                    }

                    var ctrlHeight = getHeight(scope);
                    if (Math.abs(ctrlHeight - scope.state.chartHeight) > 20) {
                        changed = true;
                    }
                    if (changed) {
                        scope.checkShowLegendOption();
                    }
                    setHeight(scope, true);
                }, 250);
            }
        }

        function postCompile($scope, iElement) {
            $scope.state = {
                theElement: iElement,
                chartElement: angular.element(iElement).find('#chartc3'),
                $chartElement: angular.element(angular.element(iElement).find('#chartc3')),
                chart: null,
                chartId: $scope.settings.id || $scope.$id,
                chartHeight: -1,
                selectAllLegend: true,

                optStacked: 'grouped',
                optStackedDisplay: false,
                optLegendListDisplay: false,
                optLegendDisplay: false,
                optLegend: true,
                optDataFmtDisplay: false,
                optDataFmt: 'percent',
                optZoomDisplay: false,
                optZoom: false
            };

            $scope.$watch('settings', function(newValue) {
                if (newValue) {
                    $scope.optZoom = false; //always reset zoom
                    drawChart($scope);
                }
            });

            $scope.fnOptStackedChanged = function() {
                var groups = [];
                if ($scope.state.optStacked === 'stacked') {
                    angular.forEach($scope.state.chart.data(), function(d) {
                        groups.push(d.id);
                    });
                }
                $scope.state.chart.groups([groups]);
            };

            ///-------------- LEGENDS ------------------------------->>>>>>>>>

            $scope.fnOptLegendChanged = function(bySizeCondition) {
                $scope.state.optLegend = !$scope.state.optLegend;
                epShellService.showProgressIndicator();
                if ($scope.state.optLegend) {
                    $scope.state.chart.legend.show();
                } else {
                    $scope.state.chart.legend.hide();
                }
                if (!bySizeCondition) {
                    $scope.state.previousOptLegend = false;
                }
            };
            $scope.fnOnLegendList = function() {
                if ($scope.menuLegends === undefined) {
                    $scope.menuLegends = [];
                    var menu = [];
                    var colors = $scope.state.chart.data.colors();

                    angular.forEach($scope.state.chart.data(), function(d) {
                        menu.push({
                            id: d.id,
                            caption: d.id,
                            checked: true,
                            color: colors[d.id] + '',
                            style: { backgroundColor: colors[d.id].toString() }
                        });
                    });
                    $scope.menuLegends = menu;
                    $scope.updateMenuLegendState();
                } else {
                    if ($scope.state.whenRendered > $scope.state.whenMenuLegendState) {
                        $scope.updateMenuLegendState();
                    }
                }
            };
            $scope.fnOnLegendChanged = function(item) {
                item.checked = !item.checked;
                $scope.state.chart.toggle(item.id);
            };

            $scope.fnLegendSelectAllChanged = function() {
                var arr = [];
                angular.forEach($scope.menuLegends, function(m) {
                    arr.push(m.id);
                    m.checked = $scope.state.selectAllLegend;
                });
                if (!$scope.state.selectAllLegend) {
                    $scope.state.chart.hide(arr);
                } else {
                    $scope.state.chart.show(arr);
                }
            };
            $scope.updateMenuLegendState = function() {
                //Upon chart render we call this method to sync chart legends with our custom legends
                if ($scope.menuLegends) {
                    //this approach does not work when legend is not displayed on chart on small devices
                    //var hiddenItems = $scope.state.$chartElement.find('.c3-legend-item-hidden');
                    //we have to hack into internal C3 stuff (internal.isTargetToShow)
                    angular.forEach($scope.menuLegends, function(m) {
                        m.checked = $scope.state.chart.internal.isTargetToShow(m.id);
                    });
                    $scope.state.whenMenuLegendState = new Date();
                }
            };

            ///<<<<<<<<<<<<<<<<-------------- LEGENDS -------------------------------

            $scope.fnOptDataFmtChanged = function() {
                $scope.state.chart.show();
            };

            $scope.fnOptZoomChanged = function() {
                $scope.state.chart.destroy();
                drawChart($scope);
                $scope.state.optZoomTip = ($scope.state.chartHeight > cSubChartMinHeight);
                if ($scope.state.optZoomTip) {
                    $timeout(function() {
                        $scope.state.optZoomTip = false;
                    }, 7000);
                }
            };

            $scope.checkShowLegendOption = function() {
                if ($scope.state.legendSupported && $scope.settings.autoHideLegends !== false) {
                    //media query has met condition and hidden
                    //var isLegendHidden = (angular.element($scope.state.theElement.find('.ep-opt-legend')).css('display') === 'none');
                    var legendCount = $scope.state.chartType.category === 'pie' ?
                        $scope.settings.data.xValues.length : $scope.settings.data.yValues.length;
                    $scope.state.criteriaHideLegend =
                        (legendCount > 50 || $scope.state.chartHeight < cLegendHeightMin);
                    if ($scope.state.criteriaHideLegend) {
                        $scope.state.optLegendDisplay = false;
                        if ($scope.state.optLegend) {
                            $scope.state.previousOptLegend = true;
                            $scope.fnOptLegendChanged(true);
                        }
                    } else {
                        $scope.state.optLegendDisplay = true;
                        if (!$scope.state.optLegend && $scope.state.previousOptLegend) {
                            $scope.fnOptLegendChanged(true);
                        }
                        $scope.state.previousOptLegend = false;
                    }
                }
            };

            epShellService.registerViewEvent('ep-resize-chart' + $scope.$id,
                epShellConstants.SHELL_SIZE_CHANGE_EVENT, function() {
                    onResizeEvent($scope);
                });

            //Watch for an outside event to resize. If chartId is passed than chart will
            //resize only if chartId is matched
            $rootScope.$on(epChartConstants.CHART_RESIZE_EVENT, function(chartId) {
                if (angular.isString(chartId) && (!chartId || chartId === $scope.state.chartId)) {
                    onResizeEvent($scope);
                }
            });
        }

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.chart/ep-chart-c3.html',
            scope: {
                'settings': '='
            },
            compile: function() {
                return {
                    pre: angular.noop,
                    post: postCompile
                };
            }
        };
    }
}());

/**
 * @ngdoc object
 * @name ep.chart.object:epChartConstants
 * @description
 * Constants for epChartConstants.
 * ep.chart constants
 */
(function() {
    'use strict';

    angular.module('ep.chart').constant('epChartConstants', {
        CHART_RESIZE_EVENT: 'EP_CHART_RESIZE_EVENT',
        CHART_HAS_RESIZED_EVENT: 'EP_CHART_HAS_RESIZED_EVENT'
    });
})();

//# sourceMappingURL=emf.chart.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.chart/ep-chart-c3-legends.html',
    "<div class=\"ep-chart-c3-legends form-group\"><span><label class=checkbox-inline><input type=checkbox ng-model=state.selectAllLegend ng-change=fnLegendSelectAllChanged()>All</label></span><div ng-repeat=\"item in menuLegends\"><button type=button class=\"btn btn-sm btn-block\" ng-class=\"{'ep-legend-off': item.checked !== true}\" ng-style=item.style ng-model=item.checked uib-btn-checkbox ng-click=fnOnLegendChanged(item)>{{item.caption}}</button></div></div>"
  );


  $templateCache.put('src/components/ep.chart/ep-chart-c3.html',
    "<div class=ep-chart-c3 ep-chart-id=state.chartId><div class=\"ep-chart-options form-group\" ng-if=\"settings.showOptions !== false\"><div class=checkbox><div ng-if=state.optLegendListDisplay class=\"ep-c3-legend-btn btn-group\" dropdown><button id=split-button type=button class=\"btn btn-default btn-sm\" uib-popover-template=\"'src/components/ep.chart/ep-chart-c3-legends.html'\" popover-placement=bottom-left popover-title=Legend popover-trigger=\"\" ng-click=fnOnLegendList()>Legend</button></div><span ng-if=state.optStackedDisplay><label class=radio-inline><input name=optradio type=radio value=grouped ng-model=state.optStacked ng-change=fnOptStackedChanged()>Grouped</label><label class=radio-inline><input name=optradio type=radio value=stacked ng-model=state.optStacked ng-change=fnOptStackedChanged()>Stacked</label></span> <span ng-if=state.optDataFmtDisplay><label class=radio-inline><input name=optradio type=radio value=percent ng-model=state.optDataFmt ng-change=fnOptDataFmtChanged()>Percent</label><label class=radio-inline><input name=optradio type=radio value=value ng-model=state.optDataFmt ng-change=fnOptDataFmtChanged()>Value</label></span> <span ng-if=state.optZoomDisplay style=\"margin-left: 10px\"><label class=checkbox-inline><input type=checkbox ng-model=state.optZoom ng-change=fnOptZoomChanged()>Zoom</label></span> <span ng-if=\"state.optZoomDisplay && state.optZoom && state.optZoomTip\" ng-click=\"state.optZoomTip = false\" class=\"well ep-fadein-animation\" style=\"margin-left: 10px\">to zoom-in select an area on the lower chart; to zoom-out double click on the lower chart.</span> <span ng-if=state.optLegendDisplay style=\"margin-left: 5px\" class=ep-opt-legend><label class=checkbox-inline><a ng-click=fnOptLegendChanged()>{{state.optLegend ? 'Hide legend' : 'Show legend' }}</a></label></span> <span ng-if=\"!state.optLegendDisplay && state.criteriaHideLegend && state.legendSupported && settings.legendHiddenText !== ''\" class=ep-opt-legend-hidden><label class=checkbox-inline>{{settings.legendHiddenText || '[legend hidden]'}}</label></span></div></div><div class=ep-chart-div><div id=chartc3></div></div></div>"
  );

}]);
