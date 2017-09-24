/*
 * emf (Epicor Mobile Framework) 
 * version:1.0.14-dev.200 built: 24-09-2017
*/

if (typeof __ep_build_info === "undefined") {var __ep_build_info = {};}
__ep_build_info["customization"] = {"libName":"customization","version":"1.0.14-dev.200","built":"2017-09-24"};

'use strict';
/**
 * @ngdoc overview
 * @name ep.customization
 * @description
 * ep customization
 */
angular.module('ep.customization', [
    'ep.templates',
    'ep.sysconfig',
    'ep.local.storage',
    'ep.binding'
]);


(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.customization.directive:epCustomization
    * @restrict E
    *
    * @description
    * Represents the ep.customization directive
    *
    * @example
    */
    epCustomizableDirective.$inject = ['$log', '$timeout', '$compile', '$location', 'epCustomizationService'];
    angular.module('ep.customization').directive('epCustomizable', epCustomizableDirective);

    /*@ngInject*/
    function epCustomizableDirective($log, $timeout, $compile, $location, epCustomizationService) {
        return {
            restrict: 'A',
            scope: {
                epCustomData: '='
            },
            link: function(scope, element, attrs) {

                scope.state = {
                    scope: scope,
                    id: attrs.id,
                    element: element
                };

                //epCustomizationInfo must be declared on scope for customization engine
                scope.epCustomizationInfo = {
                    kind: 'ep-customizable-freeform',
                    element: scope.state.element,
                    id: scope.state.id,
                    scope: scope,
                    parentScope: scope.$parent,
                    url: $location.url(),
                    data: scope.epCustomData,
                    index: scope.$parent.$index,
                    isCustomizeActive: false,
                    api: {
                        onCustomizeActivate: function(on) {
                            scope.epCustomizationInfo.isCustomizeActive = (on === true);
                            scope.activeClass = scope.epCustomizationInfo.isCustomizeActive ?
                                'ep-customize-active' : '';
                            $(scope.state.element).removeClass('ep-customize-active').addClass(scope.activeClass);
                        }
                    }
                };

                var cProps = epCustomizationService.getCustomization(scope.state.id);
                if (cProps) {
                    var el = angular.element(scope.state.element);
                    var eContainer = angular.element('<ep-customization-container ep-customization-info=' +
                        '"epCustomizationInfo"></ep-customization-container>');
                    angular.element(el).append($compile(eContainer)(scope));
                }
            }
        };
    }
}());


(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.customization.directive:epCustomization
    * @restrict E
    *
    * @description
    * Represents the ep.customization directive
    *
    * @example
    */
    epCustomizationContainerDirective.$inject = ['$log', '$timeout', 'epCustomizationService'];
    angular.module('ep.customization').directive('epCustomizationContainer', epCustomizationContainerDirective);

    /*@ngInject*/
    function epCustomizationContainerDirective($log, $timeout, epCustomizationService) {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'src/components/ep.customization/ep-customization-container.html',
            scope: {
                epCustomizationInfo: '='
            },
            link: function(scope, element) {
                scope.state = {
                    element: element,
                    style: '',
                    controls: []
                };

                var cProps = epCustomizationService.getCustomization(scope.epCustomizationInfo.id);
                if (cProps) {

                    if (cProps.$container) {
                        scope.state.style = cProps.$container.style;
                        if (scope.state.style) {
                            try {
                                scope.$eval('scope.state.style = ' + scope.state.style);
                            } catch (err) {
                                $log.error('error during execution of customization style for ' +
                                    scope.epCustomizationInfo.id);
                            }
                        }

                        scope.state.script = cProps.$container.script;

                        if (scope.state.script) {
                            var fn;
                            try {
                                fn = new Function(scope.state.script); // jshint ignore:line
                                fn();
                            } catch (err) {
                                $log.error('error during execution of customization script for ' +
                                    scope.epCustomizationInfo.id + '\nerror:' + err.message);
                            }
                        }
                    }
                    var iSeqMax = 0;
                    angular.forEach(cProps, function(v, n) {
                        if (n && n !== '$container') {
                            var control = {
                                id: 'ep-custom_' + v.id,
                                props: v
                            };
                            if (v.controlKind === 'html') {
                                control.type = 'html';
                                control.class = 'col-xs-12 col-sm-8 col-md-6 col-lg-3';
                            } else if (v.controlKind === 'editor') {
                                if (v.binding) {
                                    if (v.binding.indexOf('$custom-data.') !== 0) {
                                        control.type = 'binding-editor';
                                        control.binding = v.binding;
                                    } else if (scope.epCustomizationInfo.data) {
                                        control.type = 'editor-control';
                                        control.binding = v.binding.replace('$custom-data.',
                                            'epCustomizationInfo.data.');
                                        control.columnName = v.binding.replace('$custom-data.', '');

                                        var col = v.binding.replace('$custom-data.', '');
                                        control.data = scope.epCustomizationInfo.data[col];
                                    }
                                }
                            }
                            if (control.type) {
                                if (v.seq !== undefined) {
                                    control.seq = v.seq;
                                } else {
                                    control.seq = iSeqMax + 1;
                                }
                                if (control.seq > iSeqMax) {
                                    iSeqMax = control.seq;
                                }
                                control.props.sizeClassTarget = '.ep-custom-element';
                                scope.state.controls.push(control);
                            }
                        }
                    });

                    scope.orderByControls = function(ctrl) {
                        return ctrl.seq;
                    };

                    scope.handleDrop1 = function(drop, element) {
                        if (drop && drop.dragItem && element) {
                            var ctrlDragged = drop.dragItem;
                            var dropAreaId = $(element).attr('id');
                            var ctrlDrop = _.find(scope.state.controls, function(c) {
                                return c.id === dropAreaId;
                            });
                            if (ctrlDrop) {
                                if (ctrlDragged.seq >= ctrlDrop.seq) {
                                    ctrlDragged.seq = ctrlDrop.seq;
                                    angular.forEach(scope.state.controls, function(c) {
                                        if (c.seq > ctrlDrop.seq) {
                                            c.seq++;
                                        }
                                    });
                                    ctrlDrop.seq++;
                                } else {
                                    angular.forEach(scope.state.controls, function(c) {
                                        if (c.seq < ctrlDrop.seq) {
                                            c.seq--;
                                        }
                                    });
                                    ctrlDragged.seq = ctrlDrop.seq - 1;
                                }
                                angular.forEach(scope.state.controls, function(c) {
                                    c.props.seq = c.seq;
                                });
                            }
                        }
                        scope.$apply();
                    };
                }
            }
        };
    }
}());

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.customization.directive:epCustomization
    * @restrict E
    *
    * @description
    * Represents the ep.customization directive
    *
    * @example
    */
    epCustomizationEptable.$inject = ['$compile', '$location', '$timeout', 'epBindingService', 'epCustomizationService'];
    angular.module('ep.customization').directive('epCustomizationEptable', epCustomizationEptable);

    /*@ngInject*/
    function epCustomizationEptable($compile, $location, $timeout, epBindingService, epCustomizationService) {
        return {
            replace: false,
            restrict: 'E',
            scope: {
                customizationData: '='
            },
            templateUrl: 'src/components/ep.customization/ep-customization-eptable.html',
            link: function(scope) {
                scope.changes = {};
                var columns = [];
                var record;

                scope.customization = null;
                scope.column = {};

                ////function getFactory() {
                ////    return scope.customization.ctrl.factory;
                ////}
                ////function getOptions() {
                ////    return scope.customization.ctrl.factory.getOptions();
                ////}

                function onCustomizationChange() {
                    if (scope.customization) {
                        scope.customization.api.onCustomizeActivate(false);
                    }

                    record = undefined;
                    scope.customization = null;
                    scope.column = {};
                    scope.loadingColumns = true;
                    $timeout(function() {
                        columns = [];
                        scope.customization = scope.customizationData.customization;
                        if (scope.customization.ctrl.epBinding) {
                            var view = epBindingService.getView(scope.customization.ctrl.epBinding);
                            if (view.api().hasData()) {
                                record = view.api().dataRow();
                                angular.forEach(record, function(v, n) {
                                    columns.push({
                                        label: n,
                                        value: n
                                    });
                                });
                            }
                        }

                        scope.changes = epCustomizationService.getCustomization(scope.customization.id) || {};

                        scope.columnList = {
                            caption: 'Columns',
                            name: 'Columns',
                            editor: 'select',
                            updatable: true,
                            list: columns,
                            sizeClass: 'col-lg-12',
                            fnOnChange: function(ev, ctx) {
                                scope.column.name = ctx.fnGetCurrentValue();

                                scope.curColCtx = _.find(scope.customization.ctrl.columns, function(c) {
                                    return c.name === scope.column.name;
                                });
                                if (scope.curColCtx) {
                                    scope.curColProps = {
                                        hidden: scope.curColCtx.hidden === true,
                                        caption: scope.curColCtx.caption,
                                        readonly: false
                                    };
                                } else {
                                    scope.curColProps = {
                                        hidden: false,
                                        caption: scope.column.name,
                                        readonly: false
                                    };
                                }
                            }
                        };

                        resetColumnProps();

                        scope.customization.api.onCustomizeActivate(true);

                        scope.loadingColumns = false;
                    }, 200);
                }

                function resetColumnProps() {
                    scope.curColProps = {
                        hidden: false,
                        caption: '',
                        readonly: false,
                        binding: ''
                    };
                }

                function setChangedProp(propName, propValue) {
                    if (!scope.changes[scope.column.name]) {
                        scope.changes[scope.column.name] = {};
                    }
                    scope.changes[scope.column.name][propName] = propValue;
                }

                resetColumnProps();
                scope.curColCtx = {};

                scope.colCaption = {
                    caption: 'Caption',
                    editor: 'text',
                    updatable: true,
                    sizeClass: 'col-lg-12',

                    fnOnChange: function(ev, ctx) {
                        if (scope.curColCtx) {
                            scope.curColCtx.caption = ctx.fnGetCurrentValue();
                            setChangedProp('caption', scope.curColCtx.caption);
                            scope.customization.api.onChange('captions');
                        }
                    }
                };

                scope.colHidden = {
                    caption: 'Hidden',
                    editor: 'checkbox',
                    updatable: true,
                    sizeClass: 'col-lg-12',

                    fnOnChange: function(ev, ctx) {
                        if (scope.curColCtx) {
                            scope.curColCtx.hidden = ctx.fnGetCurrentValue();
                            setChangedProp('hidden', scope.curColCtx.hidden === true);
                            scope.customization.api.onChange('hidden');
                        }
                    }

                };

                scope.colReadOnly = {
                    caption: 'Read-only',
                    editor: 'checkbox',
                    updatable: true,
                    sizeClass: 'col-lg-12',

                    fnOnChange: function(ev, ctx) {
                        if (scope.curColCtx) {
                            scope.curColCtx.readonly = ctx.fnGetCurrentValue();
                            setChangedProp('updatable', scope.curColCtx.readonly !== true);
                        }
                    }
                };

                scope.addColumn = function() {
                    var sName = scope.column.name;
                    var newColumn = {
                        name: sName,
                        caption: sName,
                        columnIndex: sName,
                        isCustom: true
                    };
                    scope.changes[sName] = newColumn;
                    scope.customization.api.onColumnAdd(newColumn);
                };

                scope.removeColumn = function() {
                    scope.customization.api.onColumnRemove(scope.curColCtx);
                    delete scope.changes[scope.column.name];
                    scope.curColCtx = null;
                };

                scope.$watch('customizationData', function(newValue) {
                    if (newValue !== undefined) {
                        onCustomizationChange();
                        scope.customizationData.fnGetChanges = function() {
                            return scope.changes;
                        };
                    }
                });
            }
        };
    }
}());

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.customization.directive:epCustomization
    * @restrict E
    *
    * @description
    * Represents the ep.customization directive
    *
    * @example
    */
    epCustomizationFreeformDirective.$inject = ['$templateCache', '$timeout', 'epModalDialogService', 'epCustomizationService', 'epBindingService', 'epUtilsService'];
    angular.module('ep.customization')
        .directive('epCustomizationFreeform', epCustomizationFreeformDirective);

    /*@ngInject*/
    function epCustomizationFreeformDirective($templateCache, $timeout,
        epModalDialogService, epCustomizationService, epBindingService, epUtilsService) {
        return {
            replace: false,
            restrict: 'E',
            scope: {
                customizationData: '='
            },
            templateUrl: 'src/components/ep.customization/ep-customization-freeform.html',
            link: function(scope) {
                scope.changes = {};
                scope.customization = null;

                scope.state = {
                    ctrlNumber: 1,
                    controls: [],
                    control: undefined,
                    controlKind: 'editor'
                };

                function onCustomizationChange() {
                    if (scope.customization) {
                        scope.customization.api.onCustomizeActivate(false);
                    }
                    scope.customization = null;
                    $timeout(function() {
                        scope.customization = scope.customizationData.customization;
                        resetColumnProps();
                        scope.customization.api.onCustomizeActivate(true);

                        if (scope.customization.data) {
                            epBindingService.addView('$custom-data', [scope.customization.data]);
                        }

                        scope.changes = epCustomizationService.getCustomization(scope.customization.id) || {};

                        var ctrls = [
                            {
                                label: '<New Control>',
                                value: '$new'
                            },
                            {
                                label: '<Container>',
                                value: '$container'
                            },
                        ];
                        if (scope.changes) {
                            angular.forEach(scope.changes, function(v, n) {
                                if (n && n !== '$container') {
                                    var desc = v.caption || v.binding || '';
                                    if (desc) {
                                        desc = ' (' + desc + ')';
                                    } else if (v.controlKind === 'html') {
                                        desc = ' (html)';
                                    }
                                    ctrls.push({
                                        label: n + desc,
                                        value: n
                                    });
                                }
                            });
                        }
                        scope.state.controls = ctrls;
                        scope.controlsList.list = ctrls;
                        scope.state.control = '$new';
                        scope.curColProps.id = getNextCtrlId();

                    }, 200);
                }

                function resetColumnProps() {
                    scope.curColProps = {
                        id: '',
                        hidden: false,
                        caption: '',
                        updatable: false,
                        binding: '',
                        style: '',
                        validate: '',
                        html: '',
                        script: ''
                    };
                }

                function setProp(propName, propValue, id) {
                    scope.curColProps[propName] = propValue;
                    setChangedProp(propName, propValue, id);
                }

                function setChangedProp(propName, propValue, id) {
                    id = id || scope.curColProps.id;
                    if (!scope.changes[id]) {
                        scope.changes[id] = {};
                    }
                    scope.changes[id][propName] = propValue;
                }

                function getNextCtrlId() {
                    return _.uniqueId('Ctrl-');
                }

                function showEditor(propName, fnSave) {

                    var sampleColumn = {};
                    if (propName === 'html') {
                        sampleColumn = {
                            caption: 'Template Samples',
                            name: 'Sample',
                            editor: 'select',
                            updatable: true,
                            list: [
                                { label: 'None', value: 'none' },
                                { label: 'Panel', value: 'sample-panel.html' },
                                { label: 'Color Tile', value: 'sample-color-tile.html' },
                                { label: 'Button', value: 'sample-button.html' },
                            ],
                            sizeClass: 'col-lg-12',
                            fnOnChange: function(ev, ctx) {
                                var sampleId = ctx.fnGetCurrentValue();
                                var txt = '';
                                if (sampleId === 'none') {
                                    txt = '';
                                } else {
                                    txt = $templateCache.get(sampleId);
                                }
                                config.editText = txt;
                            }
                        };
                    }

                    var config = {
                        title: 'Editor',
                        size: 'fullscreen',
                        closeButton: true,
                        editorOptions: {
                            type: propName,
                            sampleCol: sampleColumn,
                            sampleVal: 'none'
                        },
                        editText: scope.curColProps[propName],
                        templateOptions: {
                            templateUrl: 'src/components/ep.customization/ep-customization-editor-box.html'
                        },
                        buttons: [{
                            id: 'okButton', type: 'default', text: 'Ok', action: function(cfg) {
                                if (fnSave) {
                                    fnSave(cfg.editText);
                                } else {
                                    setProp(propName, cfg.editText);
                                }
                            }
                        }]
                    };

                    epModalDialogService.showCustomDialog(config);
                }

                scope.controlsList = {
                    caption: 'Select Control',
                    name: 'Controls',
                    editor: 'select',
                    updatable: true,
                    list: scope.state.controls,
                    sizeClass: 'col-lg-12',
                    fnOnChange: function(ev, ctx) {
                        scope.state.control = ctx.fnGetCurrentValue();
                        resetColumnProps();
                        if (scope.state.control === '$new') {
                            scope.curColProps.id = getNextCtrlId();
                        } else {
                            epUtilsService.copyProperties(scope.changes[scope.state.control], scope.curColProps);
                            scope.state.controlKind = scope.curColProps.controlKind;
                            var id = '#ep-custom_' + scope.state.control;
                            $('.ep-custom-element').removeClass('ep-customize-control-active');
                            if ($(id).length) {
                                var el = $(id);
                                el.addClass('ep-customize-control-active');
                            }
                        }
                    }
                };

                var controlKinds = [
                    { label: 'Editor', value: 'editor' },
                    { label: 'HTML Template', value: 'html' },
                ];

                scope.controlKinds = {
                    caption: 'Kind of Control',
                    name: 'ControlKind',
                    editor: 'select',
                    updatable: true,
                    list: controlKinds,
                    sizeClass: 'col-lg-12',
                    fnOnChange: function(ev, ctx) {
                        scope.state.controlKind = ctx.fnGetCurrentValue();
                    }
                };

                resetColumnProps();
                scope.curColProps.id = getNextCtrlId();

                scope.colBinding = {
                    caption: 'ep-binding',
                    editor: 'text',
                    updatable: true,
                    sizeClass: 'col-lg-12',
                    buttons: [{
                        position: 'post',
                        type: 'btn',
                        style: 'fa fa-cog',
                        action: function() {
                            epBindingService.selectBinding(function(binding) {
                                setProp('binding', binding);
                            });
                        }
                    }],

                    fnOnChange: function(ev, ctx) {
                        setProp('binding', ctx.fnGetCurrentValue());
                    }
                };

                scope.colCaption = {
                    caption: 'Caption',
                    editor: 'text',
                    updatable: true,
                    sizeClass: 'col-lg-12',

                    fnOnChange: function(ev, ctx) {
                        setProp('caption', ctx.fnGetCurrentValue());
                    }

                };

                scope.colHidden = {
                    caption: 'Hidden',
                    editor: 'checkbox',
                    updatable: true,
                    sizeClass: 'col-lg-12',

                    fnOnChange: function(ev, ctx) {
                        setProp('hidden', ctx.fnGetCurrentValue() === true);
                    }
                };

                scope.colReadOnly = {
                    caption: 'Updatable',
                    editor: 'checkbox',
                    updatable: true,
                    sizeClass: 'col-lg-12',

                    fnOnChange: function(ev, ctx) {
                        setProp('updatable', ctx.fnGetCurrentValue() === true);
                    }
                };

                scope.colStyle = {
                    caption: 'Style',
                    editor: 'text',
                    updatable: true,
                    sizeClass: 'col-lg-12',
                    oFormat: { MaxLength: 20000 },

                    buttons: [{
                        position: 'post',
                        type: 'btn',
                        style: 'fa fa-edit',
                        action: function() {
                            showEditor('style', function(val) {
                                var id = (scope.state.control === '$container') ? '$container' : undefined;
                                setProp('style', val, id);
                            });
                        }
                    }],

                    fnOnChange: function(ev, ctx) {
                        var id = (scope.state.control === '$container') ? '$container' : undefined;
                        setProp('style', ctx.fnGetCurrentValue(), id);
                    }

                };

                scope.colValidate = {
                    caption: 'Validation',
                    editor: 'text',
                    updatable: true,
                    sizeClass: 'col-lg-12',
                    oFormat: { MaxLength: 10000 },
                    buttons: [{
                        position: 'post',
                        type: 'btn',
                        style: 'fa fa-edit',
                        action: function() {
                            showEditor('validation');
                        }
                    }],
                    fnOnChange: function(ev, ctx) {
                        setProp('validation', ctx.fnGetCurrentValue());
                    }

                };

                scope.colId = {
                    caption: 'ID',
                    editor: 'text',
                    updatable: false,
                    sizeClass: 'col-lg-12',
                    fnOnChange: function(ev, ctx) {
                        scope.curColProps.id = ctx.fnGetCurrentValue();
                    }
                };

                scope.colHTML = {
                    caption: 'HTML Template',
                    editor: 'text',
                    updatable: true,
                    sizeClass: 'col-lg-12',
                    oFormat: { MaxLength: 10000 },
                    buttons: [{
                        position: 'post',
                        type: 'btn',
                        style: 'fa fa-edit',
                        action: function() {
                            showEditor('html');
                        }
                    }],
                    fnOnChange: function(ev, ctx) {
                        setProp('html', ctx.fnGetCurrentValue());
                    }
                };

                scope.colContainerScript = {
                    caption: 'Container Script',
                    editor: 'text',
                    updatable: true,
                    sizeClass: 'col-lg-12',
                    oFormat: { MaxLength: 20000 },

                    buttons: [{
                        position: 'post',
                        type: 'btn',
                        style: 'fa fa-edit',
                        action: function() {
                            showEditor('script', function(val) {
                                setProp('script', val, '$container');
                            });
                        }
                    }],

                    fnOnChange: function(ev, ctx) {
                        setProp('script', ctx.fnGetCurrentValue(), '$container');
                    }

                };

                scope.addColumn = function() {
                    if (!scope.curColProps.id) {
                        epModalDialogService.showMessage({
                            title: 'Missing Id', message: 'Id is required for control'
                        });
                        return;
                    }

                    if (scope.changes[scope.curColProps.id]) {
                        epModalDialogService.showMessage({
                            title: 'Duplicate Id',
                            message: 'There is already a control with id: ' + scope.curColProps.id
                        });
                        return;
                    }

                    var cols = angular.extend([], scope.controlsList.list);
                    cols.push({
                        label: scope.curColProps.id,
                        value: scope.curColProps.id
                    });
                    scope.controlsList.list = cols;
                    scope.state.control = scope.curColProps.id;

                    setChangedProp('controlKind', scope.state.controlKind);
                    setChangedProp('id', scope.curColProps.id);

                    //if (scope.state.controlKind === 'html') {
                    //    if (scope.changes[scope.curColCtx.binding]) {
                    //        epModalDialogService.showMessage({ title: 'Duplicate Id',
                    //message: 'There is already a html with id: ' + scope.curColCtx.binding });
                    //        return;
                    //    }

                    //    var cols = angular.extend([], scope.controlsList.list);
                    //    cols.push({
                    //        label: scope.curColCtx.binding,
                    //        value: scope.curColCtx.binding
                    //    });
                    //    scope.controlsList.list = cols;
                    //    scope.state.control = scope.curColCtx.binding;

                    //    setChangedProp('controlKind', scope.state.controlKind);
                    //    setChangedProp('binding', scope.curColCtx.binding);

                    //} else if (scope.curColCtx.binding && scope.curColCtx.binding.split('.').length === 2) {

                    //    if (scope.changes[scope.curColCtx.binding]) {
                    //        epModalDialogService.showMessage({ title: 'Duplicate column',
                    //message: 'There is already a column with binding: ' + scope.curColCtx.binding });
                    //        return;
                    //    }

                    //    var el = angular.element(scope.customization.ctrl.state.element);
                    //    var binding = '\'' + scope.curColCtx.binding + '\'';
                    //    var html = '<ep-binding-editor ep-binding="' + binding + '"></ep-binding-editor>';
                    //    el.append($compile(html)(scope.customization.ctrl.state.scope));

                    //    var cols = angular.extend([], scope.controlsList.list);
                    //    cols.push({
                    //        label: scope.curColCtx.binding,
                    //        value: scope.curColCtx.binding
                    //    });
                    //    scope.controlsList.list = cols;
                    //    scope.state.control = scope.curColCtx.binding;

                    //    setChangedProp('controlKind', scope.state.controlKind);
                    //    setChangedProp('binding', scope.curColCtx.binding);
                    //} else {
                    //    epModalDialogService.showMessage({ title:'Invalid binding!',
                    //message: 'ep-binding must be in the format [view.column]'});
                    //}
                };

                scope.removeColumn = function() {
                    if (scope.changes[scope.curColProps.id]) {
                        delete scope.changes[scope.curColProps.id];
                    }

                    var cols = angular.extend([], scope.controlsList.list);
                    var col = _.find(cols, function(c) {
                        return c.value === scope.curColProps.id;
                    });
                    if (col) {
                        var controlsList = _.without(cols, col);
                        scope.controlsList.list = controlsList;
                        scope.state.control = '$new';
                        scope.curColProps.id = getNextCtrlId();
                    }
                };

                scope.$watch('customizationData', function(newValue) {
                    if (newValue !== undefined) {
                        onCustomizationChange();
                        scope.customizationData.fnGetChanges = function() {
                            return scope.changes;
                        };
                    }
                });
            }
        };
    }
}());

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.customization.directive:epCustomization
    * @restrict E
    *
    * @description
    * Represents the ep.customization directive
    *
    * @example
    */
    epCustomizationRecordEditorDirective.$inject = ['$timeout', 'epCustomizationService', 'epTransactionFactory'];
    angular.module('ep.customization')
        .directive('epCustomizationRecordEditor', epCustomizationRecordEditorDirective);

    /*@ngInject*/
    function epCustomizationRecordEditorDirective($timeout, epCustomizationService, epTransactionFactory) {
        return {
            replace: false,
            restrict: 'E',
            scope: {
                customizationData: '='
            },
            templateUrl: 'src/components/ep.customization/ep-customization-record-editor.html',
            link: function(scope) {
                scope.changes = {};
                var columns = [];
                var record;

                scope.customization = null;
                scope.column = {};

                function getFactory() {
                    return scope.customization.ctrl.factory;
                }
                function getOptions() {
                    return scope.customization.ctrl.factory.getOptions();
                }

                function onCustomizationChange() {
                    if (scope.customization) {
                        scope.customization.api.onCustomizeActivate(false);
                    }

                    record = undefined;
                    scope.customization = null;
                    scope.column = {};
                    $timeout(function() {
                        columns = [];
                        scope.customization = scope.customizationData.customization;
                        if (scope.customization.ctrl.epBinding) {
                            var view = epTransactionFactory.current().view(scope.customization.ctrl.epBinding);
                            if (view && view.hasData()) {
                                record = view.dataRow();
                                angular.forEach(record, function(v, n) {
                                    columns.push({
                                        label: n,
                                        value: n
                                    });
                                });
                            }
                        }

                        scope.changes = epCustomizationService.getCustomization(scope.customization.id) || {};

                        scope.columnList = {
                            caption: 'Columns',
                            name: 'Columns',
                            editor: 'select',
                            updatable: true,
                            list: columns,
                            sizeClass: 'col-lg-12',
                            fnOnChange: function(ev, ctx) {
                                scope.column.name = ctx.fnGetCurrentValue();
                                var factory = getFactory();
                                scope.curColCtx = factory.getColumnContext(scope.column.name);
                                if (scope.curColCtx) {
                                    scope.curColProps = {
                                        hidden: (scope.curColCtx.hidden === true),
                                        caption: scope.curColCtx.label,
                                        readonly: (scope.curColCtx.updatable === false),
                                        style: scope.curColCtx.style ?
                                            JSON.stringify(scope.curColCtx.style, null, ' ') : '',
                                        validate: scope.changes[scope.column.name] ?
                                            scope.changes[scope.column.name].validation : ''
                                    };
                                } else {
                                    scope.curColProps = {
                                        hidden: false,
                                        caption: '',
                                        readonly: false
                                    };
                                }
                            }
                        };

                        resetColumnProps();

                        scope.customization.api.onCustomizeActivate(true);

                    }, 200);
                }

                function resetColumnProps() {
                    scope.curColProps = {
                        hidden: false,
                        caption: '',
                        readonly: false,
                        binding: '',
                        style: '',
                        validate: ''
                    };

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

                function setChangedProp(propName, propValue, colName) {
                    var cname = colName || scope.column.name;
                    if (!scope.changes[cname]) {
                        scope.changes[cname] = {};
                    }
                    scope.changes[cname][propName] = propValue;
                }

                resetColumnProps();
                scope.curColCtx = {};

                scope.colCaption = {
                    caption: 'Caption',
                    editor: 'text',
                    updatable: true,
                    sizeClass: 'col-lg-12',

                    fnOnChange: function(ev, ctx) {
                        if (scope.curColCtx) {
                            scope.curColCtx.label = ctx.fnGetCurrentValue();
                            setChangedProp('caption', scope.curColCtx.label);
                        }
                    }

                };

                scope.colHidden = {
                    caption: 'Hidden',
                    editor: 'checkbox',
                    updatable: true,
                    sizeClass: 'col-lg-12',

                    fnOnChange: function(ev, ctx) {
                        if (scope.curColCtx) {
                            scope.curColCtx.hidden = ctx.fnGetCurrentValue();
                            setChangedProp('hidden', scope.curColCtx.hidden === true);
                        }
                    }

                };

                scope.colReadOnly = {
                    caption: 'Read-only',
                    editor: 'checkbox',
                    updatable: true,
                    sizeClass: 'col-lg-12',

                    fnOnChange: function(ev, ctx) {
                        if (scope.curColCtx) {
                            scope.curColCtx.readonly = ctx.fnGetCurrentValue();
                            setChangedProp('updatable', scope.curColCtx.readonly !== true);
                        }
                    }
                };

                scope.colStyle = {
                    caption: 'Style',
                    editor: 'multiline',
                    updatable: true,
                    sizeClass: 'col-lg-12',
                    oFormat: { MaxLength: 200 },
                    fnOnChange: function(ev, ctx) {
                        if (scope.curColCtx) {
                            scope.curColCtx.style = ctx.fnGetCurrentValue();
                            setChangedProp('style', scope.curColCtx.style);
                        }
                    }

                };

                scope.colValidate = {
                    caption: 'Validation',
                    editor: 'multiline',
                    updatable: true,
                    sizeClass: 'col-lg-12',
                    oFormat: { MaxLength: 200 },
                    fnOnChange: function(ev, ctx) {
                        if (scope.curColCtx) {
                            scope.curColCtx.validate = ctx.fnGetCurrentValue();
                            setChangedProp('validation', scope.curColCtx.validate);
                        }
                    }

                };

                scope.addColumn = function() {
                    var sName = scope.column.name;
                    var factory = getFactory();
                    var options = getOptions();
                    var cols = options.columns;
                    //cols = factory.getColumns();

                    var editor = getEditorByValue(record[sName]);

                    var newColumn = {
                        caption: sName,
                        editor: editor,
                        columnIndex: sName,
                        updatable: true,
                        isCustom: true
                    };

                    cols.push(newColumn);

                    factory.draw();
                    scope.column.name = '';
                    $timeout(function() {
                        scope.column.name = sName;
                        scope.curColCtx = factory.getColumnContext(scope.column.name);
                    }, 200);

                    scope.changes[sName] = newColumn;
                };

                scope.removeColumn = function() {
                    var factory = getFactory();
                    var options = getOptions();
                    var cols = options.columns;
                    var col = _.find(cols, function(c) {
                        return c.columnIndex === scope.column.name;
                    });
                    if (col) {
                        options.columns = _.without(cols, col);
                        factory.draw();
                        scope.column.name = '';
                        scope.curColCtx = null;
                        resetColumnProps();
                    }
                };

                scope.$watch('customizationData', function(newValue) {
                    if (newValue !== undefined) {
                        onCustomizationChange();
                        scope.customizationData.fnGetChanges = function() {
                            var factory = getFactory();
                            var controls = factory.getState().controls;
                            angular.forEach(controls, function(ctrl) {
                                if (ctrl.origSeq !== undefined) {
                                    setChangedProp('seq', ctrl.seq, ctrl.columnIndex);
                                }
                            });

                            return scope.changes;
                        };
                    }
                });
            }
        };
    }
}());

(function() {
    'use strict';
    /**
    * @ngdoc directive
    * @name ep.customization.directive:epCustomization
    * @restrict E
    *
    * @description
    * Represents the ep.customization directive
    *
    * @example
    */
    epCustomizationDirective.$inject = ['$rootScope', '$route', '$timeout', 'epCustomizationService', 'epModalDialogService'];
    epCustomManageCtrl.$inject = ['$route', '$scope', '$timeout', 'epCustomizationService'];
    angular.module('ep.customization').directive('epCustom', epCustomizationDirective);

    /*@ngInject*/
    function epCustomizationDirective($rootScope, $route, $timeout, epCustomizationService, epModalDialogService) {
        return {
            replace: false,
            restrict: 'E',
            scope: {
            },
            templateUrl: 'src/components/ep.customization/ep-customization.html',
            link: function(scope) {
                var customizationScopes = {};

                function getScopes(root) {
                    var scopes = {};

                    function visit(scope) {
                        if (scope.epCustomizationInfo && scope.epCustomizationInfo.kind &&
                            scope.epCustomizationInfo.id) {
                            scopes[scope.epCustomizationInfo.id] = scope.epCustomizationInfo;
                        }
                    }

                    function traverse(scope) {
                        visit(scope);
                        if (scope.$$nextSibling) {
                            traverse(scope.$$nextSibling);
                        }
                        if (scope.$$childHead) {
                            traverse(scope.$$childHead);
                        }
                    }

                    traverse(root);
                    return scopes;
                }

                scope.btnClickManage = function() {
                    var config = {
                        title: 'Editor',
                        size: 'fullscreen',
                        closeButton: true,
                        manage: {
                        },
                        editText: '',
                        templateOptions: { templateUrl: 'components/ep.customization/ep-customization-manage.html' },
                        buttons: [
                            {
                                id: 'cancelButton', type: 'cancel', isCance: true, text: 'Close',
                                action: function() {
                                }
                            },
                            {
                                id: 'okButton', type: 'default', isDefault: true, text: 'Ok',
                                action: function() {
                                    $route.reload();
                                }
                            }
                       ]
                    };

                    epModalDialogService.showCustomDialog(config);
                };

                scope.btnClickSave = function() {
                    if (scope.customization && scope.customizationData.fnGetChanges) {
                        var changes = scope.customizationData.fnGetChanges();
                        epCustomizationService.saveCustomForView(scope.customization.id, changes);
                        $route.reload();
                    }
                };

                scope.btnClickClearCustomization = function() {
                    if (scope.customization) {
                        epCustomizationService.clearCustomForView(scope.customization.id);
                        $route.reload();
                    }
                };

                function onCustomizationChange(id) {
                    if (scope.customization) {
                        scope.customization.api.onCustomizeActivate(false);
                    }
                    scope.customization = null;
                    $timeout(function() {
                        scope.customization = customizationScopes[id];

                        scope.customizationData = {
                            customization: scope.customization,
                            customizationId: id,
                            customizationKind: (scope.customization) ? scope.customization.kind : ''
                        };

                        if (scope.customization) {
                            scope.customization.api.onCustomizeActivate(true);
                        }
                    }, 200);
                }

                function init() {
                    scope.customizationData = {
                        customizationId: '',
                        customizationKind: ''
                    };
                    scope.customization = null;

                    var list = [];
                    customizationScopes = getScopes($rootScope);
                    angular.forEach(customizationScopes, function(v, k) {
                        list.push({
                            label: k,
                            value: k
                        });
                    });

                    scope.customizationsList = {
                        caption: 'Customizable Objects',
                        name: 'Customs',
                        editor: 'select',
                        updatable: true,
                        list: list,
                        sizeClass: 'col-lg-12',
                        buttons: [{
                            position: 'post',
                            type: 'btn',
                            style: 'fa fa-refresh',
                            action: function() {
                                init();
                            }
                        }],
                        fnOnChange: function(ev, ctx) {
                            onCustomizationChange(ctx.fnGetCurrentValue());
                        }
                    };

                }

                $timeout(function() {
                    scope.$digest();
                    init();
                }, 1000);
            }
        };
    }

    angular.module('ep.customization')
    .controller('epCustomManageCtrl', epCustomManageCtrl);

    /*@ngInject*/
    function epCustomManageCtrl($route, $scope, $timeout, epCustomizationService) {

        document.getElementById('file').addEventListener('change', onChange);

        function onChange(event) {
            var reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsText(event.target.files[0]);
        }

        function onReaderLoad(event) {
            var obj = JSON.parse(event.target.result);
            if (obj) {
                epCustomizationService.importCustomization(obj);
                alert('customization was imported!');
            }
        }

        $scope.btnClickClearAllCustomizations = function() {
            epCustomizationService.clearAllCustomizations();
        };

        $scope.btnClickExport = function() {
            var customizations = epCustomizationService.getAllCustomizations();
            if (!customizations) {
                alert('There are no customizations to save');
                return;
            }
            var toJson = angular.toJson(customizations);
            var blob = new Blob([toJson], { type: 'application/json;charset=utf-8;' });
            var href = window.URL.createObjectURL(blob);

            var downloadLink = angular.element('<a></a>');
            downloadLink.attr('href', href);
            downloadLink.attr('download', 'customization.json');
            downloadLink[0].click();
        };

    }

}());

(function() {
'use strict';
/**
 * @ngdoc service
 * @name ep.customization.service:epCustomizationService
 * @description
 * Service for the ep.customization module
 * ep customization
 *
 * @example
 *
 */
    epCustomizationService.$inject = ['$location', 'epLocalStorageService'];
    angular.module('ep.customization').
    service('epCustomizationService', epCustomizationService);

    /*@ngInject*/
    function epCustomizationService($location, epLocalStorageService) {

        function importCustomization(customization) {
            var key = 'ep-customization';
            epLocalStorageService.update(key, customization);
        }

        function saveCustomForView(id, props, view) {
            var v = resolveView(view);
            var key = 'ep-customization.' + v + '.' + id;
            epLocalStorageService.update(key, props);
        }

        function clearCustomForView(id, view) {
            var v = resolveView(view);
            var key = 'ep-customization.' + v + '.' + id;
            epLocalStorageService.update(key, undefined);
        }

        function clearAllCustomizations() {
            var key = 'ep-customization';
            epLocalStorageService.update(key, undefined);
        }

        function getCustomization(id, view) {
            var v = resolveView(view);
            var key = 'ep-customization.' + v + '.' + id;
            return epLocalStorageService.get(key);
        }

        function getAllCustomizations() {
            var key = 'ep-customization';
            return epLocalStorageService.get(key);
        }

        function resolveView(view) {
            var v = view;
            if (!v) {
                v = $location.url() || 'view';
            }
            var qIdx = v.indexOf('?');
            var ret = qIdx > 0 ? v.substring(0, qIdx) : v;
            return ret;
        }

        return {
            importCustomization: importCustomization,
            saveCustomForView: saveCustomForView,
            clearCustomForView: clearCustomForView,
            clearAllCustomizations: clearAllCustomizations,
            getCustomization: getCustomization,
            getAllCustomizations: getAllCustomizations
        };
    }
}());

//# sourceMappingURL=emf.customization.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.customization/ep-customization-container.html',
    "<div class=\"row ep-customization-container\" ng-style=state.style><div ng-repeat=\"control in state.controls | orderBy:orderByControls\" class=\"ep-custom-element {{control.class}}\" id={{control.id}} ep-drop-area drop-handler=handleDrop1 drop-item-types=ep-custom-element drop-enabled=epCustomizationInfo.isCustomizeActive ep-draggable drag-enabled=epCustomizationInfo.isCustomizeActive drag-item=control drag-item-type=\"'ep-custom-element'\"><ep-binding-editor ng-if=\"control.type === 'binding-editor'\" ep-binding=control.binding column=control.props></ep-binding-editor><ep-editor-control ng-if=\"control.type === 'editor-control'\" value=epCustomizationInfo.data[control.columnName] column=control.props></ep-editor-control><ep-include ng-if=\"control.type === 'html'\" user-data=epCustomizationInfo.data template-scope=epCustomizationInfo.parentScope template=control.props.html template-style=control.props.style></ep-include></div></div>"
  );


  $templateCache.put('src/components/ep.customization/ep-customization-editor-box.html',
    "<div ng-if=\"config.editorOptions.type === 'html'\"><script type=text/ng-template id=sample-panel.html><div class=\"well panel panel-default\">\r" +
    "\n" +
    "            <div class=\"panel-heading panel-heading-small\">\r" +
    "\n" +
    "                Your panel header goes here\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-body ep-padding-none\">\r" +
    "\n" +
    "                Your panel body goes here\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"panel-footer\">\r" +
    "\n" +
    "                Your panel footer goes here                \r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div></script><script type=text/ng-template id=sample-color-tile.html><div>\r" +
    "\n" +
    "            <ep-color-tile title=\"Customer Address\" description=\"{{CustomerAddress}}\" fineprint=\"\" icon=\"fa-refresh\" color=\"deepskyblue\"></ep-color-tile>\r" +
    "\n" +
    "        </div></script><script type=text/ng-template id=sample-button.html><div>\r" +
    "\n" +
    "            <button class=\"btn btn-default\" ng-click=\"someFunction()\">Your Button Text</button>\r" +
    "\n" +
    "        </div></script><ep-editor-control column=config.editorOptions.sampleCol value=config.editorOptions.sampleVal></ep-editor-control></div><textarea style=\"width:100%; height: 300px; border: solid; border-width: thin\" ng-model=config.editText autofocus></textarea>"
  );


  $templateCache.put('src/components/ep.customization/ep-customization-eptable.html',
    "<!--This is a partial for the ep-customization directive --><div class=\"ep-customization-record-editor ep-padding-top ep-padding-bottom\"><div class=text-center ng-show=loadingColumns><i class=\"fa fa-spinner fa-spin fa-2x\"></i></div><div class=text-center ng-hide=loadingColumns><ep-editor-control column=columnList value=column.name></ep-editor-control></div><ep-editor-control column=colCaption value=curColProps.caption></ep-editor-control><ep-editor-control column=colHidden value=curColProps.hidden></ep-editor-control><ep-editor-control column=colReadOnly value=curColProps.readonly></ep-editor-control><hr><button ng-hide=curColCtx type=button class=\"btn btn-primary btn-block ep-padding-top\" ng-click=addColumn()>Add Column</button> <button ng-show=\"curColCtx && curColCtx.isCustom\" type=button class=\"btn btn-primary btn-block ep-padding-top\" ng-click=removeColumn()>Remove Column</button></div>"
  );


  $templateCache.put('src/components/ep.customization/ep-customization-freeform.html',
    "<!--This is a partial for the ep-customization directive --><div class=ep-customization-freeform style=\"padding-bottom: 5px\"><ep-editor-control column=controlsList value=state.control></ep-editor-control><div ng-show=\"state.control === '$new'\"><ep-editor-control column=controlKinds value=state.controlKind></ep-editor-control><ep-editor-control column=colId value=curColProps.id></ep-editor-control></div><div ng-show=\"state.control === '$container'\"><ep-editor-control column=colStyle value=curColProps.style></ep-editor-control><ep-editor-control column=colContainerScript value=curColProps.script></ep-editor-control></div><div ng-show=\"state.controlKind == 'editor'\"><div ng-hide=\"state.control === '$new'\"><ep-editor-control column=colBinding value=curColProps.binding></ep-editor-control><ep-editor-control column=colCaption value=curColProps.caption></ep-editor-control><ep-editor-control column=colHidden value=curColProps.hidden></ep-editor-control><ep-editor-control column=colReadOnly value=curColProps.updatable></ep-editor-control><ep-editor-control column=colStyle value=curColProps.style></ep-editor-control><ep-editor-control column=colValidate value=curColProps.validate></ep-editor-control></div></div><div ng-show=\"state.controlKind == 'html'\"><div ng-hide=\"state.control === '$new'\"><ep-editor-control column=colHTML value=curColProps.html></ep-editor-control><ep-editor-control column=colStyle value=curColProps.style></ep-editor-control></div></div><button ng-show=\"state.control === '$new'\" class=\"btn btn-primary btn-block\" ng-click=addColumn() style=\"margin-right: 15px\"><i class=\"fa fa-plus\"></i> Add Control</button> <button ng-hide=\"state.control === '$new' || state.control === '$container' || !state.control\" class=\"btn btn-primary btn-block\" ng-click=removeColumn() style=\"margin-right: 15px\"><i class=\"fa fa-minus\"></i> Remove Control</button></div>"
  );


  $templateCache.put('src/components/ep.customization/ep-customization-manage.html',
    "<div class=\"well panel panel-default\" style=\"max-width: 300px\" ng-controller=epCustomManageCtrl><div class=\"panel-heading panel-heading-small\"><div class=ep-align-hcenter>Actions</div></div><div class=\"panel-body ep-padding-none\"><button type=button class=\"btn btn-primary btn-block ep-padding-top\" ng-click=btnClickClearAllCustomizations()>Clear All Customizations</button> <button type=button class=\"btn btn-primary btn-block ep-padding-top\" ng-click=btnClickExport()>Export</button> <button type=button class=\"btn btn-primary btn-block ep-padding-top\" ng-click=\"config.manage.showImport = !config.manage.showImport\">Import</button> <input ng-show=\"config.manage.showImport === true\" input id=file type=\"file\"></div></div>"
  );


  $templateCache.put('src/components/ep.customization/ep-customization-record-editor.html',
    "<!--This is a partial for the ep-customization directive --><div class=\"ep-customization-record-editor ep-padding-top ep-padding-bottom\"><ep-editor-control column=columnList value=column.name></ep-editor-control><div><a ng-hide=\"curColCtx || !column.name\" class=\"btn btn-primary pull-right\" ng-click=addColumn() style=\"margin-right: 15px\"><i class=\"fa fa-plus\"></i> Add Column</a> <a ng-show=\"curColCtx && curColCtx.col.isCustom\" class=\"btn btn-primary pull-right\" ng-click=removeColumn() style=\"margin-right: 15px\"><i class=\"fa fa-remove\"></i> Remove Column</a></div><div ng-show=\"curColCtx && column.name\"><ep-editor-control column=colCaption value=curColProps.caption></ep-editor-control><ep-editor-control column=colHidden value=curColProps.hidden></ep-editor-control><ep-editor-control column=colReadOnly value=curColProps.readonly></ep-editor-control><ep-editor-control column=colStyle value=curColProps.style></ep-editor-control><ep-editor-control column=colValidate value=curColProps.validate></ep-editor-control></div></div>"
  );


  $templateCache.put('src/components/ep.customization/ep-customization.html',
    "<!--This is a partial for the ep-customization directive --><div class=\"ep-customization container\" style=\"width:250px; padding: 2px\"><nav class=\"ep-main-navbar navbar-sm navbar-default navbar-fixed\"><ul class=\"nav navbar-nav align-right\" ng-controller1=NavCtrl><li><a class=\"ep-navbar-button fa fa-cog fa-2x\" ng-click=btnClickManage()></a></li><li><a class=\"ep-navbar-button fa fa-save fa-2x\" ng-click=btnClickSave()></a></li><li><a class=\"ep-navbar-button fa fa-times fa-2x\" ng-click=btnClickClearCustomization()></a></li></ul></nav><div class=\"well row\"><ep-editor-control column=customizationsList value=customListValue></ep-editor-control><div ng-if=\"customization && customization.kind === 'ep-record-editor'\"><ep-customization-record-editor customization-data=customizationData></ep-customization-record-editor></div><div ng-if=\"customization && customization.kind === 'ep-customizable-freeform'\"><ep-customization-freeform customization-data=customizationData></ep-customization-freeform></div><div ng-if=\"customization && customization.kind === 'ep-table'\"><ep-customization-eptable customization-data=customizationData></ep-customization-eptable></div><hr><!--<button ng-if=\"customization\" type=\"button\" class=\"btn btn-primary btn-block ep-padding-top\" ng-click=\"btnClickSave()\">Save</button>\r" +
    "\n" +
    "        <button ng-if=\"customization\" type=\"button\" class=\"btn btn-primary btn-block ep-padding-top\" ng-click=\"btnClickClearCustomization()\">Clear Customization</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-primary btn-block ep-padding-top\" ng-click=\"btnClickClearAllCustomizations()\">Clear All Customizations</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-primary btn-block ep-padding-top\" ng-click=\"btnClickExport()\">Export</button>\r" +
    "\n" +
    "        <button type=\"button\" class=\"btn btn-primary btn-block ep-padding-top\" ng-click=\"showImport = !showImport\">Import</button>\r" +
    "\n" +
    "        <input ng-show=\"showImport === true\" input id=\"file\" type=\"file\"  />--></div></div>"
  );

}]);
