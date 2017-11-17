/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.27-dev.12 built: 17-11-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["editors"] = {"libName":"editors","version":"1.0.27-dev.12","built":"2017-11-17"};

(function() {
    'use strict';

    angular.module('ep.color.selector', [
        'ep.templates'
    ]);
})();

/**
 * @ngdoc overview
 * @name ep.icon.selector
 * @description
 * Provides the font awsome icon selector
 */
(function() {
    'use strict';

    angular.module('ep.icon.selector', []);
})();

/**
 * @ngdoc overview
 * @name ep.ui.range.slider
 * @description
 * This is the range slider directive
 */
(function() {
    'use strict';

    angular.module('ep.ui.range.slider', [
    'ep.templates',
    'ep.sysconfig',
    'ngTouch'
    ]);
})();

'use strict';
/**
 * @ngdoc overview
 * @name ep.record.editor
 * @description
 * record editor creates controls by metadata
 */
angular.module('ep.record.editor', [
    'ep.feature.detection',
    'ep.templates',
    'ep.sysconfig',
    'ep.include'
]);

/**
 * @ngdoc overview
 * @name ep.switch
 * @description
 * ep.switch is based on bootstrap switch
 */
(function() {
    'use strict';

    angular.module('ep.switch', [
        'ep.templates'
    ]);
})();

/**
 * @ngdoc directive
 * @name ep.color.selector:epColorSelector
 * @restrict EA
 *
 * @description
 * Represents color selector
 *
 * Note: Include css/colorpicker.css and js/bootstrap-colorpicker-module.js in index file from lib/bower/angular-bootstrap-colorpicker.
 * 'colorpicker.module' must be added to the application modules list
 * The JS file should be included before including emf.js
 *
 * @property {object} ngModel:object
 * This is the model object to store the selected color.
 *
 * @property {string} position:string
 * This is the position of the color selector dropdown. Allowed values are top, right, bottom, left. Default is bottom.
 *
 * @property {numeric} size:numeric
 * This is the size of color selector dropdown in pixels. Example values 200, 300 etc...Default is 100.
 *
 * @property {boolean} closeOnSelect:boolean
 * This is a boolean property determines whether to close the color picker on selection. Default is false.
 *
 * @property {string} width:string
 * This is the width of entire color selector component. Example values 500px, 80% etc...Default is 100%.
 *
 * @property {boolean} applyColorToBtn:boolean
 * This is a boolean property which decides whether selected color should be applied to the button which opens up the color picker. Default is false.
 *
 * @property {string} icon:string
 * This is the name of the font awesome icon to be displayed on color picker dropdown.
 *
 * @example
 *  <pre>
 *      <ep-color-selector ng-model="obj.color"></ep-color-selector>
 *  </pre>
 */
(function() {
    'use strict';

    angular.module('ep.color.selector').directive('epColorSelector', epColorSelectorDirective);

    function epColorSelectorDirective() {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                position: '@',
                size: '@',
                closeOnSelect: '@',
                width: '@',
                applyColorToBtn: '@',
                icon: '@'
            },
            templateUrl: 'src/components/ep.color.selector/color_selector.html'
        };
    }
})();

/**
 * @ngdoc directive
 * @name ep.icon.selector:epIconSelector
 * @restrict EA
 *
 * @description
 * Represents fontawesome icon selector
 *
 * @property {string} width:string
 * This is the width of entire icon selector component. Example values 500px, 80% etc...Default is 100%.
 *
 * @property {string} iconListWidth:string
 * This is the width of icon selector drop down menu. Example values 200px, 300px etc...Default is 295px.
 *
 * @property {string} iconListHeight:string
 * This is the maximum height of icon selector list in the drop down menu. Example values 200px, 300px etc...Default is 400px.
 *
 * @example
 *  <pre>
 *      <ep-icon-selector></ep-icon-selector>
 *  </pre>
 */
(function() {
    'use strict';

    epIconSelectorDirective.$inject = ['epIconSelectorService'];
    angular.module('ep.icon.selector').directive('epIconSelector', epIconSelectorDirective);

    function epIconSelectorDirective(epIconSelectorService) {
        return {
            restrict: 'EA',
            replace: true,
            scope: {
                ngModel: '=',
                width: '@',
                iconListWidth: '@',
                iconListHeight: '@'
            },
            templateUrl: 'src/components/ep.icon.selector/icon_selector.html',
            link: function(scope) {

                //read icons from fontawesome css file
                scope.icons = epIconSelectorService.getIconList();

                scope.selectIcon = function(icon) {
                    scope.ngModel = 'fa-' + icon;
                };

            }
        };
    }
})();

/**
 * @ngdoc service
 * @name ep.icon.selector:epIconSelectorService
 * @description
 * Provides methods for getting the icon classes from icon css file.
 *
 * @example
 *
 */
(function() {
    'use strict';

    angular.module('ep.icon.selector').factory('epIconSelectorService', epIconSelectorService);

    function epIconSelectorService() {

        /**
         * @ngdoc method
         * @name getIconList
         * @methodOf ep.icon.selector:epIconSelectorService
         * @public
         * @description
         * To read the icon classes from icon css file.
         */
        function getIconList() {
            var icons = $.map($.map(document.styleSheets, function(s) {
                if (s.href && s.href.endsWith('font-awesome.min.css')) {
                    return s;
                }
                return null;
            })[0].rules, function(r) {
                if (r.cssText.indexOf('::before { content: ') > 0) {
                    var multipleCSS = [];
                    var count = (r.cssText.match(/::before/g) || []).length;
                    if (count > 1) {
                        multipleCSS = r.cssText.split(',');
                        for (var i = 0; i < multipleCSS.length; i++) {
                            var css = multipleCSS[i].trim();
                            multipleCSS[i] = css.substring(4, css.indexOf('::'));
                        }
                        return multipleCSS;
                    }
                    return r.cssText.substring(4, r.cssText.indexOf('::'));
                }
                return null;
            });

            return icons;
        }
        return {
            getIconList: getIconList
        };
    }
})();


(function() {
    'use strict';

    angular.module('ep.ui.range.slider').controller('epRangeSliderCtrl', [
    '$scope',
    function($scope) {
        var handle;
        var axisClickX;
        var handleWidth;
        var lastX;
        var minHandleX = 0;
        var maxHandleX = 0;
        var isHandleClicked;
        var axisWidth;

        function positionRange(pos) {
            $scope.range.css('left', pos + 'px');
        }

        function positionHandle(handleType, pos) {
            var handle = handleType === 'left' ? $scope.minHandle : $scope.maxHandle;
            handle.css('left', pos + 'px');
        }

        function processRangeDrag(swipeCoords, evt) {
            var diff;
            var evtCoords = getEventCoordinates(evt);
            var minHandleLeftPos = parseInt($scope.minHandle.css('left'));
            var maxHandleLeftPos = parseInt($scope.maxHandle.css('left'));

            axisWidth = $scope.axis.width();
            if (lastX === null || lastX === undefined) {
                lastX = axisClickX;
            }

            if (swipeCoords.x > lastX) {
                diff = evtCoords.x - lastX;
                if ((maxHandleLeftPos + handleWidth) >= axisWidth) {
                    return;
                }
                positionRange(parseInt($scope.range.css('left')) + diff);
                minHandleX = minHandleLeftPos + diff;
                maxHandleX = maxHandleLeftPos + diff;
                positionHandle('left', minHandleX);
                positionHandle('right', maxHandleX);
            } else {
                diff = lastX - evtCoords.x;
                if (minHandleLeftPos <= 0) {
                    return;
                }
                positionRange(parseInt($scope.range.css('left')) - diff);
                minHandleX = minHandleLeftPos - diff;
                maxHandleX = maxHandleLeftPos - diff;
                positionHandle('left', minHandleX);
                positionHandle('right', maxHandleX);
            }
            $scope.rangeMin = minHandleLeftPos === 1 ? $scope.min :
                getHandleValue(minHandleLeftPos);
            $scope.rangeMax = getHandleValue(maxHandleLeftPos + handleWidth);
            lastX = swipeCoords.x;
            $scope.$digest();
        }
        function processHandleDrag(swipeCoords, evt) {
            var diff;
            var newPos;
            var evtCoords = getEventCoordinates(evt);
            var isMinHandle = handle.is('.js-handle-min');
            var width;

            if (maxHandleX === 0 || isNaN(maxHandleX)) {
                maxHandleX = axisWidth - handleWidth;
            }

            if (lastX === null || lastX === undefined) {
                lastX = axisClickX;
            }

            if (swipeCoords.x > lastX) {
                diff = evtCoords.x - lastX;
                newPos = parseInt(handle.css('left')) + diff;
                if ((newPos) > axisWidth) {
                    return;
                }
                if (isMinHandleHitMaxHandle()) {
                    return;
                }
                if (!isMinHandle && (newPos + handleWidth) >= axisWidth) {
                    return;
                }
                width = isMinHandle ? $scope.range.width() - diff : $scope.range.width() + diff;
            } else {
                diff = lastX - evtCoords.x;
                newPos = (parseInt(handle.css('left')) || maxHandleX) - diff;
                if (newPos <= 0) {
                    return;
                }
                if (isMaxHandleHitMinHandle()) {
                    return;
                }
                width = isMinHandle ? $scope.range.width() + diff : $scope.range.width() - diff;
            }

            if (isMinHandle) {
                minHandleX = newPos;
                $scope.rangeMin = newPos === 1 ? $scope.min :
                    getHandleValue(newPos);
            } else {
                maxHandleX = newPos;
                $scope.rangeMax = newPos + handleWidth >= axisWidth ? $scope.max :
                    getHandleValue(newPos + handleWidth);
            }

            $scope.range.css({ left: (minHandleX + handleWidth) + 'px', width: width });
            positionHandle(isMinHandle ? 'left' : 'right', newPos);
            lastX = swipeCoords.x;
            $scope.$digest();

            function isMinHandleHitMaxHandle() {
                return isMinHandle && newPos >= maxHandleX - handleWidth;
            }

            function isMaxHandleHitMinHandle() {
                return !isMinHandle && minHandleX + handleWidth >= newPos;
            }
        }
        function getEventCoordinates(evt) {
            var res = { x: 0, y: 0 };
            if (evt.originalEvent && evt.originalEvent instanceof TouchEvent) {
                res.x = evt.originalEvent.changedTouches[0].clientX;
                res.y = evt.originalEvent.changedTouches[0].clientY;
            } else if (evt.originalEvent && evt.originalEvent instanceof MouseEvent) {
                res.x = evt.clientX;
                res.y = evt.clientY;
            }
            return res;
        }
        function onMouseUp(evt) {
            var trg = $(evt.target);
            if (!(trg.is('.ep-range-slide-handle') ||
                trg.is('.ep-range-ctr') ||
                trg.is('.ep-range-slider-value-axis'))) {
                $scope.axis.trigger('touchend');
                $(document.body).off('mouseup', onMouseUp);
            }
            $scope.axis.removeClass('ep-range-handle-drag').removeClass('ep-range-drag');
            isHandleClicked = false;
            evt.stopPropagation();
        }

        $scope.value = 0;
        $scope.touch = true;
        $scope.rangeMax = $scope.max;
        $scope.rangeMin = $scope.min;
        $scope.steps = [25, 50, 75];
        $scope.$watch('rangeMin', onRangeMinChange);
        $scope.$watch('rangeMax', onRangeMaxChange);

        $scope.toggleRangeInputMode = function() {
            axisWidth = axisWidth || $scope.axis.width();
            handleWidth = handleWidth || $scope.minHandle.outerWidth();
            $scope.touch = !$scope.touch;
        };
        function onRangeMaxChange() {
            if ($scope.touch) {
                return;
            }
            var max = parseInt($scope.rangeMax);
            if (max > $scope.max) {
                max = $scope.max;
                $scope.rangeMax = max;
            }

            maxHandleX = (((max - $scope.min) / ($scope.max - $scope.min)) * axisWidth) - handleWidth;
            positionHandle('right', maxHandleX);
            $scope.range.css({ left: minHandleX + handleWidth, width: maxHandleX - minHandleX - handleWidth });
        }

        function onRangeMinChange() {
            if ($scope.touch) {
                return;
            }
            var min = parseInt($scope.rangeMin);
            if (min < $scope.min) {
                min = $scope.min;
                $scope.rangeMin = min;
            }
            minHandleX = (((min - $scope.min) / ($scope.max - $scope.min)) * axisWidth);

            positionHandle('left', minHandleX);
            if (maxHandleX === 0) {
                maxHandleX = axisWidth - handleWidth;
            }
            $scope.range.css({ left: minHandleX + handleWidth, width: maxHandleX - minHandleX - handleWidth });
        }

        $scope.onSwipe = function(coords, evt) {
            if (isHandleClicked) {
                processHandleDrag(coords, evt);
            } else {
                processRangeDrag(coords, evt);
            }
            evt.stopPropagation();
        };

        $scope.onAxisClick = function(evt) {
            var target = $(evt.target);
            axisClickX = getEventCoordinates(evt).x;
            axisWidth = $scope.axis.width();
            $scope.axisWithAndX = axisWidth + ', ' + $scope.axis.position().left;
            if (target.is('.ep-range-slide-handle')) {
                handle = target;
                handleWidth = handle.outerWidth();
                $scope.axis.addClass('ep-range-handle-drag').removeClass('ep-range-drag');
                isHandleClicked = true;
            } else if (target.is('.ep-range-ctr') || target.is('.ep-range')) {
                $scope.axis.addClass('ep-range-drag').removeClass('ep-range-handle-drag');
            }
            $(document.body).mouseup(onMouseUp);
            evt.stopPropagation();
        };

        $scope.swipeStart = function() {
            $scope.axis.parent().addClass('active');
        };
        $scope.swipeEnd = function() {
            $scope.axis.parent().removeClass('active');
            lastX = axisClickX = null;
        };

        function getHandleValue(pos) {
            var percent = pos / axisWidth;
            $scope.newPoint = Math.ceil($scope.min + (percent * ($scope.max - $scope.min)));
            return $scope.newPoint;
        }

        function getSelection() {
            return { min: $scope.rangeMin, max: $scope.rangeMax };
        }
        function clearRange() {
            $scope.rangeMin = $scope.min;
            $scope.rangeMax = $scope.max;
        }

        $scope.out.getSelection = getSelection;
        $scope.out.clear = clearRange;

    }
    ]);
})();

/**
* @ngdoc directive
* @name ep.ui.range.slider.directive:epRangeSlider
* @restrict E
*
* @description
* Represents the ep.ui.range.slider directive
*
* @example
*/
(function() {
    'use strict';

    angular.module('ep.ui.range.slider').directive('epRangeSlider', [
    '$swipe',
    function($swipe) {
        return {
            restrict: 'E',
            controller: 'epRangeSliderCtrl',
            templateUrl: 'src/components/ep.ui.range.slider/ep-range-slider.html',
            scope: {
                min: '=',
                max: '=',
                out: '='
            },
            compile: function() {
                return function(scope, ele) {
                    scope.container = ele.parent();
                    scope.min = scope.min || 0;
                    scope.minHandle = scope.container.find('.js-handle-min');
                    scope.maxHandle = scope.container.find('.js-handle-max');
                    scope.range = scope.container.find('.ep-range-ctr');
                    //scope.rangeFrame = scope.container.find('.range-frame');
                    scope.axis = scope.container.find('.ep-range-slider-value-axis');
                    scope.axis.mousedown(scope.onAxisClick);
                    scope.axis.bind('touchstart', scope.onAxisClick);
                    $swipe.bind(scope.axis, {
                        move: scope.onSwipe,
                        start: scope.swipeStart,
                        end: scope.swipeEnd
                    });
                };
            }
        };
    }]);
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epCheckboxEditor
* @restrict E
*
* @description
* Checkbox editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epCheckboxEditor', epCheckboxEditorDirective);

    /*@ngInject*/
    function epCheckboxEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-checkbox-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        var ctx = $scope.ctx;

                        $scope.temp = {
                            chk: false
                        };

                        $scope.checkBoxMode = ctx.col.checkBoxMode || 'checkbox';
                        if ($scope.checkBoxMode === 'checkbox') {
                            //set size class smaller for check box
                            ctx.fnSetSizeClass('col-xs-12 col-sm-4 col-md-3 col-lg-2');
                            ctx.checkBoxSize = ctx.checkBoxSize || '2x';

                            if (ctx.updatable) {
                                ctx.toggleValue = function(c, ev) {
                                    if ($scope.value !== undefined && !ctx.disabled) {
                                        var newVal = !$scope.value;
                                        ctx.fnSetCurrentValue(newVal, false);

                                        if (ctx.fnValidate && ctx.updatable) {
                                            ctx.fnValidate(ctx.col, this, ev);
                                        }
                                    }
                                };
                            }
                            ctx.checked = ctx.value ? 'checked' : '';
                        } else if ($scope.checkBoxMode === 'switch') {
                            //set initial value
                            $scope.temp.chk = !!$scope.value;

                            //watch for changes
                            if (ctx.updatable) {
                                $scope.$watch('temp.chk', function(newValue, oldValue) {
                                    if (newValue !== undefined && newValue !== oldValue && newValue !== $scope.value) {
                                        $scope.value = newValue;
                                    }
                                });
                            }
                        }
                        $scope.handleKey = function($event) {
                            if ($event.which === 32) {
                                $scope.ctx.toggleValue($scope.ctx);
                            }
                        };
                    }
                };
            }
        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epDateConvert
* @restrict E
*
* @description
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epDateConvert', epDateConvertDirective);

    /*@ngInject*/
    function epDateConvertDirective() {
        //This directive is used to convert string to date between temp input and record
        //we need this because date angular bootstrap and input 'date' for native dates work
        //only if date object is bound to control. But our record stores ISO string date
        //so we have temp control with date object which we edit and pass result to hidden
        //control bound to actual record.
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) { return; }

                var mode = attrs.epDateConvert;

                if (mode === 'toString') {
                    //transform date to string
                    ngModel.$parsers.unshift(function(value) {
                        var dd = null;
                        if (value !== undefined) {
                            var m = moment(value);
                            var fmt = 'YYYY-MM-DD';
                            if (scope.ctx.isDateTime) {
                                if (scope.ctx.col && scope.ctx.col.time && scope.ctx.col.time.defaultNoon === true) {
                                    fmt = 'YYYY-MM-DDT12:00:00';
                                } else {
                                    fmt = 'YYYY-MM-DDT00:00:00';
                                }
                            }
                            dd = m.isValid() ? m.format(fmt) : null;
                        }
                        var vCur = scope.ctx.fnGetCurrentValue();
                        if (vCur !== dd) {
                            scope.ctx.fnSetCurrentValue(dd, false);
                        }
                        return value;
                    });

                    ngModel.$viewChangeListeners.push(function() {
                        if (ngModel.$modelValue === undefined) {
                            //this happens during edit when date becomes invalid (modelValue undefined)
                            scope.ctx.isInvalidDateSet = true;
                            scope.value = undefined;
                        }
                    });
                }
                if (mode === 'toDate') {
                    //transform ISO string date to date object
                    ngModel.$formatters.push(function(value) {
                        if (angular.isString(value)) {
                            var md = moment(value);
                            scope.ctx.dateValue = md.isValid() ? md.toDate() : null;
                        } else {
                            if (scope.ctx.isInvalidDateSet === true) {
                                scope.ctx.isInvalidDateSet = false;
                            } else {
                                scope.ctx.dateValue = angular.isDate(value) ? value : null;
                            }
                        }
                        return value;
                    });
                }
            }
        };
    }
})();


/**
* @ngdoc directive
* @name ep.record.editor.directive:epDateEditor
* @restrict E
*
* @description
* @description
* Date editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    epDateEditorDirective.$inject = ['epFeatureDetectionService'];
    angular.module('ep.record.editor').
    directive('epDateEditor', epDateEditorDirective);

    /*@ngInject*/
    function epDateEditorDirective(epFeatureDetectionService) {
        var isDateInputSupported = epFeatureDetectionService.inputSupportsType('date');

        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-date-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        var ctx = $scope.ctx;
                        var col = ctx.col;

                        ctx.useDateInput = isDateInputSupported; //activate browser native date entry

                        var format = col.oFormat.FormatString;
                        ctx.format = format;
                        ctx.dateOptions = {};

                        //time can be object or boolean
                        if (col.time && col.time !== false && col.time.show !== false) {
                            $scope.showTime = true;
                            $scope.isMeridian = col.time.meridian === true;
                            $scope.hourStep = col.time.hourStep || 1;
                            $scope.minuteStep = col.time.minuteStep || 15;
                            $scope.ctx.isDateTime = true;
                            $scope.showInNewLine = col.time.showInNewLine === true;

                            $scope.$watch('ctx.dateValue', function(newValue, oldValue) {
                                if (newValue && newValue !== oldValue && $scope.changingTime !== true) {
                                    $scope.ctx.timeValue = newValue;
                                }
                                $scope.changingTime = false;
                            });

                            $scope.timeChanged = function() {
                                var value = $scope.ctx.timeValue;
                                var dd = null;
                                if (value !== undefined) {
                                    var m = moment(value);
                                    dd = m.isValid() ? m.format('YYYY-MM-DDTHH:mm:ss') : null;
                                }
                                var vCur = $scope.ctx.fnGetCurrentValue();
                                if (vCur !== dd) {
                                    $scope.changingTime = true;
                                    $scope.ctx.fnSetCurrentValue(dd, false);
                                }
                            };
                        }

                        if (!ctx.useDateInput) {
                            var reg;
                            if (format) {
                                reg = /[A-Z]|[a-z]/;
                                ctx.dateSeparator = _.find(ctx.format, function(c) {
                                    return c && !reg.test(c);
                                });
                            }
                            if (!ctx.dateSeparator) {
                                var dd = new Date().toLocaleDateString();
                                reg = /[0-9]|[' ']/;
                                ctx.dateSeparator = _.find(dd, function(c) {
                                    return c && c.charCodeAt(0) !== 8206 && !reg.test(c);
                                });
                            }

                            ctx.fnDateOpen = function($event) {
                                if (!ctx.disabled) {
                                    $event.preventDefault();
                                    $event.stopPropagation();
                                    ctx.dateOpened = true;
                                }
                            };
                            ctx.fnDateKeyDown = function($event) {
                                var k = $event.keyCode;
                                if (k === 8 || k === 9 || k === 16 || k === 33 || k === 34 ||
                                    k === 35 || k === 36 || k === 37 || k === 38 || k === 39 || k === 40) {
                                    return true;
                                }
                                if ($event.ctrlKey) {
                                    return true; //for Copy/Paste etc.
                                }
                                if (ctx.disabled) {
                                    $event.preventDefault();
                                    return false;
                                }
                                if (ctx.dateSeparator && $event.char) {
                                    //with date separator check for it or [0-9]
                                    var sepCode = ctx.dateSeparator;
                                    if ($event.char === sepCode) {
                                        //prevent more than 2 date separators
                                        if (angular.isString($event.target.value) &&
                                            $event.target.value.split(sepCode).length > 2) {
                                            $event.preventDefault();
                                            return false;
                                        }
                                        return true;
                                    }
                                    if (/[0-9]/.test($event.char)) {
                                        return true;
                                    }
                                } else if ($event.char) {
                                    //without date separator we will allow all non-alphanumerics
                                    if (!(/[A-Z]|[a-z]/.test($event.char))) {
                                        return true;
                                    }
                                } else {
                                    //uncontrolled because we cannot trust key code
                                    if (k < 65 || k > 90) {
                                        return true;
                                    }
                                }
                                $event.preventDefault();
                                return false;
                            };
                        }
                    }
                };
            }
        };
    }
})();


(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.editor.directive:epEditorControl
    * @restrict E
    * @scope
    *
    * @description
    * Represents the ep.editor.control directive
    * This directive allows using editors standalone without ep-record-editor
    * Please note that the controls must be under class="row" for proper sizing
    *
    * @param {object} column - the following are properties of the column:
        # editor {string} - 'number' | 'text' | 'multiline' | 'date' | 'checkbox' | 'select' | 'image' | 'custom'
            if 'auto' or blank then editor will be detected from value
        # editorDirective {string} - directive name as in html for custom editor
        # bizType {string} - 'phone' | 'address' | 'email' | 'url' | 'password'
        # bizTypeRight {bool} - to display biz button on the right (default is false)
        # columnIndex - data ordinal index (data array index) or property name
        # seq {int} - (optional) sequence index for ordering
        # required {bool} - is entry required
        # requiredFlag {bool} - should we display required flag
        # name {string} - column name (optional)
        # caption {string} - caption
        # placeholder {string} - applicable to text input
        # justification {string} - 'right' | 'left' | 'center'
        # visible {bool}  - visible
        # updatable {bool}  - updatable
        # nullable {bool}  - nullable
        # list {array}  - array of items for drop down (editor = 'select' ) [{ label, value }]
        # sizeClass {string} - editor size class (bootstrap column sizes like col-md-6, col-lg-8, etc)
        # sizeClassTarget {object} - if string then acts like selector of closest ancestor and sets size
        #                   class to this element. if node is passed then sets size class on it.
        #
        # checkBoxSize {string}  - applicable to checkbox only (for now). Can be '1x', '2x', '3x'
        # checkBoxMode {string}  - applicable to checkbox only. 'checkbox'/'switch' (default is 'checkbox')
        # style {string} - sets inline styling. eg. '{ "color" : "red", "margin" : "0px" }
        # oFormat {object}
            Decimals {int} - number of decimals
            Min {number} - minimum
            Max {number} - max value
            AllowNegative {bool} - allow negative
        # maxLength {int} - set max length for string entry default is 30
        # rows {int} - set rows for multiline editor (default is 5)
        # mode {string} - set display mode ('mini' otherwise standard). In 'mini' mode the margins will
        #      be minimal and not borders
        # buttons {array} - array of button objects that contain properties:
            text {string} - button text
            style {string} - button class
            position {string} - 'pre' or 'post'
            seq {int} - button sequence
            action {function} - function action that is invoked on click
            type {string} - 'btn' - if button, otherwise a link
        # imageHeight {int} - image height for image editor
        # imageWidth {int} - image width for image editor
        # fnOnFldValidate(ctx, event, inputValue, originalValue, settings) - callback function on validation
            Note: originalValue is only passed when ep-record-editor is used.
            use $rootScope.$broadcast(epRecordEditorConstants.REC_EDITOR_VALIDATE_CONTROLS_TRIGGER, options) to manually trigger validation
            options {userValidation,fnOnFldValidate}
                userValidation: true, if fnOnFldValidate is to be called
                focus: true, to set focus
                fnOnFldValidate: if you want to override fnOnFldValidate function
        # fnOnChange(ctx, event) - callback function on change
        # fnOnBlur(ctx, event) - callback function on change
        # classLabel {string} - label class (used in is-row mode to set boostrap column width, eg. 'col-xs-4')
        # classEditor {string} - editor class (used in is-row mode to set boostrap column width, eg. 'col-xs-8')
        # time {object}  - applies to 'date' editor - set if time is to be displayed. Properties:
            show {bool} - show time (default true)
            meridian {bool} - show meridian (default false)
            hourStep {int} - incremental in hours (default is 1)
            minuteStep {int} - incremental in minutes (default is 15)
    *
    * @param {object} value - the value binding for the editor
    * @param {bool} isDropEnabled - is drop enabled for the editor
    * @param {bool} isDragEnabled - is drag enabled for the editor
    * @param {bool} isRow - when true - caption and editor are is in boostrap grid row mode;
    *   otherwise caption is on top of the editor. (default is false)
    *
    * @example
    *   HTML:
    *   <div class="row">
    *       <ep-editor-control column="column" value="valueText"></ep-editor-control>
    *   </div>
    *
    *   Script:
    *   $scope.column = {
    *       caption: 'My Caption',
    *       editor: 'text',
    *       updatable: true,
    *       placeholder: 'Enter text here...'
    *   };
    *   $scope.valueText = 'My Text';
    */
    epEditorControlDirective.$inject = ['$log', '$timeout', '$window', '$compile', '$q', 'epUtilsService', 'epFeatureDetectionService', 'epRecordEditorConstants'];
    angular.module('ep.record.editor').
        directive('epEditorControl', epEditorControlDirective);

    /*@ngInject*/
    function epEditorControlDirective($log, $timeout, $window, $compile, $q,
        epUtilsService, epFeatureDetectionService, epRecordEditorConstants) {

        var defaultSizeClass = 'col-xs-12 col-sm-8 col-md-6 col-lg-3';

        var defaultFormat = {
            FieldType: 0,
            MaxLength: 30
        };

        function doValidation(ctx, ev, focus, settings) {
            var deferred = $q.defer();

            var fnSettings = settings || { trigger: 'unknown' };

            if (getRecordEditor(ctx.control.scope)) {
                var re = getRecordEditor(ctx.control.scope);
                re.doValidation(ctx.control.scope.options.recordEditor.state, ctx, ev, focus);
                deferred.resolve();
            } else {
                var fnOnFldValidate = ctx.col.fnOnFldValidate || settings.fnOnFldValidate;
                if (fnOnFldValidate && fnSettings.userValidation !== false) {
                    ctx.isInvalid = false;
                    var newValue = ctx.control.scope.value;
                    $q.when(fnOnFldValidate(ctx, ev, newValue, undefined, fnSettings)).then(function(result) {
                        if (result === false) {
                            ctx.isInvalid = true;
                            if (focus) {
                                ctx.fnSetFocus();
                            }
                            $timeout(function() {
                                ctx.fnDoValidations();
                            });
                        }
                        deferred.resolve();
                    });
                } else {
                    $timeout(function() {
                        ctx.fnDoValidations();
                        deferred.resolve();
                    });
                }
            }
            return deferred.promise;
        }

        function getEditorByValue(v) {
            var tp = typeof v;
            if (tp === 'number') {
                return 'number';
            } else if (tp === 'boolean') {
                return 'checkbox';
            } else if (tp === 'date') {
                return 'date';
            } else if (tp === 'string') {
                var reg = /\d{4}-\d{2}-\d{2}['T']/;
                if (v && v.match(reg)) {
                    return 'date';
                }
            }
            return 'text';
        }

        function addSizeClass(el, sClass) {
            if (el) {
                $(el).removeClass(function(index, css) {
                    return (css.match(/(^|\s)col-((lg)|(xs)|(sm)|(md))\S+/g) || []).join(' ');
                });
                el.addClass(sClass);
            }
        }

        function createContext(scope) {
            //creates editor context based on metadata
            var col = scope.column || {};
            col.oFormat = col.oFormat || defaultFormat;

            //determine editor
            var edt = 'text';
            if (!col.editor || col.editor === 'auto') {
                if (scope.value !== undefined && scope.value !== null) {
                    edt = getEditorByValue(scope.value);
                    scope.editorValueType = typeof scope.value;
                }
            } else {
                edt = col.editor;
            }
            var editor = (edt || 'text').trim().toLowerCase();

            var name = col.name || col.caption || col.columnIndex;
            var ctx = {
                recordEditorState: undefined,
                editorContainer: scope.state.iElement,
                control: {
                    scope: scope
                },
                col: col,
                editor: editor,
                name: editor + '_' + name + scope.$id,
                columnIndex: col.columnIndex,
                required: col.required || (editor === 'number' && !col.nullable), //all number's except Nullable are required
                requiredFlag: col.requiredFlag,  //to display the required flag
                bizType: col.bizType,
                label: col.caption || name || '',
                maxlength: col.maxLength || 30,
                justification: col.justification,
                hidden: col.hidden,
                updatable: col.updatable,
                disabled: !col.updatable,
                nullable: col.nullable,
                displayInvalid: col.flagInvalid || true,
                buttons: col.buttons || [],
                imageWidth: (col.imageWidth ? col.imageWidth : 0),
                imageHeight: (col.imageHeight ? col.imageHeight : 0),
                isInvalid: false,
                placeholder: col.placeholder,
                size: col.size,
                style: col.style,
                checkBoxSize: col.checkBoxSize,
                mode: col.mode || 'default'
            };

            if (col.style && angular.isString(col.style)) {
                try {
                    var xStyle =  scope.$eval(col.style);
                    ctx.style = xStyle;
                } catch (err) {
                    $log.error('Error in ep-editor-control styling. Error: ' + err.message + '\nStyle: ' + col.style);
                }
            }

            ctx.fnSetSizeClass = function(sizeClass) {
                var sClass = col.sizeClass || sizeClass || defaultSizeClass;
                var isSet = true;
                if (col.sizeClassTarget) {
                    if (angular.isString(col.sizeClassTarget)) {
                        $timeout(function() {
                            var el = $(scope.state.iElement).closest(col.sizeClassTarget);
                            addSizeClass(el, sClass);
                        });
                    } else if (col.sizeClassTarget instanceof HTMLElement) {
                        addSizeClass($(col.sizeClassTarget), sClass);
                    } else {
                        isSet = false;
                    }
                }
                if (!col.sizeClassTarget || !isSet) {
                    ctx.sizeClass = sClass;
                }
            };
            ctx.fnSetSizeClass();

            ctx.fnSetFocus = function() {
                var edt = ctx.fnGetEditorElement();
                if (edt) {
                    //only focus the field if we are on a non touch device because it causes the keyboard to popup
                    //on touch devices which can be an annoying user experience.
                    if (!epFeatureDetectionService.hasTouchEvents()) {
                        angular.element(edt).focus();
                    }
                }
            };

            ctx.fnGetCurrentValue = function() {
                return ctx.control.scope.value;
            };

            ctx.fnSetCurrentValue = function(val, focus) {
                var edt = ctx.fnGetEditorElement();
                if (val !== undefined) {
                    if (ctx.fnGetCurrentValue() !== val) {
                        ctx.control.scope.value = val;
                        //because we set value programatically, set dirty
                        if (edt) {
                            angular.element(edt).addClass('ng-dirty');
                        }
                        if (ctx.updatable) {
                            doValidation(ctx, {}, focus === true, {trigger:'setValue'});
                        }
                        ctx.fnOnChange({}, ctx);
                    }
                }
                if (focus) {
                    ctx.fnSetFocus();
                }
            };

            ctx.fnGetEditorElement = function() {
                var editor = null;
                if (ctx.editorContainer) {
                    editor = angular.element(ctx.editorContainer).find('.form-control.editor');
                }
                return editor;
            };

            ctx.fnOnChange = function($event) {
                if (ctx.col.fnOnChange) {
                    $timeout(function() {
                        ctx.col.fnOnChange($event, ctx);
                    });
                }
            };

            ctx.fnBlur = function onBlur(ev) {
                var state = scope.ctx.recordEditorState;
                if (state) {
                    state.lastFocused = { Col: ctx.col, Ctx: ctx, Event: ev };
                }
                if (ctx.updatable) {
                    if (angular.element(ev.currentTarget).hasClass('ng-dirty')) {
                        doValidation(ctx, ev, false, {trigger:'blur'});
                    }
                }
                if (ctx.col.fnOnBlur) {
                    ctx.col.fnOnBlur(ev, ctx);
                }
                return true;
            };

            //This function checks invalid status from angular and field validation to highlight invalid
            ctx.fnDoValidations = function() {
                ctx.invalidFlag = false;
                if (ctx.displayInvalid && ctx.editorContainer) {
                    var state = scope.ctx.recordEditorState;
                    var showAllInvalidFields =
                        (state && state.showAllInvalidFields) || (ctx.showInvalidFields === true);
                    var editor = angular.element(ctx.editorContainer).find('.form-control.editor');
                    if (editor.length) {
                        //TO DO: check in angular if we can remove the 'ng-invalid-remove'/'ng-dirty-add' check
                        var isInvalid = ctx.isInvalid || ((editor.hasClass('ng-invalid') &&
                            !editor.hasClass('ng-invalid-remove')) || editor.hasClass('ng-valid-remove'));
                        var isDirty = (editor.hasClass('ng-dirty') || editor.hasClass('ng-dirty-add') ||
                            showAllInvalidFields);
                        ctx.invalidFlag = (isInvalid && isDirty);
                    } else if (ctx.toggleValue) {
                        //special checkbox case:
                        ctx.invalidFlag = ctx.isInvalid;
                    }
                }
                return false;
            };

            //Configure BizType buttons
            if (ctx.bizType && (ctx.bizType === 'phone' || ctx.bizType === 'address' ||
                ctx.bizType === 'email' || ctx.bizType === 'url')) {
                var btnHref = '';
                var btnStyle = '';
                var btnType = 'href-input';

                switch (ctx.bizType) {
                    case 'address':
                        btnHref = 'http://maps.google.com/maps?q={0}';
                        btnStyle = 'fa fa-map-marker';
                        break;

                    case 'phone':
                        btnHref = 'tel:{0}';
                        btnStyle = 'fa fa-phone';
                        break;

                    case 'email':
                        btnHref = 'mailto:{0}';
                        btnStyle = 'fa fa-envelope';
                        break;

                    case 'url':
                        btnHref = '';
                        btnStyle = 'fa fa-globe';
                        btnType = 'href-func';
                        ctx.fnGetHref = function() {
                            var v = ctx.fnGetCurrentValue();
                            if (col.stringFormat) {
                                // example stringFormat = 'http://somewhere.com/{0}';
                                v = epUtilsService.strFormat(col.stringFormat, v);
                            }
                            if (v) {
                                //if string does not start with 'http' or 'https' then append
                                var v1 = v.trim().toLowerCase();
                                if (v1.substr(0, 4) !== 'http') {
                                    v = 'http://' + v;
                                }
                            }
                            return v;
                        };
                        break;
                }
                if (btnStyle) {
                    ctx.buttons.push({
                        type: btnType,
                        text: '',
                        href: btnHref,
                        style: btnStyle,
                        seq: 2,
                        position: col.bizTypeRight === true ? 'post' : 'pre',
                    });
                }
            }

            ctx.editorMode = 'simple';
            ctx.classRightBtns = '';
            ctx.classLeftBtns = '';
            if (ctx.buttons.length) {
                ctx.fnBtnClick = function(btn) {
                    if (btn.type === 'btn') {
                        btn.action(ctx);
                    } else {
                        var v = ctx.fnGetCurrentValue();
                        if (v) {
                            var url = '';
                            switch (btn.type) {
                                case 'href':
                                    url = btn.href;
                                    break;
                                case 'href-input':
                                    url = epUtilsService.strFormat(btn.href, v);
                                    break;
                                case 'href-func':
                                    url = ctx.fnGetHref();
                                    break;
                            }
                            if (btn.type === 'href') {
                                $window.open(url, '_blank');
                            } else {
                                $window.open(url);
                            }
                        }
                    }
                };

                var postBtns = _.filter(ctx.buttons, function(btn) {
                    return btn.position === 'post';
                });
                if (postBtns.length) {
                    ctx.classRightBtns = 'ep-editor-right-buttons';
                }
                var preBtns = _.filter(ctx.buttons, function(btn) {
                    return btn.position === 'pre';
                });
                if (preBtns.length) {
                    ctx.classLeftBtns = 'ep-editor-left-buttons';
                }
                ctx.editorMode = '';
                if (postBtns.length === 1 && preBtns.length === 0) {
                    ctx.editorMode = 'rbutton';
                }
            }
            scope.ctx = ctx;
            if (getRecordEditorState(scope)) {
                var state = getRecordEditorState(scope);
                var ctrl = state.controls[ctx.columnIndex];
                ctrl.controlCtx = ctx;
                ctx.recordEditorState = state;
                ctx.seq = ctrl.seq;
            }

            //Create the dynamic control
            if (ctx.editor === 'template') {
                var newScope = scope.$new(false, scope);
                ctx.templateOptions = col.templateOptions || {
                    template: col.template,
                    templateScope: newScope
                };
                scope.editorDirective = '<ep-include options="ctx.templateOptions" user-data="ctx"></ep-include>';
                newScope.$watch('value', function(newValue) {
                    if (newValue !== undefined && ctx.updatable && ctx.readonly !== true) {
                        scope.value = newValue;
                    }
                });
            } else {
                var directive = ctx.editor === 'custom' ? col.editorDirective : ('ep-' + ctx.editor + '-editor');
                scope.editorDirective = '<' + directive + ' ctx=ctx value=value editor-mode="' +
                    ctx.editorMode + '"/>';
            }

            var idTemplate = '#xtemplate';
            var target = angular.element(scope.state.iElement).find(idTemplate);
            target.empty().append($compile(scope.editorDirective)(scope));
        }

        function getRecordEditorState(scope) {
            return (scope.options && scope.options.recordEditor) ? scope.options.recordEditor.state : null;
        }
        function getRecordEditor(scope) {
            return (scope.options && scope.options.recordEditor) ? scope.options.recordEditor : null;
        }

        // <-----------------Private methods

        return {
            restrict: 'E,A',
            templateUrl: 'src/components/ep.record.editor/editors/ep-editor-control.html',
            replace: true,
            require: '?^form', //may be used outside a form
            link: function(scope, element, iAttrs, formCtrl) {
                scope.state = {
                    iElement: element,
                    formCtrl: formCtrl
                };

                scope.$watch('column', function(newValue) {
                    if (newValue !== undefined) {
                        createContext(scope);
                    }
                });

                scope.$watch('value', function(newValue) {
                    if (newValue !== undefined) {
                        if (!scope.column || !scope.column.editor || scope.column.editor === 'auto') {
                            //determine editor by value (auto mode)
                            if (!scope.editorValueType) {
                                //editor hasn't been determined yet
                                createContext(scope);
                            } else {
                                //editor has been determined but type might have changed
                                if (scope.editorValueType !== typeof scope.value) {
                                    createContext(scope);
                                } else if (scope.ctx.editor !== getEditorByValue(scope.value)) {
                                    createContext(scope);
                                }
                            }
                        }
                    }
                });

                scope.handleDrop = function(drop) {
                    var state = scope.ctx.recordEditorState;
                    if (state) {
                        var ctrlDrop = state.controls[scope.ctx.columnIndex];
                        var ctrlDragged = state.controls[drop.dragItem.columnIndex];
                        if (ctrlDrop !== ctrlDragged) {

                            var indexThis = ctrlDrop.seq;
                            var indexDropped = ctrlDragged.seq;
                            //save
                            if (ctrlDrop.origSeq === undefined) {
                                ctrlDrop.origSeq = indexThis;
                            }
                            if (ctrlDragged.origSeq === undefined) {
                                ctrlDragged.origSeq = indexDropped;
                            }
                            if (ctrlDrop.origSeq !== ctrlDrop.seq) {
                                delete ctrlDrop.origSeq;
                            }
                            if (ctrlDragged.origSeq !== ctrlDragged.seq) {
                                delete ctrlDragged.origSeq;
                            }

                            if (ctrlDragged.seq >= ctrlDrop.seq) {
                                ctrlDragged.seq = ctrlDrop.seq;
                                angular.forEach(state.controls, function(c) {
                                    if (c.seq > ctrlDrop.seq) {
                                        c.seq++;
                                    }
                                });
                                ctrlDrop.seq++;
                            } else {
                                angular.forEach(state.controls, function(c) {
                                    if (c.seq < ctrlDrop.seq) {
                                        c.seq--;
                                    }
                                });
                                ctrlDragged.seq = ctrlDrop.seq - 1;
                            }

                            if (state.fnOnDragDrop) {
                                state.fnOnDragDrop(scope.ctx, drop.dragItem);
                            }

                            scope.$apply();
                        }
                    }
                };
                //scope.leaveHandler = function(drop) {
                //};
                //scope.overHandler = function(drop) {
                //};

                scope.$on(epRecordEditorConstants.REC_EDITOR_VALIDATE_CONTROLS_TRIGGER, function(event, options) {
                    scope.ctx.displayInvalid = true;
                    scope.ctx.showInvalidFields = true;

                    var opts = options || { userValidation: false, focus: false };
                    opts = angular.extend(opts, { trigger: 'event'});
                    doValidation(scope.ctx, {}, (opts.focus === true), opts).then(function() {
                        if (scope.state.formCtrl && scope.state.formCtrl.$error.required) {
                            var rq = _.find(scope.state.formCtrl.$error.required, function(req) {
                                return scope.ctx.name === req.$name;
                            });
                            if (rq) {
                                rq.epEditorCtx = scope.ctx;
                            }
                        }
                    });
                });
            },
            scope: {
                column: '=',
                value: '=',
                options: '=',
                isDragEnabled: '=',
                isDropEnabled: '=',
                isRow: '='
            }
        };
    }
}());


/**
* @ngdoc directive
* @name ep.record.editor.directive:epImageEditor
* @restrict E
*
* @description
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epImageEditor', epImageEditorDirective);

    /*@ngInject*/
    function epImageEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-image-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            }
        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epMultilineEditor
* @restrict E
*
* @description
* @description
* Multiline editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epMultilineEditor', epMultilineEditorDirective);

    /*@ngInject*/
    function epMultilineEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-multiline-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        var ctx = $scope.ctx;
                        ctx.rows = ctx.col.rows || 5;
                        //set size class larger for multiline
                        ctx.fnSetSizeClass('col-xs-12 col-sm-12 col-md-8 col-lg-8');
                    }
                };
            }

        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epNumberEditor
* @restrict E
*
* @description
* @description
* Number editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epNumberEditor', epNumberEditorDirective);

    /*@ngInject*/
    function epNumberEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: function(ctrl, attrs) {
                var subType = '';
                if (attrs.editorMode) {
                    subType = '-' + attrs.editorMode;
                }
                return 'src/components/ep.record.editor/editors/ep-number-editor' + subType + '.html';
            },
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        var ctx = $scope.ctx;
                        var col = ctx.col;
                        var dec = 0;
                        if (ctx.editor === 'number') {
                            var fmt = col.oFormat;
                            if (!fmt) {
                                col.oFormat = fmt = {
                                    Min: -99999999999,
                                    Max: 99999999999
                                };
                            }

                            if (fmt.Min || fmt.Min === 0) {
                                ctx.min = fmt.Min;
                                //TO DO: rework AllowNegative to be Min=0
                                if (fmt.AllowNegative === false && fmt.Min < 0) {
                                    ctx.min = 0;
                                }
                            }
                            if (fmt.Max || fmt.Max === 0) {
                                ctx.max = fmt.Max;
                            }
                            if (fmt.NumberFormatInfo || (fmt.Decimals !== undefined)) {
                                //to do : negatives mask!!!
                                dec = 0;
                                if (fmt.Decimals !== undefined) {
                                    dec = fmt.Decimals;
                                } else {
                                    dec = fmt.NumberFormatInfo.NumberDecimalDigits || 0;
                                }
                                if (dec < 0) {
                                    dec = 0;
                                }
                                if (dec === 0) {
                                    ctx.pattern = '^NEG(\\d+)$';
                                } else {
                                    ctx.pattern =
                                        '^NEG(\\d+)([\'.\'](\\d){0,DEC})?$'.replace('DEC', dec.toString());
                                }
                                if (fmt.AllowNegative || false) {
                                    ctx.pattern = ctx.pattern.replace('NEG', '([-]?)');
                                } else {
                                    ctx.pattern = ctx.pattern.replace('NEG', '');
                                }
                            }
                        }

                        $scope.inputType = 'text';
                        $scope.inputNumberFmt = '';
                        ctx.numberDecimals = dec;
                        if (dec > 0) {
                            $scope.inputNumberFmt = 'decimal';
                        }

                        $scope.fnBlur = function($event, value) {
                            $scope.inputType = 'text';
                            if (ctx.fnBlur) {
                                ctx.fnBlur($event, value);
                            }
                        };

                        $scope.fnFocus = function($event, value) {
                            $scope.inputType = 'number';
                            if (ctx.fnFocus) {
                                ctx.fnFocus($event, value);
                            }
                        };

                        var callFnKeyDown = function(event, value, keyCode, currentReturn) {
                            //call user function
                            var ret = currentReturn;
                            if (ctx.fnDoKeyDown) {
                                ret = ctx.fnDoKeyDown(event, value, keyCode, currentReturn);
                            }
                            if (ret === false) {
                                event.preventDefault();
                            }
                            return ret;
                        };

                        $scope.fnKeyDown = function($event, value) {
                            var k = $event.keyCode;
                            //allow any special keys like Backspace, Del, Tab, etc
                            if (k === 8 || k === 9 || k === 16 || k === 33 || k === 34 ||
                                k === 35 || k === 36 || k === 37 || k === 38 || k === 39 || k === 40) {
                                return callFnKeyDown($event, value, k, true);
                            }
                            if ($event.ctrlKey) {
                                //for Copy/Paste etc
                                return callFnKeyDown($event, value, k, true);
                            }
                            if (ctx.disabled) {
                                //if disabled we cannot edit
                                return callFnKeyDown($event, value, k, false);
                            }
                            //var patt = new RegExp(ctx.pattern);
                            //var res = patt.test(str);

                            if ($event.char) {
                                //test for digits, decimal and minus
                                if (/[0-9]|[.]|[-]/.test($event.char)) {
                                    if ($event.target && $event.target.value && k === 190 &&
                                        ($event.target.value.indexOf('.') > -1 || ctx.numberDecimals === 0)) {
                                        return callFnKeyDown($event, value, k, false);
                                    }
                                    return callFnKeyDown($event, value, k, true);
                                }
                            } else {
                                //uncontrolled because we cannot trust key code
                                if ((k > 47 && k < 59) || (k === 189) || (k === 190)) {
                                    if ($event.target && $event.target.value && k === 190 &&
                                        ($event.target.value.indexOf('.') > -1 || ctx.numberDecimals === 0)) {
                                        return callFnKeyDown($event, value, k, false);
                                    }
                                    return callFnKeyDown($event, value, k, true);
                                }
                            }
                            return callFnKeyDown($event, value, k, false);
                        };
                    }
                };
            }
        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epNumberEditorFormat
* @restrict E
*
* @description
* This directive is used to valid format of number editor. switches the type="number" to type="text"
* when we move out of focus, for formatting.
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
        directive('epNumberEditorFormat', epNumberEditorFormatDirective);

    /*@ngInject*/
    function epNumberEditorFormatDirective() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, element, attrs, ngModel) {
                if (!ngModel) {
                    return;
                }

                scope.inputType = 'text';
                scope.decimals = scope.ctx.numberDecimals !== undefined ? scope.ctx.numberDecimals : 0;

                ngModel.$formatters.push(function(value) {
                    if (attrs.type === 'number') {
                        return value;
                    } else {
                        var v = value;
                        if (!angular.isNumber(v) || isNaN(v)) {
                            v = scope.validNgModel || 0;
                        }
                        return v.toFixed(scope.decimals);
                    }
                });

                var regX = new RegExp(scope.ctx.pattern);

                ngModel.$parsers.push(function(value) {
                    if (value) {
                        var v = scope.validNgModel || 0;
                        if (regX.test(value)) {
                            v = parseFloat(value);
                        } else {
                            ngModel.$setViewValue(v.toFixed(scope.decimals));
                            ngModel.$render();
                        }
                        return v;
                    }
                    return 0;
                });

                //ngModel.$validators.validCharacters = function(modelValue, viewValue) {
                //    var value = modelValue || viewValue;
                //    return true;
                //};

                scope.$watch('inputType', function(newValue, oldValue) {
                    if (newValue !== oldValue && newValue === 'text') {
                        var v = ngModel.$modelValue;
                        if (!angular.isNumber(v) || isNaN(v)) {
                            v = scope.validNgModel || 0;
                            ngModel.$modelValue = v;
                            ngModel.$setViewValue(v.toFixed(scope.decimals));
                            ngModel.$render();
                        } else {
                            ngModel.$setViewValue(v.toFixed(scope.decimals));
                            ngModel.$render();
                        }
                    }
                });

                scope.$watch('value', function(newValue, oldValue) {
                    if (ngModel.$valid) {
                        //keep track of a last valid value
                        scope.validNgModel = newValue;
                    } else {
                        scope.validNgModel = oldValue;
                    }
                });
             }
        };
    }
})();


/**
* @ngdoc directive
* @name ep.record.editor.directive:epSelectEditor
* @restrict E
*
* @description
* @description
* Select editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epSelectEditor', epSelectEditorDirective);

    /*@ngInject*/
    function epSelectEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: 'src/components/ep.record.editor/editors/ep-select-editor.html',
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            },
            compile: function() {
                return {
                    pre: function($scope) {
                        $scope.$watch('ctx.col.list', function() {

                            var ctx = $scope.ctx;
                            ctx.options = [];
                            if (ctx.col.list) {
                                ctx.options = angular.extend([], ctx.col.list);
                                angular.forEach(ctx.options, function(item) {
                                    item.getIsSelected = function() {
                                        return item.value === $scope.value;
                                    };
                                });
                            }

                            // add an 'empty' value for fields that are not required.
                            if (!ctx.required && !_.find(ctx.options, function(o) { return !o.value; })) {
                                if (!ctx.options) {
                                    ctx.options = [];
                                }
                                ctx.options.unshift({
                                    label: '', value: null, getIsSelected: function() {
                                        return !$scope.value;
                                    }
                                });
                            }

                        });
                    }
                };
            }
        };
    }
})();

/**
* @ngdoc directive
* @name ep.record.editor.directive:epTextEditor
* @restrict E
*
* @description
* @description
* Text editor used by ep-record-editor or ep-editor-control
*/
(function() {
    'use strict';

    angular.module('ep.record.editor').
    directive('epTextEditor', epTextEditorDirective);

    /*@ngInject*/
    function epTextEditorDirective() {
        return {
            restrict: 'E',
            replace: true,
            templateUrl: function(ctrl, attrs) {
                var subType = '';
                if (attrs.editorMode) {
                    subType = '-' + attrs.editorMode;
                }
                return 'src/components/ep.record.editor/editors/ep-text-editor' + subType + '.html';
            },
            scope: {
                'ctx': '=',
                'value': '=',
                'options': '='
            }
        };
    }
})();

/**
 * @ngdoc object
 * @name ep.record.editor.object:epRecordEditorConfig
 * @description
 * Provider for epRecordEditorConfig.
 * Gets configuration options from sysconfig.json or default
 */
(function() {
    'use strict';

    angular.module('ep.record.editor').provider('epRecordEditorConfig',
        function() {
            var config = {
                /**
                * @ngdoc property
                * @name sampleProperty
                * @propertyOf ep.record.editor.object:epRecordEditorConfig
                * @public
                * @description
                * Represents the sampleProperty
                */
                sampleProperty: false,
            };

            //we use the epSysConfig provider to perform the $http read against sysconfig.json
            //epSysConfig.mergeSection() function merges the defaults with sysconfig.json settings
            this.$get = ['epSysConfig', function(epSysConfig) {
                epSysConfig.mergeSection('ep.record.editor', config);
                return config;
            }];
        });
})();

/**
 * @ngdoc object
 * @name ep.record.editor.object:epRecordEditorConstants
 * @description
 * Constants for epRecordEditorConstants.
 * Events:
    * <pre>
    *   REC_EDITOR_VALIDATE_CONTROLS_TRIGGER - trigger event to validate all ep-editor controls
    * </pre>
 */
(function() {
    'use strict';

    angular.module('ep.record.editor').constant('epRecordEditorConstants', {
        //EVENT NAMES:
        REC_EDITOR_VALIDATE_CONTROLS_TRIGGER: 'EP-VALIDATE-EDITOR-CONTROLS'
    });
})();

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.record.editor.directive:epRecordEditor
    * @restrict E
    * @scope
    *
    * @description
    * Used to display/edit record controls of a provided record
    *
    * @param {object} record - binding to a record
    * @param {bool} isReadOnly - set true if editing will not be allowed
    * @param {string} sizeClass - default size class for all editors (bootstrap column size col-md-6, etc)
    * @param {function} onInit - callback when control has initialized. Provides factory
    * @param {object} options - are used to setup the directive. Options are shown in example below. Refer
    *                           to ep-editor-control directive for definition of column metadata. Factory is
    *                           also set on the options object
    *
    * @example
    *   HTML:
    *
    *   <recordeditor id="recordViewEditors" options="options" record="activeRecord" is-read-only="expression" />
    *
    *   Script:
    *
    *    scope.recordEditorOptions = {
    *        columns: columns,       //metadata for columns - array of columns
    *        columnTemplate: {}      //properties to be applied on all columns
    *        factory: null,          //after directive initialization will expose factory to this control
    *        flagInvalid: false,     //flag controls when invalid (changes border color)
    *        dragAndDrop: false,     //drag and drop allowed
    *        dragEnabled: false,     //drag allowed
    *        dropEnabled: false,     //drop allowed
    *    };
    */
    epRecordEditorDirective.$inject = ['$timeout', '$q', 'epRecordEditorFactory', 'epUtilsService', 'epFeatureDetectionService'];
    angular.module('ep.record.editor').
        directive('epRecordEditor', epRecordEditorDirective);

    /*@ngInject*/
    function epRecordEditorDirective($timeout, $q, epRecordEditorFactory, epUtilsService, epFeatureDetectionService) {
        // Private methods ------------------>

        function getNewState() {
            var state = {
                scope: null,
                linkElement: null,
                formElement: null,
                controls: null,
                activeRecord: undefined,
                rowData: {},
                isReadOnly: false,
                lastInputs: {},
                isDataArray: false,
                dragEnabled: false,
                dropEnabled: false
            };
            return state;
        }

        function selectFirstControl(scope) {
            //TODO: This selects the first input element, even if there's a select element before it
            var controls = _.filter(scope.state.linkElement.find('.editor'), function(el) {
                return !$(el).attr('disabled');
            });

            //only focus the field if we are on a non touch device because it causes the keyboard to popup
            //on touch devices which can be an annoying user experience.
            if (!epFeatureDetectionService.hasTouchEvents()) {
                if (controls.length) {
                    var first = $(controls[0]);
                    first.focus();
                }
            }
        }

        function selectFirstInvalidControl(scope) {
            //TODO: This selects the first input element, even if there's a select element before it
            if (scope.state.controls) {
                var ctx;
                var ctrlFirst = _.find(scope.state.controls, function(ctrl) {
                    ctx = ctrl.getControlCtx();
                    return (ctx.isInvalid);
                });
                if (ctrlFirst) {
                    ctx.fnSetFocus();
                }
            }
        }

        function selectFocusedControl(scope) {
            if (scope.state.lastFocused && scope.state.lastFocused.Event.originalEvent &&
                scope.state.lastFocused.Event.originalEvent.target) {

                //only focus the field if we are on a non touch device because it causes the keyboard to popup
                //on touch devices which can be an annoying user experience.
                if (!epFeatureDetectionService.hasTouchEvents()) {
                    scope.state.lastFocused.Event.originalEvent.target.focus();
                }

                return true;
            }
            return false;
        }

        function doValidation(state, ctx, ev, focus) {
            var dc = ctx.columnIndex;
            if (state.activeRecord[dc] !== undefined) {
                var originalValue = state.rowData[dc];
                //We call the field validation if input value has changed compared to original
                //and it is not the same as previously entered
                if (state.lastInputs[dc]) {
                    originalValue = state.lastInputs[dc];
                }
                var inputValue = state.activeRecord[dc];
                if (state.lastInputs[dc] === inputValue) {
                    return;
                } //prevent calling if last input was same
                state.lastInputs[dc] = inputValue;
                if (compareValues(originalValue, inputValue)) {
                    ctx.isInvalid = false;
                    $q.when(ctx.col.fnOnFldValidate(ctx, ev, inputValue, originalValue,
                        { trigger: 'recordEditorValidation' })).then(function(result) {
                        if (result === false) {
                            ctx.isInvalid = true;
                        }
                        if (focus) {
                            ctx.fnSetFocus();
                        }
                    });
                }
            }
        }

        function getEditorByValue(v) {
            var tp = typeof v;
            if (tp === 'number') {
                return 'number';
            } else if (tp === 'boolean') {
                return 'checkbox';
            } else if (tp === 'date') {
                return 'date';
            } else if (tp === 'string') {
                var reg = /\d{4}-\d{2}-\d{2}['T']/;
                if (v && v.match(reg)) {
                    return 'date';
                }
            }
            return 'text';
        }

        function doDraw(scope, bForceRedraw) {
            if (scope.state.controls !== null && !bForceRedraw) {
                return; //unless force redraw, we should not recreate
            }

            //Prepare columns
            var hasCols = scope.options && angular.isArray(scope.options.columns);
            if (!scope.state.isDataArray && !hasCols && scope.record) {
                var columns = [];
                if (scope.options && scope.options.columns && angular.isString(scope.options.columns)) {
                    var colNames = scope.options.columns.split(',');
                    angular.forEach(colNames, function(c) {
                        columns.push({
                            columnIndex: c,
                            editor: 'auto', // getEditorByValue(scope.record[c]),
                            updatable: true
                        });
                    });
                } else {
                    angular.forEach(scope.record, function(v, n) {
                        columns.push({
                            columnIndex: n,
                            editor: 'auto', //getEditorByValue(v),
                            updatable: true
                        });
                    });
                }
                scope.state.columns = columns;
            } else {
                scope.state.columns = hasCols ? scope.options.columns : [];
            }
            if (scope.options && scope.options.columnTemplate && scope.state.columns) {
                angular.forEach(scope.state.columns, function(c) {
                    epUtilsService.copyProperties(scope.options.columnTemplate, c, false);
                });
            }

            if (scope.state.columns && scope.record) {
                angular.forEach(scope.state.columns, function(c) {
                    if (!c.editor && c.columnIndex) {
                        c.editor = getEditorByValue(scope.record[c.columnIndex]);
                    }
                });
            }

            if (!scope.state.columns || !scope.state.columns.length) {
                return;
            }

            createContext(scope);

            // TODO: Fix this ugly hack
            $timeout(function() {
                selectFirstControl(scope);
            }, 250);

            if (scope.state.isReadOnly) {
                scope.setReadOnly();
            }
        }

        function createContext(scope) {
            //to pass as options to control editors
            scope.state.options = {
                recordEditor: {
                    state: scope.state,
                    doValidation: doValidation
                }
            };

            var controls = {};
            var iIndex = -1;
            _.each(_.filter(scope.state.columns,
                function(c) { return (c.columnIndex >= 0 || c.columnIndex); }),
                function(col) {

                iIndex++;
                var iVisibleIndex = iIndex;
                if (col.seq || col.seq === 0) {
                    iVisibleIndex = col.seq;
                } else if (col.columnIndex && !angular.isString(col.columnIndex)) {
                    iVisibleIndex = col.columnIndex;
                }

                var editor = (col.editor || 'text').trim().toLowerCase();
                var ctrl = {
                    col: col,
                    editor: editor,
                    seq: iVisibleIndex,
                    visibleIndex: ('000' + iVisibleIndex).substr(-3, 3), // <- so that it's sortable as a string
                    columnIndex: col.columnIndex,
                    options: scope.state.options
                };
                ctrl.getControlCtx = function() {
                    return ctrl.controlCtx;
                };
                controls[col.columnIndex] = ctrl;
            });
            scope.state.controls = controls;
        }

        function checkRecordType(scope) {
            if (scope.record) {
                scope.state.isDataArray = angular.isArray(scope.record);
            } else {
                scope.state.isDataArray = !scope.options || (scope.options.isDataArray !== false);
            }
        }

        function compareValues(original, input) {
            ///<summary>
            /// Compares the value of an input control
            /// to the value in underlying local store.
            ///</summary>
            ///<returns type='bool'>True if there is a change</returns>
            if (!original) {
                // if the original evaluates to 'false'
                // then check if the input value is changed
                return !!input;
            }
            if (input === null && original === null) {
                return false;
            }
            if ((input === null && original !== null) || (input !== null && original === null)) {
                return true;
            }
            return (original.toString() !== input.toString());
        }

        // <-----------------Private methods

        return {
            restrict: 'E,A',
            require: '?^form', //may be used outside a form
            templateUrl: 'src/components/ep.record.editor/ep-record-editor.html',
            replace: true,
            link: function(scope, element, iAttrs, formCtrl) {
                scope.state = getNewState();

                scope.state.factory = new epRecordEditorFactory(scope);

                if (scope.options) {
                    scope.options.factory = scope.state.factory;
                }

                scope.state.scope = scope;
                scope.state.linkElement = element;
                scope.state.formElement = formCtrl;
                checkRecordType(scope);

                scope.$watch('isReadOnly', function(newValue) {
                    if (newValue !== undefined) {
                        scope.state.isReadOnly = newValue;
                        $timeout(function() {
                            scope.setReadOnly();
                        });
                    }
                });

                scope.$watch('record', function(newValue) {
                    if (newValue && scope.state.activeRecord !== newValue) {
                        checkRecordType(scope);
                        scope.state.lastInputs = {};
                        scope.state.activeRecord = newValue;

                        //store a copy for reset
                        scope.state.rowData = scope.extendRecord(scope.state.activeRecord);

                        if (!scope.state.columns || !scope.state.columns.length) {
                            doDraw(scope, false);
                        }
                        if (scope.state.columns && scope.state.columns.length) {
                            scope.state.factory.setPristine();
                        }
                    }
                });

                scope.$watch('options', function(newValue, oldValue) {
                    if (newValue) {
                        //Expose this directive's scope to outside caller
                        newValue.factory = scope.state.factory;
                        if (angular.equals(newValue, oldValue)) {
                            if (scope.options) {
                                if (scope.options.dragAndDrop !== undefined) {
                                    scope.state.dragEnabled = scope.options.dragAndDrop === true;
                                    scope.state.dropEnabled = scope.state.dragEnabled;
                                } else if (scope.options.dragEnabled !== undefined) {
                                    scope.state.dragEnabled = scope.options.dragEnabled === true;
                                } else if (scope.options.dropEnabled !== undefined) {
                                    scope.state.dropEnabled = scope.options.dropEnabled === true;
                                }
                            }
                            if (!scope.state.columns || !scope.state.columns.length) {
                                checkRecordType(scope);
                                doDraw(scope, false);
                            }
                        }
                    }
                });

                scope.$watch('sizeClass', function(newValue) {
                    if (scope.state.controls && newValue !== undefined) {
                        $timeout(function() {
                            angular.forEach(scope.state.controls, function(ctrl) {
                                var ctx = ctrl.getControlCtx();
                                if (ctx) {
                                    ctx.fnSetSizeClass(newValue || '');
                                }
                            });
                        });
                    }
                });

                scope.extendRecord = function(record) {
                    return jQuery.extend(scope.state.isDataArray ? [] : {}, record);
                };

                scope.redraw = function() {
                    doDraw(scope, true);
                };

                // When the local scope is destroyed, be sure to clean up the events
                scope.$on(
                    '$destroy',
                    function() {
                        //clean up events and buffers
                        scope.state.controls = null;
                    }
                );

                // Interface (public) methods: -->

                scope.doDraw = function() {
                    doDraw(scope, true);
                };

                scope.setReadOnly = function() {
                    //set readonly attribute to all updatable controls
                    if (scope.state.controls) {
                        _.each(scope.state.controls, function(ctrl) {
                            var ctx = ctrl.getControlCtx();
                            if (ctx.updatable) {
                                ctx.readonly = scope.state.isReadOnly;
                            }
                        });
                    }
                };

                scope.recEdtSelectControl = function(mode) {
                    if (mode === 'first') {
                        selectFirstControl(scope);
                    } else if (mode === 'focused') {
                        selectFocusedControl(scope);
                    } else if (mode === 'focusedOrFirst') {
                        if (selectFocusedControl(scope) === false) {
                            selectFirstControl(scope);
                        }
                    } else if (mode === 'invalid') {
                        selectFirstInvalidControl(scope);
                    } else {
                        selectFirstControl(scope);
                    }
                };

                if (scope.onInit) {
                    scope.onInit({ factory: scope.state.factory });
                }

                scope.compareValues = compareValues;

            },
            scope: {
                options: '=',
                record: '=',
                isReadOnly: '=',
                sizeClass: '=',
                onInit: '&'
            }
        };
    }
}());


(function() {
'use strict';
/**
 * @ngdoc service
 * @name ep.record.editor.factory:epRecordEditorFactory
 * @description
 * Factory service for the ep.record.editor module
 * record editor creates controls by metadata
 *
 * @example
 *
 */
angular.module('ep.record.editor').
    factory('epRecordEditorFactory', epRecordEditorFactory);

    /*@ngInject*/
    function epRecordEditorFactory() {
        var epRecordEditorFactoryInstance = function(directiveScope) {
            var scope = directiveScope;
            var id = 'recordEditor' + scope.$id;

            /**
             * @ngdoc method
             * @name getEnteredData
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Get the entered data information
            */
            function getEnteredData() {
                ///<summary>
                /// Get the results of record entry
                ///</summary>
                var ret = {
                    editsDetected: false,
                    changedColumns: [],
                    record: scope.state.activeRecord
                };

                if (scope.state.columns) {
                    var columns = scope.state.columns;
                    for (var idx = 0; idx < columns.length; idx++) {
                        var col = columns[idx];
                        var dataColumn = col.columnIndex;
                        var inputValue;
                        if (scope.state.activeRecord) {
                            inputValue = scope.state.activeRecord[dataColumn];
                        }
                        if (inputValue === undefined) {
                            if (col.editor === 'text') {
                                inputValue = '';
                            } else if (col.editor === 'number') {
                                inputValue = 0;
                            }
                        }

                        if (inputValue !== undefined) {
                            var originalValue = scope.state.rowData[dataColumn];
                            if (scope.compareValues(originalValue, inputValue)) {
                                ret.changedColumns.push({
                                    rowIndex: scope.state.rowIndex, columnIndex: dataColumn,
                                    originalValue: originalValue, newValue: inputValue
                                });
                                ret.editsDetected = true;
                            }
                        } else if (col.editor === 'date') {
                            ret.editsDetected = true;
                            ret.invalidEntry = true;
                        }
                    }
                }
                return ret;
            }

            /**
             * @ngdoc method
             * @name resetEditors
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Reset the editors to original values
            */
            function resetEditors() {
                var columns = scope.state.columns;
                for (var idx = 0; idx < columns.length; idx++) {
                    var col = columns[idx];
                    scope.state.activeRecord[col.columnIndex] = scope.state.rowData[col.columnIndex];
                }

                setPristine();
                scope.recEdtSelectControl('first');
            }

            /**
             * @ngdoc method
             * @name clearEditors
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Clear all values
            */
            function clearEditors() {
                if (scope.state.controls) {
                    _.each(scope.state.controls, function(ctrl) {
                        var ctx = ctrl.getControlCtx();
                        var emptyVal = '';
                        if (ctx.editor === 'number') {
                            emptyVal = 0;
                        } else if (ctx.editor === 'checkbox') {
                            emptyVal = false;
                        }
                        scope.state.activeRecord[ctx.columnIndex] = emptyVal;
                    });
                }
            }

            /**
             * @ngdoc method
             * @name setPristine
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Set record editor as pristine (clear dirty and invalid flags)
            */
            function setPristine() {
                if (scope.state.formElement) {
                    scope.state.formElement.$setPristine();
                }
                scope.state.lastInputs = {};
                scope.state.showAllInvalidFields = false;

                if (scope.state.controls) {
                    angular.forEach(scope.state.controls, function(ctrl) {
                        var ctx = ctrl.getControlCtx();
                        if (ctx) {
                            ctx.isInvalid = false;
                        }
                    });
                }
            }

            /**
             * @ngdoc method
             * @name setReadOnly
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Set record editor in read-only state
             *
             * @param {bool} readOnly - true - turn on; false - turn off
            */
            function setReadOnly(readOnly) {
                ///set specified readonly state to updatable fields
                scope.state.isReadOnly = readOnly;
                scope.setReadOnly();
            }

            /**
             * @ngdoc method
             * @name draw
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Force a redraw
            */
            function draw() {
                scope.doDraw(scope, true);
            }

            /**
             * @ngdoc method
             * @name setRecord
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Force set record even if it has not changed, resetting original copy and redrawing and setting pristine
             * @param {object} record - record as array or object
            */
            function setRecord(record) {
                var rec = (record) ? record : scope.state.activeRecord;
                scope.state.lastInputs = {};
                scope.state.activeRecord = rec;
                scope.state.rowData = scope.extendRecord(rec); //store a copy for reset
                setPristine();
            }

            /**
             * @ngdoc method
             * @name setRecordWithoutOriginal
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Set record without changing the original values
             * @param {object} record - record as array or object
            */
            function setRecordWithoutOriginal(record) {
                if (record && scope.state.activeRecord !== record) {
                    scope.state.activeRecord = record;
                }
            }

            /**
             * @ngdoc method
             * @name selectControl
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Select control by specified mode
             * @param {string} mode - 'first','invalid'
            */
            function selectControl(mode) {
                scope.recEdtSelectControl(mode);
            }

            /**
             * @ngdoc method
             * @name validate
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Perform validation
             * @param {bool} showAllInvalidFields - highlight all invalid fields
             * @param {bool} focusOnFirstInvalid - focus on first invalid field
            */
            function validate(showAllInvalidFields, focusOnFirstInvalid) {
                ///<summary>
                /// Validate user input record entry
                ///</summary>
                var ret = {
                    invalidEntry: false,
                    requiredFields: false,
                    invalidFieldValidation: false
                };

                if (scope.state.controls) {
                    scope.state.linkElement.find('.form-control.editor').each(function() {
                        var editor = $(this);
                        if (editor.length) {
                            if (editor.hasClass('ng-invalid')) {
                                ret.invalidEntry = true;
                                if (editor.hasClass('ng-invalid-required')) {
                                    ret.requiredFields = true;
                                }
                            }
                        }
                    });

                    var epInvalid = _.find(scope.state.controls, function(ctrl) {
                        var ctx = ctrl.getControlCtx();
                        return ctx.isInvalid;
                    });
                    if (epInvalid) {
                        ret.invalidEntry = true;
                        ret.invalidFieldValidation = true;
                    }
                }
                if (ret.requiredFields) {
                    //this will be combination of various flags
                    ret.invalidEntry = true;
                }
                scope.state.showAllInvalidFields = showAllInvalidFields || false;

                if (ret.invalidEntry && (focusOnFirstInvalid || false)) {
                    selectControl('invalid');
                }

                return ret;
            }

            /**
             * @ngdoc method
             * @name resetCombo
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Reset combo for specified column
             * @param {bool} column - column
             * @param {array} list - new list of items
            */
            function resetCombo(column, list) {
                if (!list) { return; }
                //reset column combo. if column is string then by columnName otherwise by columnIndex
                var ctx = getColumnContext(scope, column);
                if (ctx && ctx.col.list) {
                    ctx.options = angular.extend([], ctx.col.list);
                    angular.forEach(ctx.options, function(item) {
                        item.getIsSelected = function() {
                            return item.value === ctx.fnGetCurrentValue();
                        };
                    });
                }
            }

            /**
             * @ngdoc method
             * @name getColumnContext
             * @methodOf ep.record.editor.factory:epRecordEditorFactory
             * @public
             * @description
             * Get column context
             * @param {object} column - column name or column index
            */
            function getColumnContext(column) {
                if (column === null || !scope.state.columns)
                {
                    return null;
                }
                var ctrl = _.find(scope.state.controls, function(ctrl) {
                    var ctx = ctrl.getControlCtx();
                    return (ctx.col && ctx.columnIndex === column);
                });
                if (ctrl) {
                    return ctrl.getControlCtx();
                }
                return null;
            }

            function getColumns() {
                return scope.state.columns;
            }

            function getOptions() {
                return scope.options;
            }

            function getState() {
                return scope.state;
            }

            function enableEditorsDrag(enableDrag, enableDrop) {
                scope.state.dragEnabled = enableDrag;
                scope.state.dropEnabled = enableDrop;
            }

            return {
                id: id,
                getEnteredData: getEnteredData,
                resetEditors: resetEditors,
                clearEditors: clearEditors,
                setPristine: setPristine,
                setReadOnly: setReadOnly,
                draw: draw,
                setRecord: setRecord,
                setRecordWithoutOriginal: setRecordWithoutOriginal,
                selectControl: selectControl,
                validate: validate,
                resetCombo: resetCombo,
                getColumnContext: getColumnContext,
                getColumns: getColumns,
                getOptions: getOptions,
                getState: getState,
                enableEditorsDrag: enableEditorsDrag
            };
        };
        return epRecordEditorFactoryInstance;
    }
}());

(function() {
'use strict';
/**
* @ngdoc filter
* @name ep.record.editor.filter:epRecordEditor
* @restrict E
*
* @description
* Represents the ep.record.editor filter
*
* @example
*/
angular.module('ep.record.editor').
    filter('epOrderObjectBy', epOrderObjectByFilter);

    /*@ngInject*/
    function epOrderObjectByFilter() {
        return function(items, field, reverse) {
            var filtered = _.map(items, _.identity);
            var director = reverse ? -1 : 1;
            filtered.sort(function(a, b) {
                return (a[field] > b[field] ? director : -director);
            });
            return filtered;
        };
    }
}());

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.switch.directive:epSwitch
    * @restrict E
    *
    * @description
    * Represents the ep.switch directive
    * This directive draws a simple ON/OFF switch
    * bootstrap-switch library must be included in the applications that use this control
    *
    * @property {string} ng-model:string
    *  This property sets the binding to a object property.
    *
    * @property {string} onChangeHandler:string
    *  This attribute sets the name of handler function on the scope called when switch value changes.
    *
    * @example
    <doc:example module="ep.switch">
      <doc:source>
        <ep-switch ng-model="onOff"><ep-switch>
      </doc:source>
    </doc:example>
    */
    epSwitchDirective.$inject = ['$timeout'];
    angular.module('ep.switch').
        directive('epSwitch', epSwitchDirective);

    /*@ngInject*/
    function epSwitchDirective($timeout) {
        return {
            restrict: 'E',
            require: '?ngModel',
            template: '<input type="checkbox" class="bs-switch">',
            link: function(scope, element, attrs, ngModel) {

                if (!ngModel) { return; }

                //Outward (from control to bound object)
                ngModel.$parsers.unshift(function(value) {
                    return value;
                });

                //Inward (from bound object to control)
                ngModel.$formatters.push(function(value) {
                    return value;
                });

                $timeout(function() {
                    var el = $(element).find('input');
                    el.bootstrapSwitch({
                        state: ngModel.$viewValue
                    });

                    el.on('switchChange.bootstrapSwitch', function(e) {
                        ngModel.$setViewValue(e.target.checked);

                        if (scope[attrs.onChangeHandler]) {
                            scope[attrs.onChangeHandler].call(e.target.checked);
                        }
                    });

                    // On destroy, collect garbage
                    scope.$on('$destroy', function() {
                        el.bootstrapSwitch('destroy');
                    });
                });
            }
        };
    }
}());

//# sourceMappingURL=emf.editors.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.color.selector/color_selector.html',
    "<div class=\"ep-color-selector-container vertical-align\" ng-style=\"{ 'width': width }\"><div class=input-group><input class=form-control value=\"{{ngModel}}\"><div class=input-group-btn><button type=button class=\"btn btn-default dropdown-toggle\" colorpicker colorpicker-parent=true ng-attr-colorpicker-close-on-select=\"{{closeOnSelect == 'true' ? '' : undefined}}\" colorpicker-position=\"{{position ? position : 'bottom'}}\" colorpicker-size=\"{{size ? size : 100}}\" ng-model=ngModel ng-style=\"applyColorToBtn == 'true' && {'background-color': ngModel}\"><span class=\"fa {{icon ? icon : 'fa-eyedropper'}}\"></span></button></div></div></div>"
  );


  $templateCache.put('src/components/ep.icon.selector/icon_selector.html',
    "<div class=ep-icon-selector-container ng-style=\"{ 'width': width }\"><div class=input-group><input class=form-control ng-model=ngModel><div class=input-group-btn><button type=button class=\"btn btn-default dropdown-toggle\" data-toggle=dropdown aria-expanded=false><span class=\"fa {{ngModel}}\"></span></button><div class=\"dropdown-menu dropdown-menu-right\" role=menu ng-style=\"{ 'width': iconListWidth }\"><div class=\"icon-filter-field vertical-align text-center\"><input class=form-control placeholder=\"Type to filter\" ng-model=filteredIcon></div><ul class=icon-list ng-style=\"{ 'max-height': iconListHeight }\"><li ng-repeat=\"icon in icons | orderBy | filter: filteredIcon\" ng-click=selectIcon(icon)><span class=\"fa fa-{{icon}}\"></span>fa-{{icon}}</li></ul></div></div></div></div>"
  );


  $templateCache.put('src/components/ep.ui.range.slider/ep-range-slider.html',
    "<div class=ep-range-slider-ctr><div ng-show=touch><div class=ep-range-slider-value-ctr ng-click=toggleRangeInputMode()>{{rangeMin}} - {{rangeMax}}</div><div class=ep-range-slider-value-axis><div class=ep-range-ctr><div class=ep-range></div></div><div class=\"ep-range-slide-handle ep-range-slide-handle-min js-handle-min\"></div><div class=\"ep-range-slide-handle ep-range-slide-handle-max js-handle-max\"></div></div><div class=ep-range-steps-ctr><span class=\"ep-range-step ep-range-step-{{::step}}\" ng-repeat=\"step in steps\"></span></div></div><div ng-show=!touch><input class=\"form-control ep-range-input-min\" name=tbMin ng-model=rangeMin ng-model-options=\"{ debounce: 500 }\"><label for=tbMax>and</label><input class=\"form-control ep-range-input-max\" name=tbMax ng-model=rangeMax ng-model-options=\"{ debounce: 500 }\"><div class=range-slider-mode-toggle-ctr><small class=ep-range-slider-toggle-mode ng-click=toggleRangeInputMode()>Switch to slider</small></div></div></div>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-checkbox-editor.html',
    "<section><section ng-if=\"checkBoxMode ==='checkbox'\" class=\"ep-editor-checkbox ep-center-item editor\" tabindex=0 ng-keyup=handleKey($event) ng-click=ctx.toggleValue(ctx,$event) ng-hide=ctx.fnDoValidations()><span ng-class=\"{'fa-square-o': !value, 'fa-check-square-o': value}\" class=\"fa fa-{{ctx.checkBoxSize}}\"></span></section><section ng-if=\"checkBoxMode ==='switch'\" class=\"ep-editor-switch editor\" ng-keyup=handleKey($event) ng-hide=ctx.fnDoValidations()><ep-switch ng-model=temp.chk></ep-switch></section></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-date-editor.html',
    "<section class=ep-date-editor><input id=dd_{{ctx.name}} ng-model=value ep-date-convert=toDate ng-hide=\"true\"><div class=\"input-group date datepicker\" id=dp_{{ctx.name}} ng-if=!ctx.useDateInput><span ng-if=ctx.classLeftBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span> <input size=16 ep-date-convert=toString id={{ctx.name}} name={{ctx.name}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly class=\"form-control editor {{isMeridian ? 'ep-time-meridian' : ''}}\" ng-hide=ctx.fnDoValidations() ng-model=ctx.dateValue ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) pattern={{ctx.pattern}} ng-keydown=ctx.fnDateKeyDown($event) uib-datepicker-popup={{ctx.format}} data-container=body datepicker-options111={{ctx.dateOptions}} placeholder={{ctx.format}} ng-pattern={{ctx.pattern}} is-open=\"ctx.dateOpened\"> <span ng-if=\"showTime === true\" class=\"input-group-addon ep-time-picker {{isMeridian ? 'ep-time-meridian' : ''}} {{showInNewLine ? 'ep-time-new-line' : ''}}\" uib-timepicker show-spinners=false ng-model=ctx.timeValue ng-change=timeChanged() hour-step=hourStep minute-step=minuteStep show-meridian=isMeridian></span> <span class=input-group-addon ng-click=ctx.fnDateOpen($event) ng-style=\"{ 'cursor': ctx.disabled ? 'not-allowed' : 'pointer' }\"><a ng-if=!ctx.disabled><i class=\"fa fa-calendar\"></i></a> <i ng-if=ctx.disabled class=\"fa fa-calendar\"></i></span> <span ng-if=ctx.classRightBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post'}\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div><div class=\"input-group date\" id=dp_{{ctx.name}} ng-if=\"ctx.useDateInput === true\"><span ng-if=ctx.classLeftBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span> <input size=16 type=date ep-date-convert=toString id={{ctx.name}} name={{ctx.name}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly class=\"form-control editor {{isMeridian ? 'ep-time-meridian' : ''}}\" ng-hide=ctx.fnDoValidations(this) ng-model=ctx.dateValue ng-change=ctx.fnOnChange($event) ng-blur=\"ctx.fnBlur($event)\"> <span ng-if=\"showTime === true\" class=\"input-group-addon ep-time-picker {{isMeridian ? 'ep-time-meridian' : ''}} {{showInNewLine ? 'ep-time-new-line' : ''}}\" uib-timepicker show-spinners=false ng-model=ctx.timeValue ng-change=timeChanged() hour-step=hourStep minute-step=minuteStep show-meridian=isMeridian></span> <span ng-if=ctx.classRightBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post'}\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-editor-control.html',
    "<div class=\"ep-editor-control {{ctx.sizeClass}} ep-editor-mode-{{ctx.mode}} {{ctx.classRightBtns}} {{ctx.classLeftBtns}}\" ng-hide=ctx.hidden ep-drop-area drop-enabled=\"isDropEnabled === true\" drop-handler=handleDrop drop-item-types=typeEditorCtrl ng-style=ctx.style><fieldset ng-if=\"isRow !== true\" class=\"form-group ep-record-editor-container\" ng-class=\"{'has-error': ctx.invalidFlag}\" ep-draggable drag-enabled=\"isDragEnabled === true\" drag-item=ctx drag-item-type=\"'typeEditorCtrl'\"><!--display caption above editor or just editor (mini mode)--><div class=\"ep-div-editor-label {{ctx.col.classLabel}}\"><label class=ep-editor-label for={{ctx.name}} ng-if=\"ctx.mode !== 'mini'\">{{ctx.label}}<span ng-if=ctx.requiredFlag class=\"required-indicator text-danger fa fa-asterisk\"></span></label></div><div class={{ctx.col.classEditor}}><section id=xtemplate></section></div></fieldset><div ng-if=\"isRow === true\" class=\"ep-record-editor-container ep-is-row-editor row\"><!--display caption and editor in a bootstrap grid system in horizontal row--><div class=\"ep-div-editor-label {{ctx.col.classLabel || 'col-xs-4'}}\"><label class=ep-editor-label for={{ctx.name}}>{{ctx.label}}<span ng-if=ctx.requiredFlag class=\"required-indicator text-danger fa fa-asterisk\"></span></label></div><div class={{ctx.col.classEditor}}><section id=xtemplate></section></div></div></div>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-image-editor.html',
    "<section><img alt={{ctx.label}} id={{ctx.name}} ng-src={{value}} width={{ctx.imageWidth}} height=\"{{ctx.imageHeight}}\"></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-multiline-editor.html',
    "<section><div ng-class=\"{'input-group': ctx.buttons && ctx.buttons.length > 0 }\"><span ng-if=ctx.classLeftBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span><textarea id={{ctx.name}} name={{ctx.name}} placeholder={{ctx.placeholder}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) rows={{ctx.rows}} class=\"form-control editor\" ng-hide=ctx.fnDoValidations() maxlength={{ctx.maxlength}} ng-style=\"{'text-align': ctx.justification }\"></textarea><span ng-if=ctx.classRightBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-number-editor-rbutton.html',
    "<section><div ng-class=input-group><input id={{ctx.name}} ng-cloak ep-number-editor-format={{inputNumberFmt}} name={{ctx.name}} type=\"{{inputType || 'number'}}\" ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-keydown=\"fnKeyDown($event, value)\" ng-blur=\"fnBlur($event, value)\" ng-focus=\"fnFocus($event, value)\" class=\"form-control editor\" ng-style=\"{ 'text-align': ctx.justification }\" maxlength={{ctx.maxlength}} min={{ctx.min}} max={{ctx.max}} ng-hide=ctx.fnDoValidations() pattern=\"{{ctx.pattern}}\"> <span class=input-group-addon ng-click=\"ctx.fnBtnClick(ctx.buttons[0], this, $event)\" style=\"cursor: pointer\"><i class={{ctx.buttons[0].style}}>{{ctx.buttons[0].text}}</i></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-number-editor-simple.html',
    "<section><div><input id={{ctx.name}} ng-cloak ep-number-editor-format={{inputNumberFmt}} name={{ctx.name}} type=\"{{inputType || 'number'}}\" ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-keydown=\"fnKeyDown($event, value)\" ng-blur=\"fnBlur($event, value)\" ng-focus=\"fnFocus($event, value)\" class=\"form-control editor\" ng-style=\"{ 'text-align': ctx.justification }\" maxlength={{ctx.maxlength}} min={{ctx.min}} max={{ctx.max}} ng-hide=ctx.fnDoValidations() pattern=\"{{ctx.pattern}}\"></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-number-editor.html',
    "<section><div ng-class=\"{'input-group': ctx.buttons && ctx.buttons.length > 0 }\"><span ng-if=ctx.classLeftBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span> <input id={{ctx.name}} ng-cloak ep-number-editor-format={{inputNumberFmt}} name={{ctx.name}} type=\"{{inputType || 'number'}}\" ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-keydown=\"fnKeyDown($event, value)\" ng-blur=\"fnBlur($event, value)\" ng-focus=\"fnFocus($event, value)\" class=\"form-control editor\" ng-style=\"{ 'text-align': ctx.justification }\" maxlength={{ctx.maxlength}} min={{ctx.min}} max={{ctx.max}} ng-hide=ctx.fnDoValidations() pattern=\"{{ctx.pattern}}\"> <span ng-if=ctx.classRightBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-select-editor.html',
    "<section><div ng-class=\"{'input-group': ctx.buttons && ctx.buttons.length > 0 }\"><span ng-if=ctx.classLeftBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span><select class=\"form-control editor\" id={{ctx.name}} name={{ctx.name}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) ng-hide=ctx.fnDoValidations() ng-model=value><option ng-repeat=\"opt in ctx.options\" label={{opt.label}} value={{opt.value}} ng-selected=opt.getIsSelected()>{{opt.label}}</option></select><span ng-if=ctx.classRightBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post'}\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-text-editor-rbutton.html',
    "<section><div class=input-group><input id={{ctx.name}} ng-cloak name={{ctx.name}} type={{ctx.type}} placeholder={{ctx.placeholder}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) class=\"form-control editor\" ng-hide=ctx.fnDoValidations() maxlength={{ctx.maxlength}} ng-style=\"{ 'text-align': ctx.justification }\"> <span class=input-group-addon ng-click=\"ctx.fnBtnClick(ctx.buttons[0], this, $event)\" style=\"cursor: pointer\"><i class={{ctx.buttons[0].style}}>{{ctx.buttons[0].text}}</i></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-text-editor-simple.html',
    "<section><div><input id={{ctx.name}} ng-cloak name={{ctx.name}} type={{ctx.type}} placeholder={{ctx.placeholder}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) class=\"form-control editor\" ng-hide=ctx.fnDoValidations() maxlength={{ctx.maxlength}} ng-style=\"{ 'text-align': ctx.justification }\"></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/editors/ep-text-editor.html',
    "<section><div ng-class=\"{'input-group': ctx.buttons && ctx.buttons.length > 0 }\"><span ng-if=ctx.classLeftBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'pre' }\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span> <input id={{ctx.name}} ng-cloak name={{ctx.name}} type={{ctx.type}} placeholder={{ctx.placeholder}} ng-required=ctx.required ng-disabled=ctx.disabled ng-readonly=ctx.readonly ng-model=value ng-change=ctx.fnOnChange($event) ng-blur=ctx.fnBlur($event) class=\"form-control editor\" ng-hide=ctx.fnDoValidations() maxlength={{ctx.maxlength}} ng-style=\"{ 'text-align': ctx.justification }\"> <span ng-if=ctx.classRightBtns class=input-group-addon ng-repeat=\"btn in ctx.buttons | orderBy:['seq'] | filter:{ position : 'post'}\" ng-click=\"ctx.fnBtnClick(btn, this, $event)\" style=\"cursor: pointer\"><i ng-if=\"btn.type == 'btn'\" class={{btn.style}}>{{btn.text}}</i> <a ng-if=\"btn.type != 'btn'\" class={{btn.style}}>{{btn.text}}</a></span></div></section>"
  );


  $templateCache.put('src/components/ep.record.editor/ep-record-editor.html',
    "<div class=\"row ep-record-editor\"><ep-editor-control ng-repeat=\"(key, ctrl) in state.controls | epOrderObjectBy:'seq'\" class=ep-record-editor-column column=ctrl.col value=state.activeRecord[ctrl.columnIndex] options=ctrl.options is-drag-enabled=state.dragEnabled is-drop-enabled=state.dropEnabled></ep-editor-control></div>"
  );

}]);
