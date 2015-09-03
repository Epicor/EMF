'use strict';
/**
 * @ngdoc overview
 * @name ep.action.set
 * @description
 * #ep.action.set
 * This is a complex component that provides action-menu/context-menu behavior.
 *
 * In order to make use of the action menu fuctionality, there needs to be one
 * instance of the `<ep-action-menu></ep-action-menu>` directive on the page.
 * This directive will render the menu; for desktop, it will provide regular popup,
 * on mobile device, it will consume full width on the bottom of the device.
 *
 * Each action menu will be described for an action owner using the the nesting
 * <pre>
 *      <ep-action-set>
 *          <ep-action-item title="myTitle" handler="myHandler"></ep-action-item>
 *          <ep-action-separator"></ep-action-separator>
 *          <ep-action-item title="myTitle2" handler="myHandler"></ep-action-item>
 *          <ep-action-item title="myTitle3" handler="myHandler"></ep-action-item>
 *      </ep-action-set>
 * </pre>
 *
 */
angular.module('ep.action.set', [
    'ep.feature.detection',
    'ep.templates'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.drag.drop
 * @description
 * Provides emf drag drop capability
 * HTML 5 provides native drag and drop functionality. In most cases the functionality provided by this API is enough
 *  to stick with default API. But if we look at angularjs directives we can find that it provides a number of façade
 *  directives that makes easier implementing some feature and makes code shorter and elegant. So our first intention
 *  was to create simple directive that can add corresponding attributes and attach event handlers in the background
 *  and make it easier for developer to add features in declarative way – assign ep-draggable attribute and make some
 *  element draggable. Of course we can use html5 draggable attribute and make element draggable, but, there is one
 *  more reason to use our implementation. HTML5 provides dataTransfer object for storing information about current
 *  operation and pass values to drop handlers. But, this objects is string based key/value store. So we can’t store
 *  objects in this store. In my opinion it’s bad because it adds additional amount of work for serializing and
 *  deserializing of objects. And in some cases it can be very inefficient when we have collection of objects as value
 *  of some property of serializing object.
 */
angular.module('ep.drag.drop', [
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.embedded.apps
 * @description
 * Provides services for embedded application hosting
 */
angular.module('ep.embedded.apps', ['ep.templates', 'ep.sysconfig']);

'use strict';
/**
 * @ngdoc overview
 * @name ep.feature.detection
 * @description
 * This service detects features available on the client
 */
angular.module('ep.feature.detection', [
    'ep.templates'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.local.storage
 * @description
 * Provides local storage property bag
 */
angular.module('ep.local.storage', [
    'ep.sysconfig'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.login
 * @description
 * Provides simple login/logout directive
 * depends on ep.token, ep.templates
 */
angular.module('ep.login', [
    'ui.router',
    'ep.token',
    'ep.templates'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.modaldialog
 * @description
 * Provides epicor modal dialo services
 */
angular.module('ep.modaldialog', ['ep.templates']);

'use strict';
/**
 * @ngdoc overview
 * @name ep.multi.level.menu
 * @description
 * Represents the Multi level menu
 */
angular.module('ep.multi.level.menu', [
    'ep.templates',
    'ep.local.storage',
    'ep.token'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.odata
 * @description
 * Provides epicor odata query services
 * to use, DI the ep.odata module and reference the 'odataQueryFactory' factory
 */
angular.module('ep.odata', []);

'use strict';
/**
 * @ngdoc overview
 * @name ep.search
 * @description
 * Provides the search directive
 * depends on ep.token, ep.templates
 */
angular.module('ep.search', [
    'ep.token',
    'ep.templates'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.shell
 * @description
 * Provides epicor shell
 */
angular.module('ep.shell', [
    'ngRoute',
    'ui.bootstrap',
    'ep.templates',
    'ep.feature.detection',
    'ep.local.storage',
    'ep.theme',
    'ep.utils',
    'ep.sysconfig']
    );

'use strict';
/**
 * @ngdoc overview
 * @name ep.theme
 * @description
 * This service returns a list of themes installed in the \css\themes directory
 */
angular.module('ep.sysconfig', []);

'use strict';
/**
 * @ngdoc overview
 * @name ep.templates
 * @description
 * Provides module stub to inject html templates.
 * the ngtemplates grunt task will build the html
 * templates into $templateCache against named module
 */
angular.module('ep.templates', []);

'use strict';
/**
 * @ngdoc overview
 * @name ep.theme
 * @description
 * This service returns a list of themes installed in the \css\themes directory
 */
angular.module('ep.theme', [
    'ep.templates',
    'ep.local.storage',
    'ep.sysconfig'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.token
 * @description
 * Provides epicor token auth login/logout services
 */
angular.module('ep.token', [
    'ep.utils',
    'ngCookies'
]);

'use strict';
/**
 * @ngdoc overview
 * @name ep.utils
 * @description
 * Provides emf utilities
 */
angular.module('ep.utils', [
    'ep.sysconfig'
]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.action.set.directive:epActionItem
     * @restrict E
     * @requires ep.action.set.directive:epActionSet
     *
     * @description
     * Represents the action menu item
     * - title: the text presented on the action popup
     * - handler: the function called when the action item is clicked
     * - icon: the icon
     *
     * @example
     * <pre>
     *      <ep-action-set >
     *          <ep-action-item title="First Item" handler="angular.noop" icon=""></ep-action-item>
     *          <ep-action-item title="Second Item" handler="angular.noop" icon=""></ep-action-item>
     *      </ep-action-set>
     * </pre>
     */
angular.module('ep.action.set').directive('epActionItem', [
    '$document',
    'actionSetFactory',
    function($document, actionSetFactory) {
        return {
            restrict: 'E',
            scope: {
                handler: '=',
                title: '@',
                trigger: '@',
                type: '@',
                params: '=',
                actionSwitch: '=switch',
                actionSwitchParams: '=switchParams',
                actionSwitchResult: '=switchResult',
                //            bindTo: '=',
                //            insertTo: '=',
                icon: '@'
            },
            //require : '^epActionSet',
            link: function(scope, iElement, iAttrs) {
                var scopeCopy = {
                    handler: scope.handler,
                    title: scope.title,
                    trigger: scope.trigger,
                    type: scope.type,
                    params: scope.params,
                    actionSwitch: scope.actionSwitch,
                    actionSwitchParams: scope.actionSwitchParams,
                    actionSwitchResult: scope.actionSwitchResult
                };
                scope.$destroy();
                scope = null;
                actionSetFactory.registerAction(iElement, scopeCopy, 'default' in iAttrs);
                iElement.remove();
            }
        };
    }]);

'use strict';
/**
 * @ngdoc controller
 * @name ep.action.set.controller:epActionMenuCtrl
 * @description
 * Represents the epActionMenu controller.
 *      This controller invokes the action.handler on click event
 *
 */
angular.module('ep.action.set').controller('epActionMenuCtrl', [
    '$scope',
    '$document',
    function($scope, document) {
        var vm = this;
        vm.closeMenu = closeMenu;
        vm.invokeAction = invokeAction;

        // closes the Action menu popup
        function closeMenu() {
            vm.actions = null;
            if (!$scope.$root.$$phase) {
                $scope.$apply();
            }
            document.off('click.actionMenu');
        }

        // invoke the action's handler function
        function invokeAction(evt, action) {
            action.handler.call(vm, action.callback);
            closeMenu();
            evt.stopPropagation();
            evt.preventDefault();
        }
        // listen for the $broadcast of 'actionMenuCall'
        $scope.$on('actionMenuCall', function(evt, val) {
            vm.actions = val.actions;

            // if position is fixed we are running on small width devices. Just skip this statement
            // if not, set css position of actionMenu
            if (vm.menu.css('position') !== 'fixed') {
                vm.menu.css({ left: val.event.clientX + 'px', top: val.event.clientY + 'px' });
            }
            document.on('click.actionMenu', function() {
                closeMenu();
            });
            //added for passing unit tests
            if (!$scope.$root.$$phase) {
                $scope.$apply();
            }
        });
    }]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.action.set.directive:epActionMenu
     * @restrict E
     *
     * @description
     * Represents the action menu directive.
     * There needs to be one instance of this directive to exist on the page
     * in order for the `<ep-action-set>` elements to be properly rendered.
     *
     * @example
     * <pre>
     *  <ep-action-menu></ep-action-menu>
     * </pre>
     */
angular.module('ep.action.set').directive('epActionMenu',
    function() {
        return {
            restrict: 'E',
            replace: true,
            controller: 'epActionMenuCtrl',
            controllerAs: 'actionMenuCtrl',
            templateUrl: 'src/components/ep.action.set/action-menu/action-menu.html',
            link: function(scope, el) {
                scope.actionMenuCtrl.menu = el;
            }
        };
    });

'use strict';
/**
     * @ngdoc directive
     * @name ep.action.set.directive:epActionSeparator
     * @restrict E
     * @requires ep.action.set.directive:epActionSet
     *
     * @description
     * Represents the action menu separator
     *
     * @example
     * <pre>
     *   <ep-action-set >
     *       <ep-action-item title="First Item" handler="angular.noop"></ep-action-item>
     *       <ep-action-separator></ep-action-separator>
     *       <ep-action-item title="Second Item" handler="angular.noop"></ep-action-item>
     *       <ep-action-item title="Third Item" handler="angular.noop"></ep-action-item>
     *   </ep-action-set>
     * </pre>
     */
angular.module('ep.action.set').directive('epActionSeparator', [
    '$document',
    function() {
        return {
            restrict: 'E',
            require: '^epActionSet',
            link: function(scope, iElement) {
                var actionOwner = $(iElement).parent();
                var actions = actionOwner.data('actions') || [];
                actions.push({ type: 'separator' });
                iElement.remove();
            }
        };
    }]);

'use strict';
/**
 * @ngdoc controller
 * @name ep.action.set.controller:epActionSetCtrl
 * @description
 * Represents the epActionSetCtrl controller.
 *      This controller provides the onActionCallerClick event
 *
 *
 * @example
 *
 */
angular.module('ep.action.set').controller('epActionSetCtrl', [
    '$scope',
    function($scope) {
        // find the right action and broadcast the actionMenuCall
        $scope.onActionCallerClick = function(evt) {
            var $target = $(evt.target).closest('.ep-interactivity-sign');
            // here we need to come back later and use guid/factory to serve up the
            // actions object
            var actions = $target.parent().data('actions');
            $scope.$root.$broadcast('actionMenuCall', { event: evt, actions: actions });
            evt.preventDefault();
            evt.stopPropagation();
        };
    }]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.action.set.directive:epActionSet
     * @restrict E
     *
     * @description
     * Represents the action set
     *
     * @example
     * <pre>
     *   <ep-action-set position="right-center">
     *       <ep-action-item title="First Item" handler="angular.noop"></ep-action-item>
     *       <ep-action-item title="Second Item" handler="angular.noop"></ep-action-item>
     *   </ep-action-set>
     * </pre>
     */
angular.module('ep.action.set').directive('epActionSet', [
    '$compile',
    'epFeatureDetectionService',
    function($compile, epFeatureDetectionService) {
        return {
            restrict: 'E',
            scope: {
                position: '=',
                bindTo: '=',
                insertTo: '='
            },
            controller: 'epActionSetCtrl',
            compile: function(elem, attrs) {
                var positionClass = '';
                //Positioning is one of weakneses of this directive. Positioning and other CSS conflicts are expected.
                //This topic is #1 subject for improvements
                elem.parent().addClass('ep-relative').addClass('ep-action-owner');
                positionClass = 'ep-actionset-right-down';
                if (epFeatureDetectionService.browserIsMobile() === false && attrs.position) {
                    switch (attrs.position) {
                        case 'absolute-right-bottom':
                            positionClass = 'ep-actionset-right-bottom';
                            break;
                        case 'right-bottom':
                            positionClass = 'ep-actionset-right-down';
                            break;
                        case 'right-center':
                            positionClass = 'ep-actionset-right-center';
                            break;
                    }
                }
                elem.addClass('ep-actionset');
                elem.addClass(positionClass);
                //Also we can add posibility to render this actions like :
                //1.toolbar with buttons
                //2.Silent mode. 'Foreign' DOM element as trigger
                elem.append($('<div class="ep-interactivity-sign" ' +
                    'ng-controller="epActionSetCtrl" ng-click="onActionCallerClick($event)">' +
                    //'<div class="ep-interactivity-sign-inner-ctr">' +
                    '<span class="fa fa-ellipsis-h"></span></div></div>'));
                return {
                    pre: function() {
                    },
                    post: function(scope) {
                        if (scope.bindTo) {
                            scope.bindTo.append(elem);
                            scope.bindTo.addClass('ep-relative').addClass('ep-action-owner');
                        }
                        scope.$destroy();
                        scope = null;
                    }
                };
            }
        };
    }]);

'use strict';
/**
 * @ngdoc service
 * @name ep.action.set.factory:actionSetFactory
 * @description
 * Provides Epicor Mobile Framework action set factory
 *       this factory will provide registerAction fuction to
 *
 * @example
 *       actionSetFactory.registerAction(iElement, scopeCopy, 'default' in iAttrs);
 *
 */
angular.module('ep.action.set').factory('actionSetFactory', [
    function() {
        /**
        * @ngdoc method
        * @name registerAction
        * @methodOf ep.action.set.factory:actionSetFactory
        * @public
        * @description
        * Registers the ActionSet collection of Action items
        *
        * @param {object} element The DOM element that contains info about the action
        * @param {object} scope The current scope
        */
        function registerAction(element, scope) {
            if (scope.handler === null) {
                return;
            }

            // here actionOwner is the ep-action-set element
            var actionOwner = $(element).parent();
            // this 'data' object on the actionOwner needs to be rethought..
            // come back to this later, an spin up a guid and use a service to
            // store for us the guid / actionObj --- consume this in action-set_controller
            var actions = actionOwner.data('actions') || [];
            var actionObj = {
                title: scope.title,
                type: 'action',
                icon: scope.icon
            };
            if (scope.actionSwitch) {
                actionObj.switch = scope.actionSwitch;
                actionObj.switchParams = scope.actionSwitchParams;
                actionObj.switchResult = scope.actionSwitchResult;
            }

            if (Array.isArray(scope.params)) {
                var bf = function() {
                    scope.handler.apply(element, arguments[0]);
                };
                actionObj.handler = bf.bind(actionOwner, scope.params);
            } else {
                if (scope.handler) {
                    actionObj.handler = scope.handler.bind(actionOwner, scope.params);
                }
            }

            // now we add the actions onto the actionOwner DOM
            actions.push(actionObj);
            actionOwner.data('actions', actions);
        }

        return {
            registerAction: registerAction,
        };
    }]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.action.set.directive:epDynamicActionSet
     * @restrict E
     *
     * @description
     * Represents the dynamic action menu item
     * - ep-dynamic-action-set-provider: the object that contains an instance of the dynamic action set
     * - ep-dynamic-action-set-params: the parameters passed into the dynamic action set
     * - ep-dynamic-action-set-bind-to: optional
     * - ep-dynamic-action-set-insert-to: optional
     * - ep-dynamic-action-set-injections: optional
     *
     * @example
     * <div ep-dynamic-action-set ep-dynamic-action-set-provider="actionSetProvider"
     *      ep-dynamic-action-set-params="['option', model]">
     * </div>
     */
angular.module('ep.action.set').directive('epDynamicActionSet', [
    '$compile',
    '$rootScope',
    function($compile, $scope) {
        return {
            restrict: 'EA',
            scope: {
                provider: '=epDynamicActionSetProvider',
                actionParams: '=epDynamicActionSetParams',
                //when using from $compile there might be cases when we have element we want actions bind to
                //in this case pass it using bindTo
                //defaut behavior is assume that directive is used as attribute and bind actions to container element
                bindTo: '=epDynamicActionSetBindTo',
                insertTo: '=epDynamicActionSetInsrtTo',
                injections: '=epDynamicActionSetInjections'
            },
            link: function(scope, iElement) {
                var isAttribute = typeof scope.bindTo === 'undefined' || scope.bindTo === null;

                if (!scope.provider) {
                    return;
                }
                scope.provider.actionSet.apply(isAttribute, iElement, $scope, scope, $compile);
                scope.$destroy();
                scope = null;
            }
        };
    }]);

'use strict';
/**
 * @ngdoc service
 * @name ep.action.set.factory:dynamicActionSetFactory
 * @description
 * Provides Epicor Mobile Framework dynamic action set factory
 *       this factory will provide getDynamicActionSet() fuction to serve
 *       up new DynamicActionSet object
 *
 * @example
 *      var actionSet = dynamicActionSetFactory.getDynamicActionSet('myActionSet'});
 *
 */
angular.module('ep.action.set').factory('dynamicActionSetFactory', [
    function() {
        /**
        * @ngdoc method
        * @name getDynamicActionSet
        * @methodOf ep.action.set.factory:dynamicActionSetFactory
        * @public
        * @description
        * Registers the ActionSet collection of Action items
        *
        * @param {string} name The name of the action set
        * @param {function} onCreateActionSet The function that will be invoked when the action set is creaed
        */
        function getDynamicActionSet(name, onCreateActionSet) {
            return new DynamicActionSet(name, onCreateActionSet);
        }
        return {
            getDynamicActionSet: getDynamicActionSet
        };

        /**
        * @ngdoc object
        * @name ep.action.set.object:DynamicActionSet
        * @private
        * @description
        * Represents the instance of the DynamicActionSet collection of Action items
        *
        * @param {string} name The name of the action set
        * @param {function} onCreateActionSet The function that will be invoked when the action set is creaed
        */
        function DynamicActionSet(name, onCreateActionSet) {
            this.name = name;
            this.onCreateActionSet = onCreateActionSet;
            var actions = [];
            var actionSetScope;
            var compile;
            var args;
            var actionSetElement;

            /**
            * @ngdoc method
            * @name addAction
            * @methodOf ep.action.set.object:DynamicActionSet
            * @public
            * @description
            * Adds a new item to the ActionSet collection of Action items
            *
            * @param {string} title The title of the action item
            * @param {function} handler The function that will be invoked when the action is clicked
            * @param {object} props The properties for the action item
            */
            function addAction(title, handler, props) {
                var actionObj = new DynamicAction(title, handler, props);
                validate(actionObj);
                actions.push(actionObj);
            }
            function validate(actionObj) {
                if (!(actionObj.title &&
                    actionObj.title.length > 0)) {
                    throw new Error('Title for the action is required!');
                }
            }

            /**
            * @ngdoc method
            * @name removeAction
            * @methodOf ep.action.set.object:DynamicActionSet
            * @public
            * @description
            * Remove an item from the ActionSet collection of Action items
            *
            * @param {string} title The title of the action item
            */
            function removeAction(title, makeLast) {
                var found = false;
                for (var i = 0; i < actions.length; i++) {
                    if (actions[i].title === title) {
                        actions.splice(i, makeLast ? actions.length - i : 1);
                        found = true;
                        break;
                    }
                }
                if (found) {
                    if (actionSetElement) {
                        actionSetElement.remove();
                    }
                    /*jshint validthis: true */
                    this.apply.apply(this, args);
                }
            }

            /**
            * @ngdoc method
            * @name appendAction
            * @methodOf ep.action.set.object:DynamicActionSet
            * @public
            * @description
            * Adds a new item to the ActionSet collection of Action items
            *
            * @param {string} title The title of the action item
            * @param {function} handler The function that will be invoked when the action is clicked
            * @param {object} props The properties for the action item
            * @param {string} icon The icon for the action item
            */
            function appendAction(title, handler, props, icon) {
                for (var i = 0; i < actions.length; i++) {
                    if (actions[i].title === title) {
                        return;
                    }
                }

                var actionObj = new DynamicAction(title, handler, props, icon);
                validate(actionObj);
                actions.push(actionObj);
                if (actionSetElement) {
                    actionSetElement.remove();
                }
                /*jshint validthis: true */
                this.apply.apply(this, args);
            }

            function apply(ignoreApplyCheck, element, $rootScope, scope, $compile) {
                var html = [];
                args = arguments;
                compile = $compile;
                //applied = false,
                if (!ignoreApplyCheck || angular.isFunction(onCreateActionSet) &&
                    !onCreateActionSet(element, scope)) {
                    return;
                }
                html.push('<ep-action-set position="right-bottom" bind-to="bindTo" insert-to="insertTo">');
                actionSetScope = $rootScope.$new(true);
                for (var i = 0; i < actions.length; i++) {
                    html.push(actions[i].build(i, actionSetScope));
                }
                html.push('</ep-action-set>');

                actionSetScope.bindTo = scope.bindTo || element;
                actionSetScope.params = scope.actionParams;
                actionSetScope.bindTo.data('actions', null);
                actionSetElement = $compile(html.join(''))(actionSetScope);
            }

            return {
                addAction: addAction,
                apply: apply,
                removeAction: removeAction,
                appendAction: appendAction
            };
        }
        /**
        * @ngdoc object
        * @name ep.action.set.object:DynamicAction
        * @private
        * @description
        * Represents the instance of the DynamicAction item
        *
        * @param {string} title The title of the action item
        * @param {function} handler The function that will be invoked when the action is clicked
        * @param {object} props The properties for the action item
        * @param {string} icon The icon for the action item
        */
        function DynamicAction(title, handler, props, icon) {
            this.title = title;
            this.handler = handler;
            var propHtml = [];
            var name;
            if (props) {
                for (name in props) {
                    if (props.hasOwnProperty(name)) {
                        propHtml.push(name + '="' + props[name] + '"');
                    }
                }
            }
            this.apply = function(element, $rootScope, scope, $compile) {
                var innerScope = $rootScope.$new(true);
                var template = '<ep-action-item title="' + this.title +
                    'icon="' + icon + '" ' +
                  '" handler="handler" params="params" bind-to="bindTo" insert-to="insertTo" ' +
                  propHtml.join(' ') + '></ep-action-item>';
                innerScope.handler = typeof this.handler === 'function' ? this.handler : scope[this.handler];
                innerScope.params = scope.actionParams;
                innerScope.bindTo = scope.bindTo || element;
                innerScope.insertTo = scope.provider.insertTo;
                innerScope.injections = scope.injections;
                $compile(template)(innerScope);
            };
            this.build = function(index, scope) {
                scope['fnc' + index] = this.handler;
                return '<ep-action-item title="' + this.title +
                    '" icon="' + icon + '" ' +
                  '" handler="fnc' + index + '" params="params" bind-to="bindTo" insert-to="insertTo" ' +
                    propHtml.join(' ') + '></ep-action-item>';
            };
        }
    }]);

'use strict';
/**
 * @ngdoc service
 * @name ep.drag.drop.factory:dragOperationFactory
 * @description
 * Serves up an instance of the dragOperation
 *
 * @example
 *
 */
angular.module('ep.drag.drop').factory('dragOperationFactory', [
    function() {
        /**
         * @ngdoc method
         * @name getDragOperation
         * @methodOf ep.drag.drop.factory:dragOperationFactory
         * @public
         * @description
         * Serves up an instance of the dragOperation
         *
         * @returns {object} object that represents the drag operation
         *
         */
        function getDragOperation(scope) {
            //save drag parameters for use from dropArea
            var dragOperation = {};
            dragOperation.dropCallback = scope.dropCallback;
            dragOperation.dropCallbackParams = scope.dropCallbackParams;
            dragOperation.dragItem = scope.dragItem;
            dragOperation.dragItemType = scope.dragItemType;
            return dragOperation;
        }

        return {
            getDragOperation: getDragOperation
        };
    }]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.drag.drop.directive:epDraggable
     * @restrict A
     *
     * @description
     * Represents the draggable attribue and properties
     *
     * >    dragItemType is required and we always should pass a value for it to correctly handle drop operation in
     * drop-area directive. There isn’t restricted list of allowed values for this value. You can use any value, but
     *  don’t forget add this value to dropItemTypes attribute of drop-area directive. We’ll talk about this attribute
     *  later.
     * >    dragItem contains an object that’s used as a model for item that is being dragged. There might be cases
     * when we need some object to use in drop operation. This object will be used for as this context in dropHandler
     * of drop-area directive.
     * >    dropCallback and dropCallbackParams attributes are just helper attributes. see drop-area directive.
     */
angular.module('ep.drag.drop').directive('epDraggable', [
    'dragOperationFactory',
    function(dragOperationFactory) {
        return {
            restrict: 'A',
            scope: {
                //There might be cases when we want to handle drop not at the epDropArea side
                //In this case we pass dropCallback that will be called from drop handler function in epDropArea.
                //It also helpful when we have generic drop handler for multiple epDropAreas, that expects some parameter
                //In this case the drop area as just a proxy for us to call dropCallback with required parameter
                dropCallback: '=dropCallback',
                dropCallbackParams: '=dropCallbackParams',
                //dragged item's base object. For example OLAPEntity
                dragItem: '=dragItem',
                //used for deciding whether the dropArea should handle drop with this kind of dragged item
                dragItemType: '=dragItemType'
            },
            compile: function(elem, attrs) {
                if (!attrs.draggable) {
                    elem.attr('draggable', 'true');
                }
                return function(scope, ele) {
                    if (!scope.dragItemType) {
                        throw new Error('Dragged item type is not specified!');
                    }
                    ele.on('dragstart', function(evt) {
                        //save drag parameters for use from dropArea
                        var dragOperation = dragOperationFactory.getDragOperation(scope);
                        var getDragOperation = function() {
                            return dragOperation;
                        };
                        scope.$root.$broadcast('startDraging', getDragOperation);
                        evt.stopPropagation();
                    });
                };
            }
        };
    }]);

'use strict';

/**
 * @ngdoc controller
 * @name ep.drag.drop.controller:epDropAreaCtrl
 * @description
 * Represents the drop area controller.
 *
 * @example
 *
 */
angular.module('ep.drag.drop').controller('epDropAreaCtrl', [
    '$scope',
    function($scope) {
        var vm = this;
        vm.onDragStart = onDragStart;
        vm.onDrop = onDrop;
        vm.onDragOver = onDragOver;
        var getDragOperationFnc;

        /**
         * @ngdoc method
         * @name onDragStart
         * @methodOf ep.drag.drop.controller:epDropAreaCtrl
         * @public
         * @description
         * handles the onDragStart event
         */
        function onDragStart(scope, dragOperationGetter) {
            getDragOperationFnc = dragOperationGetter;
        }

        /**
         * @ngdoc method
         * @name onDrop
         * @methodOf ep.drag.drop.controller:epDropAreaCtrl
         * @public
         * @description
         * handles the onDrop event
         */
        function onDrop(evt) {
            var dragOperation = getDragOperationFnc();
            var droppables = vm.dropItemTypes.split(',');
            if (Array.isArray(droppables) && droppables.length > 1) {
                if (droppables.indexOf(dragOperation.dragItemType) === -1) {
                    return;
                }
            } else {
                if (vm.dropItemTypes !== dragOperation.dragItemType) {
                    return;
                }
            }
            if ($scope[vm.dropHandler]) {
                /*jshint validthis:true */
                $scope[vm.dropHandler].call(dragOperation.dragItem || this, dragOperation);
            }
            evt.stopPropagation();
        }

        /**
         * @ngdoc method
         * @name onDragOver
         * @methodOf ep.drag.drop.controller:epDropAreaCtrl
         * @public
         * @description
         * handles the onDragOver event
         */
        function onDragOver(evt) {
            // TODO Add visual feedback on drag to show whether this area support this kind of drop
            evt.preventDefault();
            return false;
        }
    }]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.drag.drop.directive:epDropArea
     * @restrict A
     *
     * @description
     * Represents the drop area directive
     *
     * >    dropItemTypes is a string attribute that can contain comma separated list of item types that can be
     * dropped to this area. This value will be used by ep-drop-area directive to check whether this drop is
     * supported by this area.
     * >    dropCallback and dropCallbackParams attributes.  In some cases we already have some block of code
     * that we can run when some event occurs. We can reuse existing code in drop handler by passing a callback
     * function and parameters array in dropCallback and dropCallbackParams attributes.
     *
     * @example
     */
angular.module('ep.drag.drop').directive('epDropArea', [
    function() {
        return {
            restrict: 'A',
            controller: 'epDropAreaCtrl',
            controllerAs: 'dropCtrl',
            compile: function() {
                return function(scope, ele, attrs) {
                    // set controller vm props
                    scope.dropCtrl.dropItemTypes = attrs.dropItemTypes;
                    scope.dropCtrl.dropHandler = attrs.dropHandler;
                    // register the event handlers
                    scope.$on('startDraging', scope.dropCtrl.onDragStart);
                    ele.on('drop', scope.dropCtrl.onDrop);
                    ele.on('dragover', scope.dropCtrl.onDragOver);
                };
            }
        };
    }]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.modaldialog.directive:epmodaldialog
     * @restrict E
     *
     * @description
     * Represents the dialog pane (confirmation) directive. For internal use from epModalDialogService
     *
     */
angular.module('ep.embedded.apps').directive('epEmbeddedAppsLoader', [
    '$http',
    '$log',
    '$compile',
    '$timeout',
    'epEmbeddedAppsCacheService',
    'epEmbeddedAppsProvider',
    function($http, $log, $compile, $timeout, epEmbeddedAppsCacheService, epEmbeddedAppsProvider) {
        return {
            scope: {
                'config': '=',
                'onComplete': '&'
            },
            link: function(scope, element) {
                var childScope;

                function clearContent() {
                    if (childScope) {
                        childScope.$destroy();
                        childScope = null;
                    }
                    element.html('');
                }

                function loadTemplate(url, callback) {
                    var resourceId = 'view:' + url;
                    var view;
                    if (!epEmbeddedAppsCacheService.scriptCache.get(resourceId)) {
                        $http.get(url).
                            success(function(data) {
                                epEmbeddedAppsCacheService.scriptCache.put(resourceId, data);
                                callback(data);
                            })
                            .error(function(data) {
                                $log.error('Error loading template "' + url + "': " + data);
                            });
                    } else {
                        view = epEmbeddedAppsCacheService.scriptCache.get(resourceId);
                        $timeout(function() {
                            callback(view);
                        }, 0);
                    }
                }

                scope.$watch(function() {
                    return scope.config && scope.config.id;
                }, function() {
                    var config = scope.config;
                    if (config && config.id) {
                        epEmbeddedAppsProvider.load(config, function() {

                            var viewId = config.activeViewId || config.startViewId;
                            var templateUrl = epEmbeddedAppsProvider.getAppPath(config.id,
                                config.views[viewId].templateUrl);

                            loadTemplate(templateUrl, function(template) {
                                childScope = scope.$new();
                                element.html(template);
                                var content = element.contents();
                                var linkFn = $compile(content);

                                linkFn(childScope);

                                if (scope.onComplete) {
                                    scope.onComplete();
                                }
                            });

                        });
                    } else {
                        clearContent();
                    }
                });
            }
        };
    }]);

'use strict';

/**
 * @ngdoc controller
 * @name ep.embedded.apps.controller:epLoginCtrl
 * @description
 * Represents the login controller.
 * This controller negotiates the login/logout requests with the token factory
 *
 * @example
 *
 */
angular.module('ep.embedded.apps').controller('epEmbeddedAppShellConfigCtrl', [
    '$scope',
    '$location',
    'epShellService',
    'epSidebarService',
    function($scope, $location, epShellService, epSidebarService) {
        var locationHdl = null;

        function setupShellOptions(config, view) {
            //save shell state on entering into embedded app and then call restore on exit
            epShellService.saveState();
            if (!locationHdl) {
                locationHdl = $scope.$on('$locationChangeStart', function() {
                    if ($location.url().indexOf('/app/') !== 0) {
                        $scope.$on('$destroy', locationHdl);
                        locationHdl = null;
                        epShellService.restoreState();
                    }
                });
            }

            // inject the new sidebar template
            if (view.sidebarOptions) {
                epShellService.disableLeftSidebar();
                if (view.sidebarOptions.left) {
                    if (view.sidebarOptions.left.enabled) {
                        epShellService.enableLeftSidebar();
                    }
                    if (view.sidebarOptions.left.templateUrl) {
                        var lefturl = '"' + leftSidebarUrl + '"';
                        var leftSidebarUrl = $scope.getEmbbededAppPath(config.id, view.sidebarOptions.left.templateUrl);
                        epSidebarService.setLeftTemplate('<div ng-include=' + lefturl + '></div>');
                        //epSidebarService.setLeftTemplate("<div ng-include='\"" + leftSidebarUrl + "\"'></div>");
                    } else if (view.sidebarOptions.left.template) {
                        epSidebarService.setLeftTemplate(view.sidebarOptions.left.template);
                    }
                }

                epShellService.disableRightSidebar();
                if (view.sidebarOptions.right) {
                    if (view.sidebarOptions.right.enabled) {
                        epShellService.enableRightSidebar();
                    }
                    if (view.sidebarOptions.right.templateUrl) {
                        var righturl = '"' + rightSidebarUrl + '"';
                        var rightSidebarUrl = $scope.getEmbbededAppPath(config.id,
                            view.sidebarOptions.right.templateUrl);
                        epSidebarService.setRightTemplate('<div ng-include=' + righturl + '></div>');
                        //epSidebarService.setRightTemplate("<div ng-include='\"" + rightSidebarUrl + "\"'></div>");
                    } else if (view.sidebarOptions.right.template) {
                        epSidebarService.setRightTemplate(view.sidebarOptions.right.template);
                    }
                }
            } else {
                epShellService.disableLeftSidebar();
                epShellService.disableRightSidebar();
            }
        }

        $scope.$on('setupShellEvent', function(event, data) {
            var config = $scope.appConfig;
            if (config.name) {
                epShellService.setPageTitle(config.name);
            }
            var view = config.views[data.viewId];
            if (view) {
                setupShellOptions(config, view);
            }
        });
    }
]);

'use strict';
/**
 * @ngdoc service
 * @name ep.embedded.apps.service:epEmbeddedAppsService
 * @description
 * service for the ep.feature.detection module
 * This service detects features available on the client
 *
 * @example
 *
 */
angular.module('ep.embedded.apps').service('epEmbeddedAppsShellService', [
    '$rootScope',
    '$location',
    '$log',
    'epEmbeddedAppsConstants',
    function($rootScope, $location, $log, epEmbeddedAppsConstants) {
        var epShellService;
        var locationHdl;

        function init() {
            try {
                epShellService = angular.element('html').injector().get('epShellService');
            } catch (e) {
                $log.warning('epShellService is not found for embedded applications');
            }

            if (epShellService) {
                $rootScope.$on(epEmbeddedAppsConstants.CONFIG_LOADED_EVENT, function(event, data) {
                    setupShellConfigs(data.configs);
                });

                $rootScope.$on(epEmbeddedAppsConstants.APPLICATION_LOADED_EVENT, function(event, data) {
                    var scope = data.scope;
                    var config = scope.appConfig;
                    if (config.name) {
                        epShellService.setPageTitle(config.name);
                    }
                    var view = config.views[data.viewId];
                    if (view) {
                        setupApplicationShellOptions(scope, config, view);
                    }
                });
            }
        }

        function setupApplicationShellOptions($scope, config, view) {
            //save shell state on entering into embedded app and then call restore on exit
            epShellService.saveState();
            if (!locationHdl) {
                locationHdl = $rootScope.$on('$locationChangeStart', function() {
                    if ($location.url().indexOf('/app/') !== 0) {
                        $scope.$on('$destroy', locationHdl);
                        locationHdl = null;
                        epShellService.restoreState();
                    }
                });
            }

            // inject the new sidebar template
            if (view.sidebarOptions) {
                epShellService.disableLeftSidebar();
                if (view.sidebarOptions.left) {
                    if (view.sidebarOptions.left.enabled) {
                        epShellService.enableLeftSidebar();
                    }
                    if (view.sidebarOptions.left.templateUrl) {
                        var lefturl = '"' + leftSidebarUrl + '"';
                        var leftSidebarUrl = $scope.getEmbbededAppPath(config.id, view.sidebarOptions.left.templateUrl);
                        epShellService.setLeftTemplate('<div ng-include=' + lefturl + '></div>');
                    } else if (view.sidebarOptions.left.template) {
                        epShellService.setLeftTemplate(view.sidebarOptions.left.template);
                    }
                }

                epShellService.disableRightSidebar();
                if (view.sidebarOptions.right) {
                    if (view.sidebarOptions.right.enabled) {
                        epShellService.enableRightSidebar();
                    }
                    if (view.sidebarOptions.right.templateUrl) {
                        var righturl = '"' + rightSidebarUrl + '"';
                        var rightSidebarUrl = $scope.getEmbbededAppPath(config.id,
                            view.sidebarOptions.right.templateUrl);
                        epShellService.setRightTemplate('<div ng-include=' + righturl + '></div>');
                    } else if (view.sidebarOptions.right.template) {
                        epShellService.setRightTemplate(view.sidebarOptions.right.template);
                    }
                }
            } else {
                epShellService.disableLeftSidebar();
                epShellService.disableRightSidebar();
            }
            if (config.epShellNavBar) {
                if (config.epShellNavBar.hideHostButtons) {
                    epShellService.updateNavbarButtons([]);
                }
                if (config.epShellNavBar.closeButton) {
                    var btn = config.epShellNavBar.closeButton;
                    epShellService.addNavbarButtons([
                    {
                        id: btn.id || 'ep.embedded.app_closeApp',
                        title: btn.title || 'Close application and return home.',
                        icon: btn.icon || 'fa-times',
                        action: function() {
                            $location.url('/home');
                        }
                    }]);
                }
            }
        }

        function setupShellConfigs(configs) {
            var appStartup;
            if (configs) {
                //check if we need to add application buttons to shell Navigation Bar
                angular.forEach(configs, function(app) {
                    if (app.epShellNavBar && app.epShellNavBar.applicationButton) {
                        var btn = app.epShellNavBar.applicationButton;
                        epShellService.addNavbarButtons([
                        {
                            id: 'ep.embedded.app_' + app.id,
                            title: btn.title || app.name,
                            icon: btn.icon || app.icon,
                            action: function() {
                                $location.url('/app/' + app.id + '/' + app.startViewId);
                            }
                        }]);
                    }
                    if (app.startupInShell) {
                        appStartup = app;
                    }
                });
            }
            if (appStartup) {
                $location.url('/app/' + appStartup.id + '/' + appStartup.startViewId);
            }
        }

        function initialize() {
        }

        init();

        return {
            initialize: initialize,
            setupShellConfigs: setupShellConfigs
        };
    }]);

'use strict';

/**
 * @ngdoc object
 * @name ep.embedded.apps.object:epEmbeddedAppsConstants
 * @description
 * Constants for epEmbeddedAppsConstants.
 * ep.embedded.apps constants
 */
angular.module('ep.embedded.apps').constant('epEmbeddedAppsConstants', {
    CONFIG_LOADED_EVENT: 'CONFIG_LOADED_EVENT',
    APPLICATION_LOADED_EVENT: 'APPLICATION_LOADED_EVENT'
});

'use strict';
/**
     * @ngdoc directive
     * @name ep.modaldialog.directive:epmodaldialog
     * @restrict E
     *
     * @description
     * Represents the dialog pane (confirmation) directive. For internal use from epModalDialogService
     *
     */
angular.module('ep.embedded.apps').directive('epEmbeddedApps', [
    '$log',
    '$routeParams',
    '$timeout',
    'epEmbeddedAppsService',
    'epEmbeddedAppsConstants',
    function($log, $routeParams, $timeout, epEmbeddedAppsService, epEmbeddedAppsConstants) {
        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.embedded.apps/embedded-apps.html',
            link: function($scope) {
                var state = epEmbeddedAppsService.state;
                $scope.showSplash = false;

                function build(appId) {

                    var config = epEmbeddedAppsService.configs[appId];
                    if (config) {

                        var view;
                        if (state.viewId) {
                            view = config.views[state.viewId];
                        } else {
                            view = config.views[config.startViewId];
                        }

                        if (view) {
                            view.parent = config;
                            config.activeViewId = state.viewId;
                            $scope.currentView = view;
                        }

                        if (!config.initialized) {
                            $timeout(function() {
                                $scope.showSplash = true;
                            });
                            $scope.showApp = false;
                            var start = new Date();

                            $scope.onLoaderComplete = function() {
                                // show the splash screen for a minimum of 2 seconds...
                                var remaining = Math.max(2000 - (new Date() - start), 0);
                                config.initialized = true;

                                $timeout(function() {
                                    $scope.showSplash = false;
                                    $scope.showApp = true;
                                    $scope.$apply();
                                }, remaining);
                            };
                        } else {
                            $scope.showApp = true;
                            config.onComplete = null;
                        }

                        $scope.appConfig = config;
                        $scope.getEmbbededAppPath = epEmbeddedAppsService.getAppPath;

                        $timeout(function() {
                            $scope.$emit(epEmbeddedAppsConstants.APPLICATION_LOADED_EVENT, {
                                scope: $scope,
                                viewId: state.viewId
                            });
                            $scope.$apply();
                        });
                    }
                }

                epEmbeddedAppsService.loadConfigurations().then(function() {
                    state.appId = $routeParams.appId;
                    if ($routeParams.viewId) {
                        state.viewId = $routeParams.viewId;
                    }
                    build(state.appId);
                });
            }
        };
    }]);

'use strict';

/**
 * @ngdoc object
 * @name ep.shell.object:epShellConfig
 * @description
 * Provider for epShellConfig.
 * Gets configuration options from sysconfig.json or default
 */
angular.module('ep.embedded.apps')
    .service('epEmbeddedAppsCacheService', [
        '$cacheFactory',
        function($cacheFactory) {

            var scriptCache = $cacheFactory('scriptCache', {
                capacity: 10
            });

            var linkCache = $cacheFactory('linkCache', {
                capacity: 10
            });

            return {
                scriptCache: scriptCache,
                linkCache: linkCache
            };
        }])

    .provider('epEmbeddedAppsProvider', [
    '$controllerProvider',
    '$provide',
    '$compileProvider',
    '$filterProvider',
    '$routeProvider',
    function($controllerProvider, $provide, $compileProvider, $filterProvider, $routeProvider) {
        var regModules = ['ng'];

        var sysconfig = {
            path: 'apps',
            provider: 'sysconfig',
            applications: []
        };

        var modules = {};
        var providers = {
            $controllerProvider: $controllerProvider,
            $compileProvider: $compileProvider,
            $filterProvider: $filterProvider,
            $provide: $provide
        };
        var moduleCache = [];

        moduleCache.push = function(value) {
            if (this.indexOf(value) === -1) {
                Array.prototype.push.apply(this, arguments);
            }
        };

        function moduleExists(moduleName) {
            try {
                angular.module(moduleName);
            } catch (e) {
                if (/No module/.test(e)) {
                    return false;
                }
            }
            return true;
        }

        function ensureSlashStart(v) {
            if (v && v.indexOf('/') !== 0) {
                return '/' + v;
            }
            return v || '';
        }

        function ensureSlashEnd(v) {
            if (v && v.indexOf('/') !== v.length - 1) {
                return v + '/';
            }
            return v || '';
        }

        function getRequires(module) {
            var requires = [];
            angular.forEach(module.requires, function(requireModule) {
                if (regModules.indexOf(requireModule) === -1) {
                    requires.push(requireModule);
                }
            });
            return requires;
        }

        function register($log, $injector, providers, registerModules) {
            var i;
            var ii;
            var k;
            var invokeQueue;
            var moduleName;
            var moduleFn;
            var invokeArgs;
            var provider;
            if (registerModules) {
                var runBlocks = [];
                var configBlocks = [];
                for (k = registerModules.length - 1; k >= 0; k--) {
                    moduleName = registerModules[k];
                    regModules.push(moduleName);
                    moduleFn = angular.module(moduleName);
                    configBlocks = configBlocks.concat(moduleFn._configBlocks);
                    runBlocks = runBlocks.concat(moduleFn._runBlocks);
                    try {
                        for (invokeQueue = moduleFn._invokeQueue, i = 0, ii = invokeQueue.length; i < ii; i++) {
                            invokeArgs = invokeQueue[i];

                            if (providers.hasOwnProperty(invokeArgs[0])) {
                                provider = providers[invokeArgs[0]];
                            } else {
                                return $log.error('unsupported provider ' + invokeArgs[0]);
                            }
                            provider[invokeArgs[1]].apply(provider, invokeArgs[2]);
                        }
                    } catch (e) {
                        if (e.message) {
                            e.message += ' from ' + moduleName;
                        }
                        $log.error(e.message);
                        throw e;
                    }
                    registerModules.pop();
                }
                angular.forEach(runBlocks, function(fn) {
                    $injector.invoke(fn);
                });
            }
            return null;
        }

        function getAppPackageService(config, $timeout) {
            return function appPackageService($location) {
                var data = {};

                function goTo(viewId) {
                    $location.url('/app/' + config.id + '/' + viewId);
                }

                function executeResource(method, name, value, cacheKey, reload) {
                    if (cacheKey !== undefined && cacheKey !== null && !reload && data[cacheKey]) {
                        return $timeout(function() {
                            return data[cacheKey];
                        });
                    }
                    //var url = settings.appServerUrl + 'api/' + name;
                    //return $http[method](url, value).then(function (result) {
                    //    if (cacheKey !== undefined && cacheKey !== null) {
                    //        data[cacheKey] = result.data;
                    //    }
                    //    return result.data;
                    //});
                }

                var resource = {
                    get: function(name, cacheKey, reload) {
                        return executeResource('get', name, '', cacheKey, reload);
                    },

                    post: function(name, value, cacheKey, reload) {
                        return executeResource('post', name, value, cacheKey, reload);
                    },

                    put: function(name, value, cacheKey, reload) {
                        return executeResource('put', name, value, cacheKey, reload);
                    },

                    'delete': function(name, value, cacheKey, reload) {
                        return executeResource('delete', name, '', cacheKey, reload);
                    }
                };

                return {
                    config: config,
                    resource: resource,
                    data: data,
                    goTo: goTo
                };

            };
        }

        function getAppPath(args) {
            var _args = (angular.isObject(args) && args.length) ? args : arguments;
            var path = sysconfig.path;
            angular.forEach(_args, function(arg) {
                path += '/' + arg;
            });
            return path;
        }

        this.$get = function($timeout, $document, $http, $injector, $log, epEmbeddedAppsCacheService, epSysConfig) {
            function load(config, callback) {
                var resourceId = 'module: ' + config.id;
                modules[config.id] = config;

                if (!config) {
                    var errorText = 'Module not configured';
                    $log.error(errorText);
                    throw errorText;
                }

                function loadResources(onLoadScript, onLoadLink, onLoadComplete) {
                    function loadScripts(scriptList) {
                        if (scriptList.length) {
                            var url = _.first(scriptList);
                            var scriptId = 'script:' + url;
                            var scriptElement;
                            if (url && epEmbeddedAppsCacheService.scriptCache.get(scriptId)) {
                                loadScripts(_.rest(scriptList));
                            } else if (url) {
                                scriptElement = $document[0].createElement('script');
                                scriptElement.src = url;
                                scriptElement.onload = function() {
                                    onLoadScript(scriptId);
                                    loadScripts(_.rest(scriptList));
                                };
                                scriptElement.onerror = function() {
                                    $log.error('Error loading url: [' + url + ']');
                                    epEmbeddedAppsCacheService.scriptCache.remove(scriptId);
                                    loadScripts(_.rest(scriptList));
                                };
                                $document[0].documentElement.appendChild(scriptElement);
                                epEmbeddedAppsCacheService.scriptCache.put(scriptId, 1);
                            } else {
                                loadScripts(_.rest(scriptList));
                            }
                        } else {
                            $timeout(onLoadComplete);
                        }
                    }

                    loadScripts(config.resources.scripts.map(function(url) { return getAppPath(config.id, url); }));

                    config.resources.links.map(function(url) {
                        return getAppPath(config.id, url);
                        }).forEach(function(url) {
                            var linkId = 'link: ' + url;
                            var linkElement;
                        if (url && !epEmbeddedAppsCacheService.linkCache.get(linkId)) {
                            linkElement = $document[0].createElement('link');
                            linkElement.rel = 'stylesheet';
                            linkElement.href = url;
                            linkElement.type = 'text/css';
                            $document[0].head.appendChild(linkElement);
                            epEmbeddedAppsCacheService.linkCache.put(linkId, 1);

                            $timeout(function() {
                                onLoadLink(linkId);
                            });
                        }
                    });
                }

                function loadDependencies(moduleId, allDependencyLoad) {

                    if (regModules.indexOf(moduleId) > -1) {
                        return allDependencyLoad();
                    }

                    var loadedModule = angular.module(moduleId);
                    var requires = getRequires(loadedModule);

                    function onModuleLoad(moduleLoaded) {
                        if (moduleLoaded) {

                            var index = requires.indexOf(moduleLoaded);
                            if (index > -1) {
                                requires.splice(index, 1);
                            }
                        }
                        if (requires.length === 0) {
                            $timeout(function() {
                                allDependencyLoad(moduleId);
                            });
                        }
                    }

                    var requireNeeded = getRequires(loadedModule);
                    angular.forEach(requireNeeded, function(requireModule) {

                        moduleCache.push(requireModule);

                        if (moduleExists(requireModule)) {
                            return onModuleLoad(requireModule);
                        }

                        var requireModuleConfig = modules[requireModule];
                        if (requireModuleConfig) {
                            loadResources(function() {

                            }, function() {

                            }, function() {
                                loadDependencies(requireModule, function requireModuleLoaded(name) {
                                    onModuleLoad(name);
                                });
                            });
                        } else {
                            $log.warn('module [' + requireModule + '] not loaded and not configured');
                            onModuleLoad(requireModule);
                        }
                        return null;
                    });

                    if (requireNeeded.length === 0) {
                        onModuleLoad();
                    }
                    return null;
                }

                if (!epEmbeddedAppsCacheService.scriptCache.get(resourceId)) {
                    loadResources(
                        // onLoadScript
                        function(id) { $log.debug('Loaded ' + id); },

                        //onLoadLink
                        function(id) { $log.debug('Loaded ' + id); },

                        //onLoadComplete
                        function() {
                            moduleCache.push(config.id);
                            loadDependencies(config.id, function() {
                                angular.module(config.id).factory('appPackageService',
                                    getAppPackageService(config, $timeout, $http));
                                register($log, $injector, providers, angular.copy(moduleCache));
                                epEmbeddedAppsCacheService.scriptCache.put(resourceId, config);
                                $timeout(function() {
                                    callback(config.id);
                                });
                            });
                        });

                    angular.forEach(config.views, function(view) {
                        var virtualRoute = ensureSlashStart(config.id) +
                            ensureSlashStart(view.id) + ensureSlashStart(ensureSlashEnd(view.routeParams));
                        var actualRoute = getAppPath(config.id, view.id,
                            ensureSlashStart(ensureSlashEnd(view.routeParams)));
                        $routeProvider.when(virtualRoute, { redirectTo: actualRoute });
                    });
                    if (config.notFoundView) {
                        $routeProvider.otherwise({ redirectTo: ensureSlashStart(config.notFoundView) });
                    }
                } else {
                    $timeout(function() {
                        callback(config.id);
                    });
                }
            }

            function getConfig() {

                var section = epSysConfig.section('epEmbeddedApps');
                if (section) {
                    angular.extend(sysconfig, section);
                }

                if (!sysconfig.path) {
                    sysconfig.path = 'apps';
                }

                return sysconfig;
            }

            sysconfig = getConfig();

            return {
                settings: sysconfig,
                load: load,
                modules: modules,
                getAppPath: getAppPath
            };
        };
    }
]);

'use strict';
/**
 * @ngdoc service
 * @name ep.embedded.apps.service:epEmbeddedAppsService
 * @description
 * service for the ep.feature.detection module
 * This service detects features available on the client
 *
 * @example
 *
 */
angular.module('ep.embedded.apps').service('epEmbeddedAppsService', [
    '$rootScope',
    '$http',
    '$q',
    '$log',
    'epUtilsService',
    'epEmbeddedAppsProvider',
    'epEmbeddedAppsConstants',
    'epEmbeddedAppsShellService',
    function($rootScope, $http, $q, $log, epUtilsService,
        epEmbeddedAppsProvider, epEmbeddedAppsConstants, epEmbeddedAppsShellService) {

        var configs = {};
        var state = {
                appId: '',
                viewId: '',
                loaded: false
            };

        var packages = [];
        var loadedCount = 0;

        function initialize(forceConfigureShell) {
            return loadConfigurations(forceConfigureShell);
        }

        function loadConfigurations(forceConfigureShell) {
            var deferred = $q.defer();

            packages = [];
            loadedCount = 0;

            // We only ever want to load the configuration files once, so check if it's already loaded
            if (state.loadComplete) {
                if (forceConfigureShell === true) {
                    setupShellOnStartup();
                }
                deferred.resolve(true);
            } else {
                loadConfigurationsFromService(deferred);
            }

            return deferred.promise;
        }

        function getAppsFromConfig() {
            var ret = {
                Success: true,
                apps: epEmbeddedAppsProvider.settings.applications,
            };

            var deferred = $q.defer();
            deferred.resolve(ret);
            return deferred.promise;
        }

        function getApplications() {
            var provider = epEmbeddedAppsProvider.settings.provider;
            if (provider && provider !== 'sysconfig') {
                try {
                    var customProvider = angular.element('html').injector().get(provider);
                    return customProvider.getApps();
                } catch (e) {
                    $log.warning('Custom embedded application provider not found or failed: ' + provider);
                }
            }
            return getAppsFromConfig();
        }

        function loadConfigurationsFromService(deferred)
        {
            //appService.getApps()
            getApplications('config').then(function(data) {
                try {
                    if (data && data.Success) {

                        packages = data.apps;
                        packages.forEach(function(pkg) {
                            var appPkgPath = epEmbeddedAppsProvider.getAppPath(pkg, 'AppPackage.json');
                            $http.get(appPkgPath).then(function(response) {
                                var config = response.data;
                                $log.debug('Parsing AppPackage.config file: ' + appPkgPath);
                                configs[config.id] = config;
                                $log.debug('AppPackage name: ' + config.name);
                                var tileSize = config.tileSize ? config.tileSize.split('x') : ['2', '1'];
                                if (tileSize && tileSize.length === 2) {
                                    try {
                                        config.tileSize = {
                                            width: parseInt(tileSize[0]),
                                            height: parseInt(tileSize[1])
                                        };
                                    } catch (e) {
                                        $log.warning('Invalid value in tileSize property: ' + config.tileSize);
                                    }

                                }
                                // construct an object out of the view array so that views can be accessed
                                // by ID without having to search through the array for them
                                config.views = epUtilsService.mapArray(config.views, 'id');
                                config.initialized = false;
                                increment(deferred);
                            },
                                function(err) {
                                    increment(deferred);
                                    $log.debug('Failed retrieving AppPackage.config file: ' + appPkgPath);
                                    $log.error('Failed retrieving AppPackage.config file.');
                                    $log.error(err);
                                });
                        });

                    } else {
                        $log.warn('Unable to load app package definition files.');
                    }

                } catch (ex) {
                    $log.error(ex);
                    deferred.reject(ex);
                }
            });
        }

        // tracks the number of configuration files to load,
        // and resolves the promise once they're all done
        function increment(deferred) {

            if (++loadedCount === packages.length) {
                $rootScope.$emit(epEmbeddedAppsConstants.CONFIG_LOADED_EVENT, {
                    configs: configs
                });

                state.loadComplete = true;
                deferred.resolve(true);
            }
        }

        function getAppPath() {
            return epEmbeddedAppsProvider.getAppPath(arguments);
        }

        function setupShellOnStartup() {
            epEmbeddedAppsShellService.setupShellConfigs(configs);
        }

        return {
            initialize: initialize,
            state: state,
            loadConfigurations: loadConfigurations,
            configs: configs,
            getAppPath: getAppPath,
            setupShellOnStartup: setupShellOnStartup
        };
    }]);

'use strict';
/**
 * @ngdoc service
 * @name ep.feature.detection.service:epFeatureDetectionService
 * @description
 * service for the ep.feature.detection module
 * This service detects features available on the client
 *
 * @example
 *
 */
angular.module('ep.feature.detection').service('epFeatureDetectionService', [
    function() {
        var mediaRegistry;

        /**
         * @private
         * @description
         * features holds a set of features determined once during initialization
         */
        var features = {
            browserIsMobile: undefined,
            supportsDragAndDrop: undefined,
            transitionEvent: null,
            touchEvents: false,
            platform: {}
        };

        /*  ----- Public Functions -------> */

        /**
        * @ngdoc method
        * @name browserIsMobile
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects if function is being executed on common mobile device
        *
         */
        function browserIsMobile() {
            if (features.browserIsMobile === undefined) {
                features.browserIsMobile = (function(a) {
                    if (typeof browserIsMobile.result !== 'undefined') {
                        return browserIsMobile.result;
                    }
                    var res = false;
                    // http://detectmobilebrowsers.com way to check browser
                    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) {
                        res = true;
                    }
                    browserIsMobile.result = res;
                    return res;
                })(navigator.userAgent || navigator.vendor || window.opera);
            }
            return features.browserIsMobile;
        }

        /**
        * @ngdoc method
        * @name supportsDragAndDrop
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects if current document node contains 'draggable'
        *
        * @returns {boolean} true when current document node contains 'draggable'
        */
        function supportsDragAndDrop() {
            if (features.supportsDragAndDrop === undefined) {
                features.supportsDragAndDrop = 'draggable' in document.createElement('span');
            }
            return features.supportsDragAndDrop;
        }
        /**
        * @ngdoc method
        * @name getAnimationEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects the name of the "animationEnd" event based on browser caps
        *
        * @returns {string} the name of the animationEnd event for the current browser
        */
        function getAnimationEvent() {
            return features.animationEvent;
        }
        /**
        * @ngdoc method
        * @name getTransitionEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects the name of the "transitionEnd" event based on browser caps
        *
        * @returns {string} the name of the transitionEnd event for the current browser
        */
        function getTransitionEvent() {
            return features.transitionEvent;
        }

        /**
        * @ngdoc method
        * @name getFeatures
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * provides an object with platform settings as follows:
        * {
        *   browserIsMobile
        *   supportsDragAndDrop
        *   transitionEvent
        *   touchEvents
        *   platform = {
        *       app: 'Web',
        *       os: os,
        *       browser: { name, fullVersion, majorVersion, appName, userAgent }
        *   }
        * }
        *
        * @returns {object} containing features settings
        */
        function getFeatures() {
            return features;
        }

        /**
        * @ngdoc method
        * @name hasTouchEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Detects if touch events are supported
        *
        * @returns {boolean} true when touch events are supported
        */
        function hasTouchEvents() {
            return features.touchEvents;
        }

        /**
        * @ngdoc method
        * @name registerMediaQuery
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * Registers handlers to respond to CSS media queries being matched
        *
        * @param {integer} width The width used to trigger the media query functions.
        * @param {function} match OPTIONAL: If supplied, triggered when a media query matches.
        * @param {function} unmatch OPTIONAL: If supplied, triggered when a media query transitions from matched to unmatched state.
        * @param {function} setup OPTIONAL: If supplied, triggered once, when the handler is registered.
        */
        function registerMediaQuery(width, match, unmatch, setup) {
            mediaRegistry = 'screen and (min-width: ' + width + 'px)';

            enquire.register(mediaRegistry, {
                match: match,
                unmatch: unmatch,
                setup: setup,
                deferSetup: true
            });
        }
        /**
        * @ngdoc method
        * @name unregisterMediaQuery
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @public
        * @description
        * deregisters the handlers to no longer respond to CSS media queries
        *
        * @param {integer} width OPTIONAL: The width used to trigger the media query functions.
        */
        function unregisterMediaQuery(width) {
            var registry = width ? 'screen and (min-width: ' + width + 'px)' : mediaRegistry;
            enquire.unregister(registry);
        }

        /*  ----- Private Functions -------> */

        /**
        * @ngdoc method
        * @name whichTransitionEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @private
        * @description
        * Detects transition events
        *
        * @returns {object} transitions object
        */
        function whichTransitionEvent() {
            var t;
            var el = document.createElement('fakeelement');
            var transitions = {
                'transition': 'transitionend',
                'OTransition': 'oTransitionEnd',
                'MozTransition': 'transitionend',
                'WebkitTransition': 'webkitTransitionEnd'
            };

            for (t in transitions) {
                if (el.style[t] !== undefined) {
                    return transitions[t];
                }
            }

            return null;
        }

        /**
        * @ngdoc method
        * @name whichAnimationEvent
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @private
        * @description
        * Detects animation events
        *
        * @returns {object} animations object
        */
        function whichAnimationEvent() {
            var a;
            var el = document.createElement('fakeelement');
            var animations = {
                'animation': 'animationend',
                'OAnimation': 'oanimationend',
                'MSAnimation': 'MSAnimationEnd',
                'MozAnimation': 'mozAnimationEnd',
                'WebkitAnimation': 'webkitAnimationEnd'
            };

            for (a in animations) {
                if (el.style[a] !== undefined) {
                    return animations[a];
                }
            }

            return null;
        }

        /**
        * @ngdoc method
        * @name initialize
        * @methodOf ep.feature.detection.service:epFeatureDetectionService
        * @private
        * @description
        * One time service initialization to detect static features
        */
        function initialize() {
            features.browserIsMobile = browserIsMobile();
            features.supportsDragAndDrop = supportsDragAndDrop();
            features.transitionEvent = whichTransitionEvent();
            features.animationEvent = whichAnimationEvent();
            features.touchEvents = ('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0);

            try {
                if (window.device && window.cordova) {

                    features.platform = {
                        app: 'Cordova',
                        os: window.device.platform
                    };
                } else if (window.require !== undefined && (require('nw.gui') && process)) {
                    features.platform = {
                        app: 'NWJS',
                        os: process.platform
                    };
                } else {
                    var nAgt = navigator.userAgent;
                    var browserName = navigator.appName;
                    var fullVersion = '' + parseFloat(navigator.appVersion);
                    var majorVersion = parseInt(navigator.appVersion, 10);
                    var nameOffset = -1;
                    var verOffset = -1;
                    var ix = -1;

                    // In Opera, the true version is after 'Opera' or after 'Version'
                    if ((verOffset = nAgt.indexOf('Opera')) !== -1) {
                        browserName = 'Opera';
                        fullVersion = nAgt.substring(verOffset + 6);
                        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                            fullVersion = nAgt.substring(verOffset + 8);
                        }
                    } else if ((verOffset = nAgt.indexOf('MSIE')) !== -1) {
                        // In MSIE, the true version is after 'MSIE' in userAgent
                        browserName = 'Microsoft Internet Explorer';
                        fullVersion = nAgt.substring(verOffset + 5);
                    } else if ((verOffset = nAgt.indexOf('Chrome')) !== -1) {
                        // In Chrome, the true version is after 'Chrome'
                        browserName = 'Chrome';
                        fullVersion = nAgt.substring(verOffset + 7);
                    } else if ((verOffset = nAgt.indexOf('Safari')) !== -1) {
                        // In Safari, the true version is after 'Safari' or after 'Version'
                        browserName = 'Safari';
                        fullVersion = nAgt.substring(verOffset + 7);
                        if ((verOffset = nAgt.indexOf('Version')) !== -1) {
                            fullVersion = nAgt.substring(verOffset + 8);
                        }
                    } else if ((verOffset = nAgt.indexOf('Firefox')) !== -1) {
                        // In Firefox, the true version is after 'Firefox'
                        browserName = 'Firefox';
                        fullVersion = nAgt.substring(verOffset + 8);
                    } else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
                        (verOffset = nAgt.lastIndexOf('/'))) {
                        // In most other browsers, 'name/version' is at the end of userAgent
                        browserName = nAgt.substring(nameOffset, verOffset);
                        fullVersion = nAgt.substring(verOffset + 1);
                        if (browserName.toLowerCase() === browserName.toUpperCase()) {
                            browserName = navigator.appName;
                        }
                    }
                    if ((ix = fullVersion.indexOf(';')) !== -1) {
                        // trim the fullVersion string at semicolon/space if present
                        fullVersion = fullVersion.substring(0, ix);
                    }
                    if ((ix = fullVersion.indexOf(' ')) !== -1) {
                        fullVersion = fullVersion.substring(0, ix);
                    }
                    majorVersion = parseInt('' + fullVersion, 10);
                    if (isNaN(majorVersion)) {
                        fullVersion = '' + parseFloat(navigator.appVersion);
                        majorVersion = parseInt(navigator.appVersion, 10);
                    }

                    var os = 'Unknown OS';
                    if (navigator.appVersion.indexOf('Win') !== -1) {
                        os = 'Windows';
                    }
                    if (navigator.appVersion.indexOf('Mac') !== -1) {
                        os = 'MacOS';
                    }
                    if (navigator.appVersion.indexOf('X11') !== -1) {
                        os = 'UNIX';
                    }
                    if (navigator.appVersion.indexOf('Linux') !== -1) {
                        os = 'Linux';
                    }

                    features.platform = {
                        app: 'Web',
                        os: os,
                        browser: {
                            name: browserName,
                            fullVersion: fullVersion,
                            majorVersion: majorVersion,
                            appName: navigator.appName,
                            userAgent: navigator.userAgent
                        }
                    };
                }
            } catch (ex) {
                console.log(ex.message);
            }
        }

        //initialize the service once
        initialize();

        return {
            browserIsMobile: browserIsMobile,
            supportsDragAndDrop: supportsDragAndDrop,
            getAnimationEvent: getAnimationEvent,
            getTransitionEvent: getTransitionEvent,
            hasTouchEvents: hasTouchEvents,
            getFeatures: getFeatures,
            registerMediaQuery: registerMediaQuery,
            unregisterMediaQuery: unregisterMediaQuery
        };
    }]);

'use strict';

/**
 * @ngdoc object
 * @name ep.local.storage.object:epLocalStorageConfig
 * @description
 * Provider for epLocalStorageConfig.
 * Gets configuration options from sysconfig.json or default
 */
angular.module('ep.local.storage').provider('epLocalStorageConfig',
    function() {
        var config = {
            /**
            * @ngdoc property
            * @name settings
            * @propertyOf ep.local.storage.object:epLocalStorageConfig
            * @public
            * @description
            * Represents the default local storage settings
            */
            settings: {},
            /**
            * @ngdoc property
            * @name settingsID
            * @propertyOf ep.local.storage.object:epLocalStorageConfig
            * @public
            * @description
            * Represents the default key for localStorage
            */
            settingsID: 'emfSettings'
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        //epSysConfig.section() function returns the associated node on sysconfig.json
        this.$get = function(epSysConfig) {
            var section = epSysConfig.section('epLocalStorage');
            if (section) {
                angular.extend(config, section);
            }
            return config;
        };
    });

'use strict';
/**
 * @ngdoc service
 * @name ep.local.storage.service:epLocalStorageService
 * @description
 * Local storage service
 *
 * @example
 *
 *    >      epLocalStorageService.update('emf.key', 'newValue');
 *    >      alert('value = ' + epLocalStorageService.get('emf.key');
 */
angular.module('ep.local.storage').service('epLocalStorageService', [
    'epLocalStorageConfig',
    function(epLocalStorageConfig) {
        var settings = angular.extend({}, epLocalStorageConfig.settings);

        //  This routine parses a path string in the form of 'object.property'
        //  and adds, updates or deletes the value at that settings location.
        //  If value is undefined, it's assumed that the property will be removed
        //  from the settings object
        function setValueAtPath(obj, key, value) {
            var head = _.first(key);
            var tail = _.rest(key);

            // recurse until we're on the last part of the path and set it's value;
            if (tail.length) {
                // default the sub-object as an empty object if it isn't
                // created yet.
                obj[head] = obj[head] || {};
                // continue to recurse using the subobject and the rest of the path
                setValueAtPath(obj[head], tail, value);
            } else {
                // No more path parts left in the key, so set or delete the value.
                if (value === undefined) {
                    delete obj[head];
                } else {
                    obj[head] = value;
                }
            }
        }

        //  This is the function that corresponds with the above function and returns
        //  instead of setting them.
        function getValueAtPath(obj, key) {
            var head = _.first(key);
            var tail = _.rest(key);

            // recurse until we're on the last part of the path and get it's value;
            if (tail.length) {
                // default the sub-object as an empty object if it isn't
                // created yet.
                obj[head] = obj[head] || {};
                // continue to recurse using the subobject and the rest of the path
                return getValueAtPath(obj[head], tail);
            } else {
                // No more path parts left in the key, so get the value.
                return obj[head];
            }
        }

        function commit() {
            // Applies any changes that have been made to the settings
            /*jshint validthis: true */
            localStorage.setItem(epLocalStorageConfig.settingsID, JSON.stringify(settings));
        }
        /* ------------- Public Methods ----------------------> */
        /**
        * @ngdoc method
        * @name clear
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This clears either a single key or all of the local storage.
        * If no key is passed in, all of the settings will be cleard,
        * otherwise only the item at the path location is removed.
        *
        * @param {string} key represents the key that will be removed from the localCache
        */
        function clear(key) {
            if (key) {
                var path = key.split('.');
                // restore the individual setting to the coresponding value in
                // the default settings
                var defaultSetting = getValueAtPath(epLocalStorageConfig.settings, path);
                /*jshint validthis: true */
                setValueAtPath(settings, path, defaultSetting);
            } else {
                localStorage.removeItem(epLocalStorageConfig.settingsID);
                settings = angular.extend({}, epLocalStorageConfig.settings);
            }
            /*jshint validthis: true */
            commit();
        }

        /**
        * @ngdoc method
        * @name get
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This routine parses a path string in the form of 'object.property'
        * and retrieves the value at that settings location.
        *
        * @param {string} key represents the key that will be used to retrieve from the localCache
        */
        function get(key) {
            if (!key) { return undefined; }
            /*jshint validthis: true */
            return getValueAtPath(settings, key.split('.'));
        }
        /**
        * @ngdoc method
        * @name init
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This initializes local storage.
        * It will take seed data from sysconfig.json / epLocalStorageConfig.settings
        */
        function init() {
            // Read the settings from the local storage.
            var settingsSrc = localStorage.getItem(epLocalStorageConfig.settingsID);
            if (settingsSrc) {
                /*jshint validthis: true */
                settings = JSON.parse(settingsSrc);
            }
        }
        /**
        * @ngdoc method
        * @name update
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This routine parses a key string in the form of 'object.property'
        * and adds, updates or deletes the value at that settings location.
        * If value is undefined, it's assumed that the property will be removed
        * from the settings object
        *
        * @param {string} key represents the key that will be stored on the localCache
        * @param {string} value represents the value that will be stored on the localCache
        *
        */
        function update(key, value) {
            /*jshint validthis: true */
            setValueAtPath(settings, key.split('.'), value);
            commit();
        }
        /**
        * @ngdoc method
        * @name getOrAdd
        * @methodOf ep.local.storage.service:epLocalStorageService
        * @public
        * @description
        * This routine is a combination of two calls "get(key)" and a
        * subsequent "update(key,value)" if the key is missing.
        * If the key is found value is returned, if not found, the supplied value
        * is added under this key.
        *
        * @param {string} key represents the key that will be stored on the localCache
        * @param {string} value represents the value that will be stored on the localCache
        *
        */
        function getOrAdd(key, value) {
            var ret = get(key);
            if (ret === undefined) {
                update(key, value);
                ret = value;
            }
            return ret;
        }

        //call just once to initialize
        init();

        return {
            get: get,
            update: update,
            getOrAdd: getOrAdd,
            clear: clear
        };
    }]);

'use strict';

/**
 * @ngdoc controller
 * @name ep.login.controller:epLoginCtrl
 * @description
 * Represents the login controller.
 * This controller negotiates the login/logout requests with the token factory
 *
 * @example
 *
 */
angular.module('ep.login').controller('epLoginCtrl', [
    '$scope',
    '$stateParams',
    '$state',
    'tokenFactory',
    function($scope, $stateParams, $state, tokenFactory) {
        $scope.cancelPath = $stateParams.cancelPath || 'home';
        $scope.user = tokenFactory.getToken();
        $scope.status = '';
        $scope.$watch(function($scope) {
            $scope.hasToken = tokenFactory.hasToken();
            return (tokenFactory.hasToken());
        });

        /**
         * @ngdoc method
         * @name login
         * @methodOf ep.login.controller:epLoginCtrl
         * @public
         * @description
         * Handles the login request using the current user object from $scope
         * the tokenFactory returns a promise, so the controller will
         * need to handle success or error
         */
        $scope.login = function() {
            $scope.hasError = false;
            $scope.status = '';

            // verify input prompts are populated
            if (!$scope.user ||
                !$scope.user.hasOwnProperty('username') ||
                !$scope.user.hasOwnProperty('password') ||
                !$scope.user.username ||
                !$scope.user.password) {
                    $scope.hasError = true;
                    $scope.status = 'Please fill required fields.';
                   return;
            }

            // ask the token factory to provide success/error promise
            tokenFactory.login($scope.user)
              .success(function() {
                  //this callback will be called asynchronously
                  //when the response is available
                  $scope.hasToken = true;
                  $state.go('home');
              }).
              error(function(data, status, headers, config) {
                  //called asynchronously if an error occurs
                  //or server returns response with an error status.
                  var restServer = (config !== undefined && config !== null) ? config.url : '';
                  $scope.status = 'Login Failure at: ' + restServer;
                  $scope.hasError = true;
              });
        };

        /**
         * @ngdoc method
         * @name logout
         * @methodOf ep.login.controller:epLoginCtrl
         * @public
         * @description
         * Handles the logout request using the tokenFactory
         */
        $scope.logout = function() {
            tokenFactory.logout();
            $scope.user = {};
            $scope.hasToken = false;
        };
    }
]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.login.directive:epLogin
     * @restrict E
     *
     * @description
     * Represents the login dialog directive
     *
     * @example
     */
angular.module('ep.login').directive('epLogin',
    function() {
        return {
            restrict: 'E',
            controller: 'epLoginCtrl',
            templateUrl: 'src/components/ep.login/login.html',
        };
    });

'use strict';
/**
     * @ngdoc directive
     * @name ep.modaldialog.directive:epmodaldialog
     * @restrict E
     *
     * @description
     * Represents the dialog pane (confirmation) directive. For internal use from epModalDialogService
     *
     */
angular.module('ep.modaldialog').directive('epmodaldialog', [
    function() {
        return {
            restrict: 'E',
            templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-pane.html',
            replace: true,
            compile: function() {
                return {
                    pre: function() {
                    },
                    post: function($scope) {
                        $scope.config = ($scope.dialogState) ? $scope.dialogState.config : {}; //To be same as modals
                    }
                };
            }
        };
    }]);

'use strict';
/**
 * @ngdoc service
 * @name ep.modaldialog.factory:epModalDialogService
 * @description
 * Provides Standard and Custom Modal Dialogs
 *
 *      Buttons are set by default in each dialog. The buttons option is an array of button objects.
 *      The button object has following properties:
 *          id: button identifier
 *          text: button caption
 *          action: function(options, btn) {} if function returns -1 then dialog does not close.
 *          type: optional bootstrap style (set as btn-{type})
 *          icon: optional button icon
 *          hidden: optional hide
 *
 * @example
 * Below is some sample usage:
 *
 *  # Show a message
 *      epModalDialogService.showMessage({ message: 'hello world!', title: 'title', fnDefaultAction: function(){alert('test');} });
 *
 *  # Show confirmation (yes/no)
 *      epModalDialogService.showConfirm({ message: 'Would you like to exit?', title: 'Confirmation''hello world!', fnDefaultAction: function(){alert('exit confirmed');} });
 *
 *  # Show progress message
 *      epModalDialogService.showProgress({ message: 'hello world!', title: 'title', icon: 'fa fa-clock-o fa-4x', autoClose: 2000, fnDefaultAction: function(){alert('progess completed');} });
 *
 *  # Show exception
 *      try { throw new Error("Test Exception"); } catch (ex) { epModalDialogService.showException({}, ex); }
 *
 *  # Show custom exception with different options
 *      var options = { statusBar: true, statusBarText: 'This is status', closeButton: true, title: 'Exception title', status: 'error', message: 'Server exception message',
 *                      messageDetails: 'some trace info. this can be long at times',
 *                      buttons: [{ id: 'okButton', type: "default", text: "Ok", action: function() { alert('ok'); }}]};
 *      epModalDialogService.showException(options)
 *
 *  # Show message box
 *      epModalDialogService.showMessageBox({ title: 'Message Box Sample', message: "Hello world", });
 *
 *  # Show custom dialog
 *       epModalDialogService.showCustomDialog({
 *          templateUrl: "src/components/ep.modaldialog/modals/modaldialog-error.html",
 *          title: 'This is a custom dialog (error template)', status: 'warning', message: "Hello world" });
 *
 */
angular.module('ep.modaldialog').service('epModalDialogService', [
    '$modal',
    '$compile',
    '$rootScope',
    '$timeout',
    '$interval',
    '$injector',
    'epLocalStorageService',
    function($modal, $compile, $rootScope, $timeout, $interval, $injector, epLocalStorageService) {

        /**
         * @private
         * @description
         * default settings for confirmation (pane dialog)
         */
        var defaultConfig = {
            containerClass: 'bg-primary',
            title: 'Title',
            titleClass: 'text-warning',
            message: 'Message',
            messageClass: '',
            icon: 'fa fa-info-circle fa-4x',
            iconClass: '',
            showProgress: false,
            autoClose: 0,
            fnDefaultAction: null,
            fnCancelAction: null,
            fnButtonAction: null,
            buttons: [{ text: 'Ok', isDefault: true }]
        };

        // @private
        var dialogState = {
            isVisible: false,
            config: {},
            timerPromise: null,
            autoClosePromise: null,
            paneScope: null
        };
        angular.copy(defaultConfig, dialogState.config);

        // @private
        var currentModalInstance = null;

        // @private
        // prefix for dialogs RememberMe option. Must end with a dot '.'
        var dialogStoragePrefix = 'emf.dialogs.dialogId.';

        /**
         * @ngdoc method
         * @name showMessage
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * display standard message dialog
         * @param {object} options - optional settings as follows:
         * <pre>
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in milliseconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         *  </pre>
         */
        function showMessage(options) {
            var cfg = {
                showProgress: false,
                icon: 'fa fa-info-circle fa-4x',
            };

            setPaneStatus(options, cfg);

            copyProperties(options, cfg);

            show(cfg);
        }

        /**
         * @ngdoc method
         * @name showConfirm
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * display standard message dialog with Yes/No
         * @param {object} options - optional settings as follows:
         * <pre>
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in milliseconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         * </pre>
         */
        function showConfirm(options) {
            var cfg = {
                showProgress: false,
                icon: 'fa  fa-question-circle fa-4x',
                buttons: [{
                    text: 'Yes', isDefault: true,
                    action: (options ? options.fnDefaultAction : null)
                },
                {
                    text: 'No', isCancel: true,
                    action: (options ? options.fnCancelAction : null),
                }]
            };

            setPaneStatus(options, cfg);

            copyProperties(options, cfg);
            show(cfg);
        }

        /**
         * @ngdoc method
         * @name showProgress
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * display standard progress dialog with message
         * @param {object} options - optional settings as follows:
         * <pre>
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in milliseconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         * </pre>
         */
        function showProgress(options) {
            var cfg = {
                showProgress: true,
                icon: 'fa fa-clock-o fa-4x',
                buttons: []
            };
            copyProperties(options, cfg);

            show(cfg);
        }

        /**
         * @ngdoc method
         * @name showException
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * display standard exception dialog
         * @param {object} options - optional settings as follows:
         * <pre>
         *      all options from showCustomDialog() and additional:
         *      message - the message to display
         *      title - the title (header)
         *      icon - font awesome icon class
         *      messageDetails - message details to display (hidden if blank)
         *      status - warning\error\information
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         * </pre>
         * @param {object} ex - Error object thrown by javascript. Optional - not used for server exceptions
         */
        function showException(options, ex) {
            var cfg = {
                templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-error.html',
                title: 'Exception',
                icon: '',
                status: 'error',
                statusClass: 'alert-danger',
                statusIcon: 'fa fa-3x fa-warning',
                message: '',
                messageDetails: '',
                buttons: [{
                    id: 'btnOk', text: 'Ok', isDefault: true, type: 'primary',
                    action: (options ? options.fnDefaultAction : null)
                }]
            };

            if (ex && ex instanceof Error) {
                cfg.message = ex.message;
                cfg.messageDetails = ex.stack;
            }

            if (options && options.status) {
                var status = options.status.toLowerCase();
                switch (status) {
                    case 'warning':
                        cfg.statusClass = 'alert-warning';
                        cfg.statusIcon = 'fa fa-3x fa-warning';
                        break;
                    case 'error':
                        cfg.statusClass = 'alert-danger';
                        cfg.statusIcon = 'fa fa-3x fa-warning';
                        break;
                    case 'information': case 'info':
                        cfg.statusClass = 'alert-info';
                        cfg.statusIcon = 'fa fa-3x fa-info';
                        break;
                }
            }

            copyProperties(options, cfg);

            showCustomDialog(cfg);
        }

        /**
         * @ngdoc method
         * @name showMessageBox
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * display traditional message box
         * @param {object} options - settings neccessary to display dialog:
         * <pre>
         *      all options from showCustomDialog() and additional:
         *      message - the message to display
         *      title - the title (header)
         *      messageDetails - message details to display (hidden if blank)
         *      status - warning\error\information
         *      statusIcon - font awesome icon class (set by default from status)
         *      statusClass - class for status area (set by default from status)
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault: true set
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         * </pre>
         */
        function showMessageBox(options) {
            var cfg = {
                templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-error.html',
                title: '',
                icon: '',
                status: 'information',
                statusClass: 'alert-info',
                statusIcon: 'fa fa-3x fa-info',
                message: '',
                messageDetails: '',
                buttons: [{
                    id: 'btnOk', text: 'Ok', isDefault: true, type: 'primary',
                    action: (options ? options.fnDefaultAction : null)
                }]
            };

            if (options && options.status) {
                var status = options.status.toLowerCase();
                switch (status) {
                    case 'warning':
                        cfg.statusClass = 'alert-warning';
                        cfg.statusIcon = 'fa fa-3x fa-warning';
                        break;
                    case 'error':
                        cfg.statusClass = 'alert-danger';
                        cfg.statusIcon = 'fa fa-3x fa-warning';
                        break;
                    case 'information': case 'info':
                        cfg.statusClass = 'alert-info';
                        cfg.statusIcon = 'fa fa-3x fa-info';
                        break;
                }
            }

            copyProperties(options, cfg);

            showCustomDialog(cfg);
        }

        /**
         * @ngdoc method
         * @name showCustomDialog
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * display custom dialog based on a template
         * @param {object} options - settings neccessary to display custom dialog:
         * <pre>
         *      templateUrl - the template html for custom dialog's container
         *      controller- the controller to execute when showing the dialog (default null)
         *      size - 'small'/'large'/'' (default)
         *      icon - font awesome icon class (icon in the header)
         *      backdrop - set true if dialog can closed on background click (default false)
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied or button has iDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      statusBar - set true to display status bar (default false)
         *      statusBarText - the text to display in status bar (default empty)
         *      closeButton - set true to display close button (default false)
         * </pre>
         */
        function showCustomDialog(options) {
            var cfg = options; //for compatability with show()

            hide(); // hide dialog pane if it was open

            if (checkRememberMe(cfg) === 1) {
                return;
            }

            cfg._isModalDialog = true;
            setCommonOptions(cfg);

            return $modal.open({
                size: (cfg.size === 'small' ? 'sm' : (cfg.size === 'large' ? 'lg' : '')),
                backdrop: cfg.backdrop === false ? false : cfg.backdrop || false,
                templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-custom.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
                    currentModalInstance = $modalInstance;
                    $scope.config = cfg;
                    if (cfg.controller) {
                        $injector.invoke(cfg.controller, currentModalInstance,
                            { '$scope': $scope, '$modalInstance': $modalInstance });
                    }
                    $scope.btnclick = function(btn) {
                        var result = onButtonClick($scope.config, btn);
                        if (result !== -1) {
                            release();
                            if (btn.isCancel) {
                                $modalInstance.dismiss('cancel');
                            } else {
                                $modalInstance.close(!result ? 0 : result);
                            }
                        }
                    };
                }]
            });
        }

        /**
         * @ngdoc method
         * @name hide
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * hide any modal dialog operated by this service
         */
        function hide() {
            release();
            dialogState.isVisible = false;
            if (currentModalInstance) {
                currentModalInstance.close(0);
                currentModalInstance = null;
            }
        }

        /**
         * @ngdoc method
         * @name clearRememberMe
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * clears rememeberMe cached flag for specific dialog or all dialogs
         */
        function clearRememberMe(dialogId) {
            if (dialogId) {
                epLocalStorageService.clear(dialogStoragePrefix + dialogId);
            } else {
                //clear all dialog settings
                epLocalStorageService.clear(dialogStoragePrefix.substr(0, dialogStoragePrefix.length - 1));
            }
        }

        /* Private Functions */

        /**
         * @name copyProperties
         * @private
         * @description
         * copies properties from source to dest
         */
        function copyProperties(source, dest) {
            if (!source || !dest) { return; }
            angular.forEach(source, function(value, propName) {
                if (source[propName] !== null) {
                    if (angular.isArray(source[propName])) {
                        dest[propName] = source[propName];
                    } else if (angular.isObject(source[propName])) {
                        copyProperties(source[propName], dest[propName]);
                    } else {
                        dest[propName] = source[propName];
                    }
                }
            });
        }

        /**
         * @name show
         * @private
         * @description
         * display panel dialog (confirmation)
         * @param {object} options - optional settings as follows:
         * <pre>
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      buttons - list of buttons
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      autoClose - time in milliseconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         * </pre>
         */
        function show(options) {
            release();

            // reset the config object to default values.
            var cfg = {};

            copyProperties(defaultConfig, cfg);

            // override default values with values provided.
            copyProperties(options, cfg);

            if (checkRememberMe(cfg)) {
                hide();
                return;
            }

            dialogState.isVisible = true;

            if (!angular.element('body .ep-modaldialog.ep-modaldialog-pane').length) {
                dialogState.paneScope = $rootScope.$new();
                dialogState.paneScope.dialogState = dialogState;
                dialogState.paneScope.btnclick = function(btn) {
                    hide();
                    onButtonClick(dialogState.config, btn);
                };
                angular.element(document.body).append($compile('<epmodaldialog></epmodaldialog>')(
                    dialogState.paneScope));
            }

            cfg._isModalDialog = false;
            setCommonOptions(cfg);

            dialogState.config = cfg;
            if (dialogState.paneScope) {
                //update the panel scope
                dialogState.paneScope.config = cfg;
            }
        }

        /**
         * @name setCommonOptions
         * @private
         * @description
         * sets options common both to dialog and panel
         */
        function setCommonOptions(cfg) {
            if (cfg.buttons && cfg.buttons.length) {
                angular.forEach(cfg.buttons, function(btn) {
                    //set default button style
                    if (!btn.type) {
                        if (cfg._isModalDialog && btn.isDefault === true) {
                            btn.type = 'primary';
                        } else if (cfg._isModalDialog && btn.isCancel === true) {
                            btn.type = 'warning';
                        } else {
                            btn.type = 'default';
                        }
                    }
                });
            }

            if (cfg.autoClose) {
                cfg.messageHasTimer = (cfg.message.indexOf('{timer}') >= 0);
                cfg.titleHasTimer = (cfg.title.indexOf('{timer}') >= 0);

                dialogState.autoClosePromise = $timeout(function() {
                    if ((dialogState.autoClosePromise !== null) && cfg.fnDefaultAction) {
                        cfg.fnDefaultAction();
                    }
                    hide();
                }, cfg.autoClose * 1000);

                cfg.countDown = cfg.autoClose;

                //check if we need an interval for seconds countdown:
                if (cfg.messageHasTimer || cfg.titleHasTimer || cfg.showTimer) {
                    dialogState.timerPromise = $interval(function() {

                        cfg.countDown--;

                        if (cfg.countDown <= 0) {
                            $interval.cancel(dialogState.timerPromise);
                            dialogState.timerPromise = null;
                        }
                    }, 1000, 0);
                }

                cfg.spinnerTextClass = (cfg.countDown < 100) ? 'ep-timer-large-font' : 'ep-timer-small-font';
            }

            cfg.showSpinner = (cfg.showTimer || cfg.showProgress);
            if (cfg.showSpinner) {
                cfg.spinnerIconClass = cfg.showTimer ? 'fa-circle-o-notch' : 'fa-spinner';
            }

            cfg.fnGetMessage = function() {
                if (cfg.messageHasTimer) {
                    var repl = (cfg.countDown !== undefined && cfg.countDown !== null) ? cfg.countDown : '';
                    return cfg.message.replace('{timer}', repl);
                }
                return cfg.message;
            };
            cfg.fnGetTitle = function() {
                if (cfg.titleHasTimer) {
                    var repl = (cfg.countDown !== undefined && cfg.countDown !== null) ? cfg.countDown : '';
                    return cfg.title.replace('{timer}', repl);
                }
                return cfg.title;
            };
        }

        /*
        * @name onButtonClick
        * @private
        * @description
        * when button is clicked processing
        */
        function onButtonClick(cfg, btn) {
            var result = 0;
            var btnRemId = '';
            if (btn.action) {
                result = btn.action(cfg, btn);
                btnRemId = btn.text;
            } else if (btn.isDefault === true && cfg.fnDefaultAction) {
                result = cfg.fnDefaultAction(cfg, btn);
                btnRemId = 'fnDefaultAction';
            } else if (btn.isCancel === true && cfg.fnCancelAction) {
                result = cfg.fnCancelAction(cfg, btn);
                btnRemId = 'fnCancelAction';
            } else if (cfg.fnButtonAction) {
                result = cfg.fnButtonAction(cfg, btn);
                btnRemId = btn.text;
            } else {
                btnRemId = btn.text;
            }

            if (cfg.rememberMeValue && cfg.dialogId && btnRemId) {
                //need button id.
                epLocalStorageService.update(dialogStoragePrefix + cfg.dialogId, btnRemId);
            }
            return result;
        }

        /*
        * @name checkRememberMe
        * @private
        * @description
        * checks if rememeberMe action is to be invoked
        */
        function checkRememberMe(cfg) {
            cfg.rememberMeValue = false;
            if (cfg.rememberMe && !cfg.dialogId) {
                cfg.rememberMe = false;
            }

            if (cfg.rememberMe && cfg.dialogId && epLocalStorageService.get(dialogStoragePrefix + cfg.dialogId)) {
                var actionFound = false;
                var btnRemId = epLocalStorageService.get(dialogStoragePrefix + cfg.dialogId);
                if (btnRemId === 'fnDefaultAction' && cfg.fnDefaultAction) {
                    actionFound = true;
                    cfg.fnDefaultAction(cfg);
                } else if (btnRemId === 'fnCancelAction' && cfg.fnCancelAction) {
                    actionFound = true;
                    cfg.fnCancelAction(cfg);
                } else {
                    var b = null;
                    angular.forEach(cfg.buttons, function(btn) {
                        if (btn.text === btnRemId) {
                            b = btn;
                        }
                    });
                    if (b) {
                        if (b.action) {
                            actionFound = true;
                            b.action(cfg, b);
                        } else if (b.fnButtonAction) {
                            actionFound = true;
                            b.fnButtonAction(cfg, b);
                        }
                    }
                }

                if (!actionFound) {
                    return -1;
                }
                return 1;
            }
            return 0;
        }

        /**
         * @name setPaneStatus
         * @private
         * @description
         * sets the status for the panel dialogs
         */
        function setPaneStatus(options, cfg) {
            if (options && options.status) {
                var status = options.status.toLowerCase();
                cfg.titleClass = (status === 'warning') ? 'text-warning' :
                    ((status === 'error') ? 'text-danger' : 'text-success');
                cfg.icon = (status === 'warning' || status === 'error') ? 'fa fa-4x fa-warning' :
                    'fa fa-4x fa-check';
            }
        }

        /**
         * @name release
         * @private
         * @description
         * releases timeouts and intervals
         */
        function release() {
            if (dialogState.autoClosePromise) {
                $timeout.cancel(dialogState.autoClosePromise);
                dialogState.autoClosePromise = null;
            }
            if (dialogState.timerPromise) {
                $interval.cancel(dialogState.timerPromise);
                dialogState.timerPromise = null;
            }
        }

        return {
            showMessage: showMessage,
            showConfirm: showConfirm,
            showProgress: showProgress,
            showException: showException,
            showMessageBox: showMessageBox,
            showCustomDialog: showCustomDialog,
            hide: hide,
            clearRememberMe: clearRememberMe
        };
    }]);

'use strict';

/**
 * @ngdoc controller
 * @name ep.multilevel.menu.controller:epMultiLevelMenuCtrl
 * @description
 * Represents the epMultiLevelMenu controller for the
 * ep.multi.level.menu module, or specific for directive ep-multi-level-menu
 *
 * @example
 *
 */
angular.module('ep.multi.level.menu').controller('epMultiLevelMenuCtrl', [
    '$scope',
    '$location',
    '$routeParams',
    '$timeout',
    'epMultiLevelMenuService',
    function($scope, $location, $routeParams, $timeout, epMultiLevelMenuService) {
        // do something with $scope property
        $scope.state = {
            slidingIn: false,
            slidingOut: false,
            searchTerm: ''
        };
        $scope.data = epMultiLevelMenuService.data;
        $scope.menuId = $routeParams.menuId;
        $scope.searchResults = [];

        /**
         * @ngdoc method
         * @name search
         * @methodOf ep.multilevel.menu.controller:epMultiLevelMenuCtrl
         * @public
         * @description
         * Handles the search request
         */
        function search() {
            var results = [];
            var term = $scope.state.searchTerm.toLowerCase();
            var type = $scope.state.searchType.toLowerCase();
            _.each($scope.data.menu.levels, function(menu) {
                menu.forEach(function(item) {
                    if (item && item.type === type && item.caption.toLowerCase().indexOf(term) !== -1) {
                        results.push(item);
                    }
                });
            });
            $scope.searchResults = results;
        }

         /**
         * @ngdoc method
         * @name navigate
         * @methodOf ep.multilevel.menu.controller:epMultiLevelMenuCtrl
         * @public
         * @description
         * Handles the navigate request
         *
         * @param {object} mi the menu item
         */
        function navigate(mi) {
            $('.mlm-content').addClass('ep-ease-animation');
            if (mi.id === 'modules') {
                return;
            }
            $scope.menuId = mi.id;
            $scope.data.next = mi;
            $scope.state.slidingIn = $scope.data.current.depth < mi.depth;
            if (!$scope.state.slidingIn) {
                $scope.state.slidingOut = true;
            }

            if (mi.type === 'Menu') {
                //shellService.suspend();
                $location.url('/home/' + $scope.menuId);
            } else {
                $location.url('/dashboard/' + mi.id + '/none?mode=grid');
            }
        }

        /**
         * @ngdoc method
         * @name toggleFavorite
         * @methodOf ep.multilevel.menu.controller:epMultiLevelMenuCtrl
         * @public
         * @description
         * Handles the toggleFavorite request
         *
         * @param {object} mi the menu item
         */
        function toggleFavorite(mi) {
            //shellService.suspend();
            epMultiLevelMenuService.toggleFavorite(mi);
            //$timeout(function() {
            //    //shellService.resume();
            //});
        }

        $scope.navigate = navigate;
        $scope.toggleFavorite = toggleFavorite;
        $scope.search = search;
    }
]);

'use strict';
/**
* @ngdoc directive
* @name ep.multi.level.menu.directive:epMultiLevelMenu
* @restrict E
*
* @description
* Represents the ep.multi.level.menu directive
*
* @example
*/
angular.module('ep.multi.level.menu').directive('epMultiLevelMenu', [
    '$timeout',
    'epFeatureDetectionService',
    'epMultiLevelMenuService',
     function($timeout, epFeatureDetectionService, epMultiLevelMenuService) {
        return {
            restrict: 'E',
            replace: true,
            controller: 'epMultiLevelMenuCtrl',
            templateUrl: 'src/components/ep.multi.level.menu/multi-level-menu.html',
            scope: true,
            compile: function() {
                return {
                    pre: function() {
                    },
                    post: function($scope) {
                        $timeout(function() {
                            var transitionEvent = epFeatureDetectionService.getTransitionEvent();
                            /*jshint -W030 */
                            transitionEvent && $('.mlm-content-current').on(transitionEvent, function() {
                                // when the transition has finished, we reset the menu using the "next" level.
                                //shellService.resume();
                                // we need to remove the animation class so that when we reset the menu it just snaps in
                                $('.mlm-content').removeClass('ep-ease-animation');
                                $scope.state.slidingOut = $scope.state.slidingIn = false;

                                epMultiLevelMenuService.setCurrentMenuParent($scope.data.next);
                                $scope.data.next = null;
                                $timeout(function() {
                                    $scope.$apply();
                                });
                            });
                        }, 500);

                        if ($scope.menuId && epMultiLevelMenuService.data.menu) {
                            epMultiLevelMenuService.setCurrentMenuParentById($scope.menuId);
                        }
                    }
                };
            }
        };
    }]);

'use strict';
/**
 * @ngdoc service
 * @name ep.multi.level.menu.service:epMultiLevelMenuService
 * @description
 * Service for the ep.multi.level.menu module
 * Represents the Multi level menu
 *
 * @example
 *
 */
angular.module('ep.multi.level.menu').service('epMultiLevelMenuService', [
    'epLocalStorageService',
    'tokenFactory',
    function(epLocalStorageService, tokenFactory) {
        var data = {
            menu: null, // all of the menu data
            current: {}
        };

        var builder = (function() {
            var parentNode = null;
            var depth = 0;

            function buildTree(rootId) {
                var nodes = data.menu.levels[rootId];
                var userKey = 'user.' + tokenFactory.getToken();
                var currentSettings = epLocalStorageService.get(userKey) ?
                    epLocalStorageService.get(userKey + '.dashboard') || {} : {};
                _.each(nodes, function(node) {
                    node.children = data.menu.levels[node.id] || [];
                    node.favorite = currentSettings[node.id] ? !!currentSettings[node.id].favorite : false;
                    node.parent = parentNode;
                    node.depth = depth;
                    parentNode = node;
                    depth++;
                    buildTree(node.id);
                    depth--;
                    parentNode = node.parent;
                });
            }

            return {
                buildTree: buildTree
            };
        })();

        function iterateAll(fn) {
            var results = [];
            function iterateLevel(root) {
                _.each(root.children, function(item) {
                    if (fn(item)) {
                        results.push(item);
                    }
                    iterateLevel(item);
                });
            }

            iterateLevel(data.menu.levels.root[0]);
            return results;
        }

        function populate(menu) {// TODO: Allow injection of service
            if (menu) {
                data.menu = angular.extend({}, menu);
            }
            if (data.menu) {
                builder.buildTree('root'); // build the proper hierarchy so we can navigate in and out
                //data.current = findMenuItemById('MOBMENU');
                data.favorites = getFavorites();
            }
        }
        /**
         * @ngdoc method
         * @name setCurrentMenuParent
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Handles the setCurrentMenuParent request
         *
         * @param {object} menuItem the menu item to set as current
       */
        function setCurrentMenuParent(menuItem) {
            if (menuItem) {
                data.current = menuItem;
            }
        }
        /**
         * @ngdoc method
         * @name setCurrentMenuParentById
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Handles the setCurrentMenuParentById request
         *
         * @param {object} id the menu item id to set as current
       */
        function setCurrentMenuParentById(id) {
            var mi = findMenuItemById(id);
            if (mi) {
                setCurrentMenuParent(mi);
            }
        }
        /**
         * @ngdoc method
         * @name findMenuItemById
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Handles the findMenuItemById request
         *
         * @param {object} id the id to search for
         * @param {object} root the parent menu to start the search
       */
        function findMenuItemById(id, root) {
            var item;
            if (!root) {
                for (var top = 0; top < data.menu.levels.root.length; top++) {
                    item = findMenuItemById(id, data.menu.levels.root[top]);
                    if (item) {
                        return item;
                    }
                }
            }
            for (var idx = 0; idx < root.children.length; idx++) {
                var mi = root.children[idx];
                if (mi.id === id) {
                    item = mi;
                } else {
                    item = findMenuItemById(id, mi);
                }
                if (item) {
                    return item;
                }
            }
            return null;
        }

        /**
         * @ngdoc method
         * @name resetCache
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Handles the resetCache request
        */
        function resetCache() {
            clear();
            return populate();
        }
        /**
         * @ngdoc method
         * @name clear
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Handles the clear request
        */
        function clear() {
            data.menu = null;
            data.favorites = null;
            data.current = null;
            clearFavorites();
        }
        /**
         * @ngdoc method
         * @name toggleFavorite
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Handles the toggleFavorite request
         *
         * @param {object} mi the menu item
        */
        function toggleFavorite(mi) {
            mi.favorite = !mi.favorite;

            epLocalStorageService.update(tokenFactory.getToken() +
                    '.' + mi.id + '.favorite', mi.favorite);
            data.favorites = getFavorites();
        }
        /**
         * @ngdoc method
         * @name getFavorites
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Handles the getFavorites request
        */
        function getFavorites() {
            var favList = iterateAll(function(i) { return !!i.favorite; });
            var userKey = tokenFactory.getToken();
            var viewSettings = epLocalStorageService.get(userKey) || {};

            _.each(viewSettings, function(item) {
                if (item.favorite) {
                    favList.push(item);
                }
            });
            return favList;
        }
        /**
         * @ngdoc method
         * @name clearFavorites
         * @methodOf ep.multi.level.menu.service:epMultiLevelMenuService
         * @public
         * @description
         * Handles the clearFavorites request
        */
        function clearFavorites() {
            data.favorites = null;
        }

        return {
            data: data,
            populate: populate,
            resetCache: resetCache,
            clearFavorites: clearFavorites,
            setCurrentMenuParent: setCurrentMenuParent,
            setCurrentMenuParentById: setCurrentMenuParentById,
            findMenuItemById: findMenuItemById,
            toggleFavorite: toggleFavorite,
            clear: clear
        };
    }]);

'use strict';
/**
 * @ngdoc service
 * @name ep.odata.factory:odataQueryFactory
 * @description
 * Provides odata query phrase composition behaviors.   This should be used as a helper
 * object to compose the paramOptions object to be consumed on the
 * [Angular $resource](https://docs.angularjs.org/api/ngResource/service/$resource) service
 *
 *
 * @example
 * Below is some sample usage:
 *
 *  > this example invokes the GET request against someResource; the Angular $resource service
 *  > accepts paramDefaults object constructed using the odataQueryFactory;
 *  > this Request
 *
 *     return someResource.query(odataQueryFactory.setType('Kpis')
 *              .setTop(15).
 *              .setOrderBy('name')
 *              .setFilter({
 *                  DataSource: params.server,
 *                  Catalog: params.catalog,
 *                  Cube: params.cube
 *               })
 *               .compose(), success);
 *
 * >  results the following properties.
 *
 *         {
 *             type: 'Kpis'
 *             $top: 15,
 *             $orderby: 'name',
 *             $filter: 'DataSource eq 'x' and Catalog eq 'x' and Cube eq 'x',
 *         }
 *

 */
angular.module('ep.odata').factory('odataQueryFactory',
    function() {
        var odataObject = {};

        ///**
        //* @ngdoc method
        //* @name getCommaSeparatedPropValue
        //* @methodOf ep.odata.factory:odataQueryFactory
        //* @description
        //* @private
        //* Gets the comma separated property value
        //*
        //* @param {object} params The object that represents the Parameters to parse at runtime
        //* @param {boolean} isOrderBy The object that represents the user
        //* @returns {string} the comma separated property value
        //*/
        function getCommaSeparatedPropValue(params, isOrderBy) {
            var propValue = '';
            // handle when params is single string value
            if (typeof params === 'string') {
                propValue = params;
                params = null;
            }
            // handle when params is string[] array
            if (params && params.constructor.toString().indexOf('Array') > 1) {
                var idx;
                for (idx = 0; idx < params.length; idx++) {
                    propValue += (propValue === '' ? '' : ',') + params[idx];
                }
                params = null;
            }
            // handle when params is object with name/value properties
            if (params) {
                for (var i in params) {
                    if (params.hasOwnProperty(i)) {
                        propValue += (propValue === '' ? '' : ',') + i;
                        if (isOrderBy && params[i]) {
                            propValue += ' desc';
                        }
                    }
                }
            }
            return propValue;
        }

        /**
        * @ngdoc method
        * @name setType
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the REST service type
        *
        * @param {string} serviceName The REST service type
        * @returns {this} to allow for method chaining
        */
        function setType(serviceName) {
            if (typeof serviceName === 'string') {
                odataObject.type = serviceName;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setTop
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $top oData property
        *
        * @param {int} value The value to set as $top oData property
        * @returns {this} to allow for method chaining
        */
        function setTop(value) {
            if (!isNaN(value) && parseInt(Number(value)) === value) {
                odataObject.$top = value;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setSkip
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $skip oData property
        *
        * @param {int} value The value to set as $skip oData property
        * @returns {this} to allow for method chaining
        */
        function setSkip(value) {
            if (!isNaN(value) && parseInt(Number(value)) === value) {
                odataObject.$skip = value;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setOrderBy
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $orderby oData property
        *
        * @param {object} params The column names to set as $orderby property.
        * params can be string, [string], or { string: value, string: value}
        * @returns {this} to allow for method chaining
        */
        function setOrderBy(params) {
            var orderby = getCommaSeparatedPropValue(params, true);
            if (orderby !== '') {
                odataObject.$orderby = orderby;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setSelect
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $select oData property
        *
        * @param {object} params The column names to set as $select property.
        * params can be string, [string], or { string: value, string: value}
        * @returns {this} to allow for method chaining
        */
        function setSelect(params) {
            var select = getCommaSeparatedPropValue(params);
            if (select !== '') {
                odataObject.$select = select;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }
        /**
        * @ngdoc method
        * @name setExpands
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $expand oData property
        *
        * @param {object} params The column names to set as $expand property.
        * params can be string, [string], or { string: value, string: value}
        * @returns {this} to allow for method chaining
        */
        function setExpands(params) {
            var expand = getCommaSeparatedPropValue(params);
            if (expand !== '') {
                odataObject.$expand = expand;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }

        /**
        * @ngdoc method
        * @name setFilter
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the $filter oData property
        *
        * @param {object} params The object that represents the collection of  column names / values.
        * This provides only the most basic filter options, (comparison operater = eq; logical operator = and)
        * @returns {this} to allow for method chaining
        */
        function setFilter(params) {
            if (params) {
                for (var i in params) {
                    if (params.hasOwnProperty(i) && params[i]) {
                        odataObject.$filter = ((odataObject && odataObject.$filter) ?
                            (odataObject.$filter + ' and ') : '') +
                            i + ' eq \'' + params[i] + '\'';
                    }
                }
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }

        /**
        * @ngdoc method
        * @name setWhere
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Sets the where clause value onto $filter oData property
        *
        * @param {object} arg0 The object that represents the first argument in the where clause
        * @param {string} compareOp The comparison operator.  >, gt, >=, ge, <, lt, <=, le,
        *       =, ==, eq, !=, <>, ne, endswith, startswith, contains,
        *       day, month, year, second, minute, hour,
        *       math (see math params)
        * @param {object} arg1 The object that repesents the second argument in the where clause
        * @param {object} params (optional) { or : true } to include 'or' logical operator.
        * { not: true} to include negative logical operator.
        * {   mathOperand: number, (mathOperand and the second argument need to both be numbers)
        *     mathFunction: string, (+, -, *, /, %, etc)
        *     mathCompareOp: string (>, gt, >=, ge, <, lt, <=, le, =, ==, eq, !=, <>, ne)
        * };
        * @returns {this} to allow for method chaining
        */
        function setWhere(arg0, compareOp, arg1, params) {
            var validCompOps = {
                '>': 'gt', '>=': 'ge',
                '<': 'lt', '<=': 'le',
                '=': 'eq', '==': 'eq',
                '!=': 'ne', '<>': 'ne',
            };
            // reset the comparison operator
            compareOp = (validCompOps[compareOp]) || compareOp;
            // init the logical operators (and, or, not)
            var notOp = '';
            var logicalOp = (params && 'or' in params && params.or) ? ' or ' : ' and ';
            // init the tickmark seperator t
            var tickMark = isNaN(arg1) ? '\'' : '';
            if (arg0 !== null && arg0 !== undefined && arg1 !== null && arg1 !== undefined) {
                switch (compareOp) {
                    case 'math':
                        if (!params || !('mathOperand' in params) ||
                            !('mathFunction' in params) ||
                            !('mathCompareOp' in params)) {
                            throw 'Malformed math operation; params object must contain mathOperand, ' +
                                'mathFunction, and mathCompareOp properties';
                        }
                        if (isNaN(arg1) || isNaN(params.mathOperand)) {
                            throw 'The second argument and mathOperand for math functions needs to be a number';
                        }
                        compareOp = (validCompOps[params.mathCompareOp] || params.mathCompareOp);
                        arg0 = arg0 + ' ' + params.mathFunction + ' ' + params.mathOperand;
                        break;
                    case 'endswith':            // handle the startswith/endswith functions
                    case 'startswith':
                        arg0 = compareOp + '(' + arg0 + ',\'' + arg1 + '\')';
                        compareOp = 'eq';
                        arg1 = 'true';
                        tickMark = '';
                        notOp = (params && 'not' in params && params.not) ? 'not ' : '';
                        break;
                    case 'contains':            // handle the contains function
                        arg0 = 'indexof(' + arg0 + ',\'' + arg1 + '\')';
                        compareOp = (params && 'not' in params && params.not) ? 'lt ' : 'ge';
                        arg1 = '0';
                        tickMark = '';
                        break;
                    case 'day':                 // handle date / time functions
                    case 'month':
                    case 'year':
                    case 'second':
                    case 'minute':
                    case 'hour':
                        if (isNaN(arg1) && parseInt(Number(arg1)) !== arg1) {
                            throw 'The second argument for date/time functions needs to be an integer';
                        }
                        arg0 = compareOp + '(' + arg0 + ')';
                        compareOp = 'eq';
                        break;
                }
                // now lets append all this good stuff onto the current $filter property
                odataObject.$filter = ((odataObject && odataObject.$filter) ? (odataObject.$filter + logicalOp) : '') +
                    notOp + arg0 + ' ' + compareOp + ' ' + tickMark + arg1 + tickMark;
            }
            /*jshint validthis: true */
            return this;    // valid this to allow for method chaining
        }

        // returns the fully resolved oData object
        /**
        * @ngdoc method
        * @name compose
        * @methodOf ep.odata.factory:odataQueryFactory
        * @public
        * @description
        * Returns the fully resolved oData object
        *
        * @returns {odataObject} to be used on $resource requests
        */
        function compose() {
            var returnObj = $.extend({}, odataObject);  // create a shallow copy of our odata object
            odataObject = {};                           // reset our local copy
            return returnObj;                           // send back the shallow copy
        }

        return {
            setType: setType,
            setTop: setTop,
            setSkip: setSkip,
            setOrderBy: setOrderBy,
            setSelect: setSelect,
            setExpands: setExpands,
            setFilter: setFilter,
            setWhere: setWhere,
            compose: compose
        };
    });

'use strict';

/**
 * @ngdoc object
 * @name ep.search.object:searchConfig
 * @description
 * Provider for searchConfig.
 * Gets configuration options from searchConfig.json or default
 */
angular.module('ep.search').provider('searchConfig',
    function() {
        var config = {
            /**
            * @ngdoc property
            * @name searchUri
            * @propertyOf ep.search.object:searchConfig
            * @public
            * @description
            * Represents the URI for the Enterprise Search WCF service
            */
            searchUri: 'https://localhost/EES/EpicorERP/search.xml'
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        //epSysConfig.section() function returns the associated node on sysconfig.json
        this.$get = function(epSysConfig) {
            var section = epSysConfig.section('epSearchConfig');
            if (section) {
                angular.extend(config, section);
            }
            return config;
        };
    });

'use strict';

/**
 * @ngdoc controller
 * @name ep.search.controller:epSearchCtrl
 * @description
 * Represents the search controller.
 * This controller negotiates the search requests with the Enterprise Search
 * server
 *
 * @example
 *
 */
angular.module('ep.search').controller('epSearchCtrl', [
    '$scope',
    'searchService', searchController]);

function searchController($scope, searchService) {
    $scope.enterpriseSearch = {};
    $scope.enterpriseSearch.searching = false;
    $scope.enterpriseSearch.searchResults = null;
    $scope.enterpriseSearch.status = '';

    /**
    * @ngdoc method
    * @name changeSearch
    * @methodOf ep.search.controller:epSearchCtrl
    * @public
    * @description
    * Handles the search request using the current user object from $scope
    * the tokenFactory returns a promise, so the controller will
    * need to handle success or error
    */
    $scope.enterpriseSearch.changeSearch = function() {
        var searchText = $scope.enterpriseSearch.searchText;
        if (searchText === '') {
            $scope.enterpriseSearch.searchResults = null;
            $scope.enterpriseSearch.status = '';
        }
    };

    /**
    * @ngdoc method
    * @name runSearch
    * @methodOf ep.search.controller:epSearchCtrl
    * @public
    * @description
    * Handles the search request using the current user object from $scope
    * the tokenFactory returns a promise, so the controller will
    * need to handle success or error
    */
    $scope.enterpriseSearch.runSearch = function(searchText) {

        if (searchText === '') {
          return;
        }

        $scope.enterpriseSearch.searching = true;
        $scope.enterpriseSearch.searchResults = [];
        $scope.enterpriseSearch.status = '';
        $scope.enterpriseSearch.hasError = false;

        searchService
                .search(searchText, 0, 100)
                .then(
                    function(response) {
                        $scope.enterpriseSearch.searching = false;
                        $scope.enterpriseSearch.searchResults = response;
                    },
                    function(response) {
                        $scope.enterpriseSearch.status = 'An error occurred: ' + response.status;
                        $scope.enterpriseSearch.searching = false;
                        $scope.enterpriseSearch.hasError = true;
                    });
    };
}

'use strict';
/**
 * @ngdoc directive
 * @name ep.search.directive:epSearch
 * @restrict E
 *
 * @description
 * Represents the search dialog directive
 *
 * @example
 */
 angular.module('ep.search').directive('epSearch',
    function() {
        return {
            restrict: 'E',
            replace: true,
            controller: 'epSearchCtrl',
            templateUrl: 'src/components/ep.search/search.html'
        };
    });

'use strict';
/**
 * @ngdoc service
 * @name ep.search.factory:searchService
 * @description
 * Provides access to Enterprise Search
 *
 * **note:**    requires local searchConfig.json file with searchUri property to describe
 *              location for the Enterprise Search server
 *
 * @example
 *
 */
angular.module('ep.search').factory('searchService', [
   '$http',
   'searchConfig',
    function($http, searchConfig) {
        /**
         * @ngdoc method
         * @name search
         * @methodOf ep.search.factory:searchService
         * @public
         * @description
         * Run a search against Enterprise Search
         *
         * @param {string} searchText The text being searched for
         * @param {int} start The starting page number
         * @param {int} pageSize The number of items returned per page
         * @returns {Promise} A promise that returns the search results if
         *    resolved, or an appropriate search exception if rejected
         */
        function search(searchText, start, pageSize) {
            /**
            * search() responds with promise instance
            * Intercept the initial response to parse the data items
            */
            // return the http promise so the caller can also handle the success/error
            return runSearch(searchText, start, pageSize)
              .then(
                function(data) {
                  return transformESResultsToJSON(data);
                }, function() {
                    // error handling
                });
        }

        // private function to return the $http promise
        // fires the get request.
        function runSearch(searchText, start, pageSize) {
            var url = searchConfig.searchUri +
              '?locale=' + ((navigator.language) ? navigator.language : navigator.userLanguage) +
                      '&preservenulls=' + false +
                      '&likeLinkFormat=EWAUrl' +
                      '&callback=JSON_CALLBACK';

            var cacheControl = new Date().valueOf();
            var params = '&q=' + searchText +
                '&start=' + start +
                '&cache=' + cacheControl.toString() +
                '&pageSize=' + pageSize;

            return $http.get(url + params);
        }

        // private function to consume the search xml results and return json
        function transformESResultsToJSON(response) {
            var jsonData = {};

            if (response && response.hasOwnProperty('data')) {
                var data = response.data;
                var xmlDoc = $.parseXML(data);
                var $xml = $(xmlDoc);

                $xml.find('[primaryTable]').each(function() {
                    var results = [];

                    $(this).find('[companyName]').each(function() {
                        var result = {
                            location: this.getAttribute('location') || '',
                            label: this.getAttribute('label') || '',
                            companyContext: this.getAttribute('companyName'),
                            keyTag: this.getAttribute('keyTag'),
                            fields: []
                        };

                        $('*', this).each(function(j, node) {
                            var field = {};
                            for (var i = 0, len = node.attributes.length; i < len; i++) {
                                field[node.attributes[i].nodeName] = node.attributes[i].nodeValue;
                            }
                            field.FieldName = node.nodeName;
                            field.FieldValue = node.textContent;

                            result.fields.push(field);
                        });

                        results.push(result);
                    });

                    jsonData[this.nodeName] = {
                        label: this.getAttribute('label'),
                        primaryTable: this.getAttribute('primaryTable'),
                        results: results
                    };
                });
            }

            return jsonData;
        }

        return {
            search: search
        };
    }]);

'use strict';
/**
 * @ngdoc service
 * @name ep.shell.service:epShellFeedbackService
 * @description
 * Service for the ep.shell module
 * This service provides user feedback from the ep.shell
 */
angular.module('ep.shell').service('epShellFeedbackService', [
    'epModalDialogService',
    function(epModalDialogService) {

        /**
         * @ngdoc method
         * @name afterSuccessSubmit
         * @methodOf ep.shell.service:epShellFeedbackService
         * @private
         * @description
         * Called after successful submit. Displays a dialog.
         */
        function afterSuccessSubmit() {
            //TO DO: Shell Resources
            var resources = {
                strings: {
                    FeedbackResponse:
                    'We appreciate your feedback! We review these items regularly to help us improve the product.',
                    FeedbackTitle:
                    'Thank You!'
                }
            };
            epModalDialogService.showMessageBox({
                message: resources.strings.FeedbackResponse,
                title: resources.strings.FeedbackTitle,
                status: 'info'
            });
        }

        /*  ----- Public Functions -------> */

        /**
         * @ngdoc method
         * @name showForm
         * @methodOf ep.shell.service:epShellFeedbackService
         * @public
         * @description
         * Shows feedback submission form. Must pass a callback function fnOnSubmit parameter
         * which will be invoked upon submit
         */
        function showForm(fnOnSubmit) {
            var feedback = {
                summary: '',
                description: '',
                customerName: '',
                customerEmail: ''
            };
            epModalDialogService.showCustomDialog({
                title: 'Submit Feedback',
                templateUrl: 'src/components/ep.shell/feedback/feedback_dialog.html',
                icon: 'fa fa-bullhorn fa-2x',
                feedback: feedback,
                summaryLabel: 'Summary',
                descriptionLabel: 'Description',
                customerNameLabel: 'Customer Name',
                customerEmailLabel: 'Customer Email',
                buttons: [
                    {
                        id: 'btnSubmit',
                        isPrimary: true,
                        text: 'Submit',
                        action: function() {
                            if (fnOnSubmit) {
                                var ret = fnOnSubmit(feedback);
                                if (ret.then) {
                                    ret.then(function(result) {
                                        if (result.Success) {
                                            afterSuccessSubmit();
                                        }
                                    });
                                } else {
                                    afterSuccessSubmit();
                                }
                            }
                        }
                    },
                    {
                        id: 'btnCancel',
                        isCancel: true,
                        text: 'Cancel'
                    }
                ]
            });
        }
        return {
            showForm: showForm
        };
    }]);

'use strict';

/**
 * @ngdoc object
 * @name ep.shell.object:epShellConstants
 * @description
 * Constants for epShellConstants.
 * ep.shell constants
 */
angular.module('ep.shell').constant('epShellConstants', {
    SIDEBARWIDTH: 250,
    NAVBARHEIGHT: 40,
    FOOTERHEIGHT: 25,
    MEDIA_MODE_LARGE: 'large',
    MEDIA_MODE_SMALL: 'small',
    MEDIA_SIZE_BREAKPOINT: 800
});

'use strict';
/**
 * @ngdoc controller
 * @name ep.shell.controller:epShellCtrl
 * @description
 * Represents the main shell controller.
 */
angular.module('ep.shell').controller('epShellCtrl', [
    '$location',
    '$rootScope',
    '$scope',
    'epShellService',
    'epLocalStorageService',
    'epShellFeedbackService',
    function($location, $rootScope, $scope, epShellService, epLocalStorageService, epShellFeedbackService) {

        // Any logic that requires the immediate use of the emaService or the EmaRestService needs to be executed inside the "init" call in the controller.
        // If the logic is already inside an event handler
        function init() {
            // get the epShellService state so it can be used in the views
            $scope.state = epShellService.__state;

            //toggle sidebar event function
            $scope.toggleLeftSidebar = function() {
                epShellService.toggleLeftSidebar();
            };
            //toggle sidebar event function
            $scope.toggleRightSidebar = function() {
                epShellService.toggleRightSidebar();
            };

            $scope.navButtons = epShellService.getNavbarButtons();

            $rootScope.$on('navbarButtonsChanged', function() {
                $scope.navButtons = epShellService.getNavbarButtons();
            });

            $rootScope.$on('$routeChangeStart', function() {
                epShellService.clearInfo();
                epShellService.cleanupViewEvents();
            });

            //launch help event function
            $scope.launchHelp = function() {
                $location.url('/help');
            };

            $scope.sendFeedback = function() {
                epShellFeedbackService.showForm($scope.state.fnOnFeedback);
            };
        }

        try {
            $rootScope.$watch('initComplete', function(complete) {
                if (complete) {
                    init();
                }
            });
        } catch (ex) {
            console.log(ex);
        }
    }
]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.shell.directive:epshell
     * @restrict E
     *
     * @description
     * Represents the shell directive
     *
     * @example
     * usage. place on main index page as:
     * <body>
     *   <epshell><div ng-view></div></epshell>
     * </body>
     */
angular.module('ep.shell').directive('epShell', [
    function() {
        return {
            restrict: 'E,A',
            replace: true,
            transclude: true,
            templateUrl: 'src/components/ep.shell/shell.html',
        };
    }
]);

'use strict';

/**
 * @ngdoc object
 * @name ep.shell.object:epShellConfig
 * @description
 * Provider for epShellConfig.
 * Gets configuration options from sysconfig.json or default
 */
angular.module('ep.shell').provider('epShellConfig', [
    '$routeProvider',
    function($routeProvider) {
        var routeProviderReference = $routeProvider;

        var config = {
            options: {
                pageTitle: 'Epicor Mobile',
                brandHTML: 'Epicor Mobile Framework <sup>2.0</sup>',
                defaultTheme: 'flatly',
                disableTheming: false,
                enableFeedback: true
            },

            /**
            * @ngdoc property
            * @name themes
            * @propertyOf ep.shell.object:epShellConfig
            * @public
            * @description
            * routes is the rounting configuration. example:
            * routes : [
            *    { route: '/home', url: './main-application/views/homeview.html', controller: 'HomeCtrl' },
            *    { route: '/login', url: './main-application/views/loginview.html', controller: 'LoginCtrl', isDefault: true }
            * ]
            */
            routes : []
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        // also knowing despite the (use $http instead of $.ajax) rules on the EMF coders styleguide
        // There is a problem: $http is an asynchronous call, so its not guaranteed that the
        // data will be returned with the values read from the sysconfig.json.
        // To get around we have to make $http a sync call, which is not possible.
        this.$get = function(epSysConfig) {

            var section = epSysConfig.section('epShellConfig');
            if (section) {
                angular.extend(config, section);
            }

            angular.forEach(config.routes, function(r) {
                routeProviderReference.when(r.route, {
                    templateUrl: r.url,
                    controller: r.controller,
                    reloadOnSearch: (r.reloadOnSearch === undefined) ? true : r.reloadOnSearch
                });
                if (r.isDefault === true) {
                    routeProviderReference.otherwise({ redirectTo: r.route });
                }
            });

            if (config.options.includeEmbeddedApps) {
                routeProviderReference.when('/app/:appId/:viewId', {
                    templateUrl: 'src/components/ep.shell/views/ep-shell-embedded-apps-container.html'
                });
            }

            return config;
        };
    }
]);

'use strict';
/**
 * @ngdoc service
 * @name ep.shell.service:epShellService
 * @description
 * Service for the ep.shell
 * This service provides functions for interaction with the ep.shell
 * The ep-shell directive is the core item that needs to be present on the page
 * and epShellService.init() must be called from application initialization
 *
 * @example
 *
 */
angular.module('ep.shell').service('epShellService', [
    '$q',
    '$rootScope',
    '$timeout',
    '$sce',
    '$document',
    'epFeatureDetectionService',
    'epSidebarService',
    'epThemeService',
    'epShellConfig',
    'epShellConstants',
     function($q, $rootScope, $timeout, $sce, $document,
         epFeatureDetectionService, epSidebarService, epThemeService, epShellConfig, epShellConstants) {

         /**
          * @private
          * @description
          * Holds the current shell state. Almost all settings are here
          */
         var shellState = {
             showProgressIndicator: false,
             progressIndicatorlevel: 0,
             feedbackEnabled: true,
             fnOnFeedback: undefined,
             suspend: false,
             disableTheming: false,     //disable all theming
             includeThemeFile: true,    //include stylesheet reference into shell.html
             currentTheme: null,        //current theme
             showBrand: true,
             brandHTML: 'Mobile Access <sup>2.0</sup>',
             freezeNavButtons: false,
             viewSettings: {
                 sidebar: {},
                 small: {
                     animateViewContainer: true,
                     showLeftSidebar: false,
                     enableLeftSidebar: true,
                     autohideSidebar: false,
                     showLeftToggleButton: false,
                     showRightToggleButton: false,
                     showNavbar: false,
                     showFooter: false,
                     showHomeButton: false,
                     showBrand: false,
                 },
                 large: {
                     animateViewContainer: true,
                     showLeftSidebar: false,
                     enableLeftSidebar: true,
                     autohideSidebar: false,
                     showLeftToggleButton: false,
                     showRightToggleButton: false,
                     showNavbar: false,
                     showFooter: false,
                     showHomeButton: false,
                     showBrand: false,
                 }
             },
             pageTitle: '',
             colorScheme: {},
             mediaMode: epShellConstants.MEDIA_MODE_SMALL,
             date: {
                 weekday: 'Tuesday',
                 month: 'October',
                 day: 21
             },
             viewDimensions: {
                 offset: { top: 0, left: 0 },
                 size: { width: 0, height: 0 }
             },
             infoMessage: '',
             infoIcon: 'fa fa-3x fa-warning',
             executeButton: function(btn) {
                 shellState.navButtonClicked = null;
                 if (btn.confirm) {
                     btn.confirm(btn.action);
                 } else if (shellState.freezeNavButtons !== true) {
                     btn.action();
                 }
             },
             buttonMouseDown: function(btn) {
                 //record buttonClicked (for ng-blur events). it will be dismissed after real click.
                 shellState.navButtonClicked = btn;
             },
             momentumScrollingEnabled : true,
             allowVerticalScroll: true,
             //Stores the nav button that is clicked on mouse down event. This state is cleared on actual click event.
             //Useful for blur processing
             navButtonClicked : null
         };

         /**
          * @private
          * @description
          * After saveState() is called, savedState contains certain properties of current shell state
          * that are needed to restore later.
          */
         var savedState = {};

         /**
          * @private
          * @description
          * Contains the navigation buttons array
          */
         var navbarButtons = [];

         /**
          * @private
          * @description
          * Contains the bound view events
          */
         var boundViewEvents = {};

         /**
          * @private
          * @description
          * Flag if theming was initialized, to avoid second time initialization when toggling
          */
         var themingInitialized = false;

         /**
          * @private
          * @description
          * Certain things we initialize at the first reference of the service
          */
         function initialize() {
             //setup the epFeatureDetectionService enquireService registration at 800 px so that we can
             //perform Javascript operations when the UI goes into large / small mode
             epFeatureDetectionService.registerMediaQuery(epShellConstants.MEDIA_SIZE_BREAKPOINT, function() {
                 shellState.mediaMode = epShellConstants.MEDIA_MODE_LARGE;
                 notifyStateChanged('setMediaMode');
             }, function() {
                 shellState.mediaMode = epShellConstants.MEDIA_MODE_SMALL;
                 notifyStateChanged('setMediaMode');
             });

             //Any time the size of the shell window changes fire an event to the views
             function sendResizeEvent() {
                 notifySizeChanged('size');
             }

             //this is to ensure it only happens one time
             var lazySendResize = _.debounce(sendResizeEvent, 100);
             angular.element(window).on('resize', lazySendResize);
             $timeout(sendResizeEvent, 100);
             $rootScope.$on('$routeChangeSuccess', sendResizeEvent);

             setPageTitle(epShellConfig.options.pageTitle);
             setBrandHTML(epShellConfig.options.brandHTML);

             if (epShellConfig.options.enableFeedback !== undefined) {
                 shellState.feedbackEnabled = epShellConfig.options.enableFeedback;
             }

             initializeTheming();
         }

         /**
          * @private
          * @description
          * Initialize theming
          */
         function initializeTheming() {
             shellState.disableTheming = epShellConfig.options.disableTheming;
             if (shellState.disableTheming !== true) {
                 themingInitialized = true;
                 if (epShellConfig.options.defaultTheme) {
                     epThemeService.theme(epShellConfig.options.defaultTheme);
                 } else {
                     epThemeService.theme();
                 }
                 shellState.currentTheme = epThemeService.getThemeWithFullPath();
                 $rootScope.$on('epThemeChangedEvent', function() {
                     shellState.currentTheme = epThemeService.getThemeWithFullPath();
                 });
             }
         }

         /**
          * @private
          * @description
          * Set flags depending on current mode (small or large)
          */
         function setCurrentModeFlags() {
             var mode = shellState.viewSettings[shellState.mediaMode];

             shellState.autohideSidebar = mode.autohideSidebar !== false;
             shellState.showLeftToggleButton = mode.enableLeftSidebar;
             shellState.enableLeftSidebar = mode.enableLeftSidebar;
             shellState.showRightToggleButton = mode.enableRightSidebar;
             shellState.enableRightSidebar = mode.enableRightSidebar;

             shellState.showNavbar = mode.showNavbar;
             shellState.showFooter = mode.showFooter;
             shellState.showHomeButton = mode.showHomeButton; // We want to default as shown, so check that the attribute doesn't explicitly hide it
             shellState.showBrand = mode.showBrand;// We want to default as shown, so check that the attribute doesn't explicitly hide it

             if (mode.enableLeftSidebar && (isMediaModeLarge() || shellState.suspend)) {
                 showLeftSidebar();
             } else {
                 hideLeftSidebar();
             }

             hideRightSidebar(false);
             shellState.allowVerticalScroll = !!mode.allowVerticalScroll;
             shellState.animateViewContainer = mode.animateViewContainer !== false;
             shellState.momentumScrollingEnabled = mode.momentumScrollingEnabled !== false;
             notifyStateChanged();
         }

         /**
          * @private
          * @description
          * Set or Get the viewSettings
          */
         function viewSettings(settings) {
             if (settings !== undefined) {
                 shellState.viewSettings = settings;
             }
             return shellState.viewSettings;
         }

         //--------  Public Functions ----------------------->>>>

         /**
          * @ngdoc method
          * @name init
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Initialization of the shell. To be called by application upon start-up
          */
         function init() {
             window.addEventListener('load', function() {
                 FastClick.attach(document.body);
             }, false);

             var windowWidth = $(window).width();
             shellState.mediaMode = windowWidth >= epShellConstants.MEDIA_SIZE_BREAKPOINT ?
                 epShellConstants.MEDIA_MODE_LARGE : epShellConstants.MEDIA_MODE_SMALL;
             // initialize the sidebar as "shown" if we're in large mode, otherwise false.
             shellState.showSidebar = isMediaModeLarge();

             $rootScope.initComplete = true;
         }

         /**
          * @ngdoc method
          * @name saveState
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * save current shell state for later usage by restoreState(). Used by embedded applications to store
          * shell state when embedded app is started and then to restore back when exiting embedded app
          * @returns {object} saved state data
          */
         function saveState() {
             savedState = {
                 pageTitle: getPageTitle(),
                 brandHTML: getBrandHTML(),
                 navbarButtons: angular.extend([], navbarButtons)
             };
             return savedState;
         }

         /**
          * @ngdoc method
          * @name restoreState
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Used in conjunction with saveState(). This method will restore some properties
          * of shell state to what they were at the time of saveState() call.
          * @param {object} state - optional parameter that contains saved state data. If not
          * provided, internal saved state data will be used
          */
         function restoreState(state) {
             var oldState = (state) ? state : savedState;
             if (oldState && oldState !== {}) {
                 if (oldState.navbarButtons) {
                     updateNavbarButtons(oldState.navbarButtons);
                 }
                 if (oldState.pageTitle) {
                     setPageTitle(oldState.pageTitle);
                 }
                 if (oldState.brandHTML) {
                     setBrandHTML(oldState.brandHTML);
                 }
             }
         }

         /**
          * @ngdoc method
          * @name showProgressIndicator
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Show progress indicator in the middle of the current view of the shell
          */
         function showProgressIndicator() {
             shellState.showProgressIndicator = true;
             shellState.progressIndicatorlevel++;
         }

         /**
          * @ngdoc method
          * @name hideProgressIndicator
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Hides progress indicator. Since showProgressIndicator() are stackable (queue)
          * the hideProgressIndicator() will decrement the show calls and will actually hide when bottom of
          * queue is reached.
          * @param {boolean} immediate - optional parameter - if true the progress indicator is stopped
          * immediately, otherwise after a timeout
          */
         function hideProgressIndicator(immediate) {
             shellState.progressIndicatorlevel--;
             shellState.progressIndicatorlevel = Math.max(shellState.progressIndicatorlevel, 0);
             if (shellState.progressIndicatorlevel === 0) {
                 if (immediate) {
                     shellState.showProgressIndicator = false;
                 } else {
                     $timeout(function() { shellState.showProgressIndicator = false; });
                 }
             }
         }

         /**
          * @ngdoc method
          * @name resetProgressIndicator
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Hides and resets progress indicator. Since showProgressIndicator() are stackable (queue)
          * the hideProgressIndicator() will decrement the show calls and will actually hide when bottom of
          * queue is reached. This method allows to hide immediately, reseeting the queue.
          */
         function resetProgressIndicator() {
             shellState.progressIndicatorlevel = 0;
             hideProgressIndicator(true);
         }

         /**
          * @ngdoc method
          * @name getMediaMode
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Returns the current media mode: MEDIA_MODE_LARGE or MEDIA_MODE_SMALL (epShellConstants)
          * @returns {string} current media mode: MEDIA_MODE_LARGE or MEDIA_MODE_SMALL (epShellConstants)
          */
         function getMediaMode() {
             return shellState.mediaMode;
         }

         /**
          * @ngdoc method
          * @name isMediaModeLarge
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Checks if the current media mode is MEDIA_MODE_LARGE (epShellConstants)
          */
         function isMediaModeLarge() {
             return shellState.mediaMode === epShellConstants.MEDIA_MODE_LARGE;
         }

         /**
          * @ngdoc method
          * @name themingDisabled
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Returns the state of theming flag as set by sysconfig.json. True - if theming is disabled.
          * Can also be used to turn off and on theming in the shell by passing the disabled parameter
          * @param {boolean} disabled - optional parameter - if true theming is set disabled, if false set as enabled
          * @returns {boolean} current media mode: MEDIA_MODE_LARGE or MEDIA_MODE_SMALL (epShellConstants)
          */
         function themingDisabled(disabled) {
             if (disabled !== undefined) {
                 //if disabled falg is provided, then change the state if needed
                 shellState.disableTheming = !!disabled;
                 if (shellState.disableTheming === false) {
                     if (!themingInitialized) {
                         initializeTheming();
                     } else {
                         shellState.currentTheme = epThemeService.getThemeWithFullPath();
                     }
                 }
             }
             return shellState.disableTheming;
         }

         function registerViewEvent(id, eventName, callback) {
             // clean up the old event if there is one
             if (boundViewEvents[id]) {
                 boundViewEvents[id]();
             }

             // register the given event in the boundViewEvents collection.
             boundViewEvents[id] = $rootScope.$on(eventName, callback);
         }

         function cleanupViewEvents() {
             // clean up any events that have been registered.
             _.each(boundViewEvents, function(unregister) { unregister(); });
             boundViewEvents = {};
         }

         /**
          * @ngdoc method
          * @name setInfo
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Set the Info Message view overlay, that will cover the current view
          * @param {string} icon - icon to be displayed
          * @param {string} message - icon to be displayed
          */
         function setInfo(icon, message) {
             shellState.infoIcon = icon;
             shellState.infoMessage = message;
         }

         /**
          * @ngdoc method
          * @name clearInfo
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Clears the Info Message view overlay, that covers the current view.
          */
         function clearInfo() {
             shellState.infoIcon = '';
             shellState.infoMessage = '';
         }

         /**
          * @ngdoc method
          * @name setPageTitle
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Set the title of the page on the browser
          */
         function setPageTitle(val) {
             shellState.pageTitle = val;
             $document[0].title = shellState.pageTitle;
         }

         /**
          * @ngdoc method
          * @name getPageTitle
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Get the title of the page (from shell state)
          * @returns {string} page title
          */
         function getPageTitle() {
             return shellState.pageTitle;
         }

         /**
          * @ngdoc method
          * @name toggleBrand
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Toggles the display of the brand in the shell
          */
         function toggleBrand() {
             shellState.showBrand = !shellState.showBrand;
             shellState.viewSettings[shellState.mediaMode].showBrand = shellState.showBrand;
         }

         /**
          * @ngdoc method
          * @name showBrand
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Turns on and off the display of the brand in the shell
          * @param {boolean} onOff - if true brand is turned on, if false set as off
          */
         function showBrand(onOff) {
             shellState.showBrand = (onOff === undefined) ? true : onOff;
             shellState.viewSettings[shellState.mediaMode].showBrand = shellState.showBrand;
         }

         /**
          * @ngdoc method
          * @name setBrandHTML
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Sets the branding HTML.
          * @param {string} html - branding html
          */
         function setBrandHTML(html) {
             shellState.brandHTML = angular.isString(html) ? $sce.trustAsHtml(html) : html;
         }

         /**
          * @ngdoc method
          * @name getBrandHTML
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Returns the branding html. (The html returned is compiled by $sce)
          * @returns {string} brand html
          */
         function getBrandHTML() {
             return shellState.brandHTML;
         }

         function notifyShellButtonsChanged(event) {
             navbarButtons = _.sortBy(navbarButtons, function(btn) { return btn.index; });
             $rootScope.$emit('navbarButtonsChanged', event);
             $timeout(function() { $rootScope.$apply(); });
         }

         function suspend() {
             shellState.suspend = true;
         }

         function resume() {
             shellState.suspend = false;
         }

         /**
          * @ngdoc method
          * @name feedbackCallback
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Set the callback function for Feedback which is called after the feedback form is displayed
          * and user data is entered. The applicatio will then do whatever it nneds to do to forward the
          * feedback appropriately.
          */
         function feedbackCallback(fnOnFeedback) {
             //set or get feedback callback function which will do actual submission of user data.
             //Function must return a promise.
             if (fnOnFeedback !== undefined) {
                 shellState.fnOnFeedback = fnOnFeedback;
             }
             return shellState.fnOnFeedback;
         }

         /**
          * @ngdoc method
          * @name enableFeedback
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Enable the feedback button functionality (by default on, can be overriden by sysconfig)
          */
         function enableFeedback() {
             shellState.feedbackEnabled = true;
         }

         /**
          * @ngdoc method
          * @name disableFeedback
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Disable the feedback button functionality (by default on, can be overriden by sysconfig)
          */
         function disableFeedback() {
             shellState.feedbackEnabled = false;
         }
         /**
          * @ngdoc method
          * @name toggleFeedback
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Toggle the feedback button functionality (by default on, can be overriden by sysconfig)
          */
         function toggleFeedback() {
             shellState.feedbackEnabled = !shellState.feedbackEnabled;
         }

         function notifyStateChanged(event) {
             $rootScope.$emit('shellStateChanged', event);
         }

         function notifySizeChanged(event) {
             // use timeout to wait until the animation is complete before publishing the resize event
             $timeout(function() {
                 $rootScope.$emit('shellSizeChanged', event);
             }, 310);
         }

         /**
          * @ngdoc method
          * @name hideHomeButton
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Hide home button (can be overriden by viewcontainer options)
          */
         function hideHomeButton() {
             if (shellState.showHomeButton) {
                 shellState.showHomeButton = false;
                 notifyShellButtonsChanged('hideHomeButton');
             }
         }

         /**
          * @ngdoc method
          * @name showHomeButton
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Show home button (can be overriden by viewcontainer options)
          */
         function showHomeButton() {
             if (!shellState.showHomeButton) {
                 shellState.showHomeButton = true;
                 notifyShellButtonsChanged('showHomeButton');
             }
         }

         /**
          * @ngdoc method
          * @name hideLeftToggleButton
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Hide the left panel toggle button
          */
         function hideLeftToggleButton() {
             if (shellState.showLeftToggleButton) {
                 shellState.showLeftToggleButton = false;
                 notifyShellButtonsChanged('hideLeftToggleButton');
             }
         }

         /**
          * @ngdoc method
          * @name showLeftToggleButton
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Show the left panel toggle button
          */
         function showLeftToggleButton() {
             if (!shellState.showLeftToggleButton) {
                 shellState.showLeftToggleButton = true;
                 notifyShellButtonsChanged('showLeftToggleButton');
             }
         }

         /**
          * @ngdoc method
          * @name hideRightToggleButton
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Hide the right panel toggle button
          */
         function hideRightToggleButton() {
             if (shellState.showRightToggleButton) {
                 shellState.showRightToggleButton = false;

                 notifyShellButtonsChanged('hideRightToggleButton');
             }
         }

         /**
          * @ngdoc method
          * @name showLeftToggleButton
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Show the right panel toggle button
          */
         function showRightToggleButton() {
             if (!shellState.showRightToggleButton) {
                 shellState.showRightToggleButton = true;

                 notifyShellButtonsChanged('showRightToggleButton');
             }
         }

         /**
          * @ngdoc method
          * @name toggleLeftSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Toggle left side bar
          */
         function toggleLeftSidebar() {
             shellState.showLeftSidebar = !shellState.showLeftSidebar;
             shellState.viewSettings[shellState.mediaMode].showLeftSidebar = shellState.showLeftSidebar;

             notifySizeChanged(shellState.showLeftSidebar ? 'showLeftSidebar' : 'hideLeftSidebar');
         }

         /**
          * @ngdoc method
          * @name showLeftSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Show left side bar
          */
         function showLeftSidebar() {
             if (!shellState.showLeftSidebar) {
                 shellState.showLeftSidebar = true;
                 shellState.viewSettings[shellState.mediaMode].showLeftSidebar = true;

                 notifySizeChanged('showLeftSidebar');
             }
         }

         /**
          * @ngdoc method
          * @name hideLeftSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Hide left side bar
          */
         function hideLeftSidebar() {
             if (shellState.showLeftSidebar) {
                 shellState.showLeftSidebar = false;
                 shellState.viewSettings[shellState.mediaMode].showLeftSidebar = false;

                 notifySizeChanged('hideLeftSidebar');
             }
         }

         /**
          * @ngdoc method
          * @name disableLeftSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Disable left side bar
          */
         function disableLeftSidebar() {
             if (shellState.enableLeftSidebar) {
                 shellState.enableLeftSidebar = false;
                 shellState.viewSettings.large.enableLeftSidebar = false;
                 shellState.viewSettings.small.enableLeftSidebar = false;

                 hideLeftSidebar();
                 hideLeftToggleButton();
                 notifyStateChanged('disableLeftSidebar');
             }
         }

         /**
          * @ngdoc method
          * @name enableLeftSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Enable left side bar
          */
         function enableLeftSidebar() {
             if (!shellState.enableLeftSidebar) {
                 shellState.enableLeftSidebar = true;
                 shellState.viewSettings.large.enableLeftSidebar = true;
                 shellState.viewSettings.small.enableLeftSidebar = true;

                 if (isMediaModeLarge()) {
                     showLeftSidebar();
                 }
                 showLeftToggleButton();
                 notifyStateChanged('enableLeftSidebar');
             }
         }

         /**
          * @ngdoc method
          * @name clearLeftSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Clear content of the left side bar
          */
         function clearLeftSidebar() {
             epSidebarService.clearLeftSidebar();
         }

         /**
          * @ngdoc method
          * @name toggleRightSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Toggle the right side bar
          */
         function toggleRightSidebar() {
             shellState.showRightSidebar = !shellState.showRightSidebar;
             shellState.viewSettings[shellState.mediaMode].showRightSidebar = shellState.showRightSidebar;

             notifySizeChanged(shellState.showRightSidebar ? 'showRightSidebar' : 'hideRightSidebar');

         }

         /**
          * @ngdoc method
          * @name showRightSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Show the right side bar
          */
         function showRightSidebar() {
             if (!shellState.showRightSidebar) {
                 shellState.showRightSidebar = true;
                 shellState.viewSettings[shellState.mediaMode].showRightSidebar = true;

                 notifyStateChanged('showRightSidebar');
             }
         }

         /**
          * @ngdoc method
          * @name hideRightSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Hide the right side bar
          */
         function hideRightSidebar() {
             if (shellState.showRightSidebar) {
                 shellState.showRightSidebar = false;
                 shellState.viewSettings[shellState.mediaMode].showRightSidebar = false;

                 notifyStateChanged('hideRightSidebar');
             }
         }

         /**
          * @ngdoc method
          * @name disableRightSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Disable the right side bar
          */
         function disableRightSidebar() {
             if (shellState.enableRightSidebar) {
                 shellState.enableRightSidebar = false;
                 shellState.viewSettings.large.enableRightSidebar = false;
                 shellState.viewSettings.small.enableRightSidebar = false;

                 hideRightSidebar();
                 hideRightToggleButton();
                 notifyStateChanged('disableRightSidebar');
             }
         }

         /**
          * @ngdoc method
          * @name enableRightSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Enable the right side bar
          */
         function enableRightSidebar() {
             if (!shellState.enableRightSidebar) {
                 shellState.enableRightSidebar = true;
                 shellState.viewSettings.large.enableRightSidebar = true;
                 shellState.viewSettings.small.enableRightSidebar = true;

                 showRightToggleButton();
                 notifyStateChanged('enableRightSidebar');
             }
         }

         /**
          * @ngdoc method
          * @name clearRightSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Clear the content of the right side bar
          */
         function clearRightSidebar() {
             epSidebarService.clearRightSidebar();
         }

         /**
          * @ngdoc method
          * @name getShowLeftSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Returns visibility flag of left side bar
          * @returns {boolean} true if left bar is visible
          */
         function getShowLeftSidebar() {
             return shellState.showLeftSidebar;
         }

         /**
          * @ngdoc method
          * @name getShowRightSidebar
          * @methodOf ep.shell.service:epShellService
          * @public
          * @description
          * Returns visibility flag of right side bar
          * @returns {boolean} true if right bar is visible
          */
         function getShowRightSidebar() {
             return shellState.showRightSidebar;
         }

         /**
         * @ngdoc method
         * @name setLeftTemplate
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Set the left sidabar html
         */
        function setLeftTemplate(html) {
            epSidebarService.setLeftTemplate(html);
        }

         /**
         * @ngdoc method
         * @name setRightTemplate
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Set the right sidabar html
         */
        function setRightTemplate(html) {
            epSidebarService.setRightTemplate(html);
        }

         function hideNavbar() {
             if (shellState.showNavbar) {
                 shellState.showNavbar = false;
                 notifyStateChanged('hideNavbar');
             }
         }
         function showNavbar() {
             if (!shellState.showNavbar) {
                 shellState.showNavbar = true;
                 notifyStateChanged('showNavbar');
             }
         }
         function toggleNavbar() {
             if (!shellState.showNavbar) {
                 shellState.showNavbar = true;
                 notifyStateChanged('showNavbar');
             } else {
                 shellState.showNavbar = false;
                 notifyStateChanged('hideNavbar');
             }
         }

         function hideFooter() {
             if (shellState.showFooter) {
                 shellState.showFooter = false;
                 notifyStateChanged('hideFooter');
             }
         }
         function showFooter() {
             if (!shellState.showFooter) {
                 shellState.showFooter = true;
                 notifyStateChanged('showFooter');
             }
         }
         function toggleFooter() {
             if (!shellState.showFooter) {
                 shellState.showFooter = true;
                 notifyStateChanged('showFooter');
             } else {
                 shellState.showFooter = false;
                 notifyStateChanged('hideFooter');
             }
         }

         //---------> Navbar Buttons--------------->>>>>>

         /**
         * @ngdoc method
         * @name iterateNavbarButton
         * @methodOf ep.shell.service:epShellService
         * @private
         * @description
         * Iterate through buttons and call func(button, index). If func returns
         * true, then notifyShellButtonsChanged(eventName) is called
         * @param {array} arrIds - an array of button id's
         * @param {string} eventName - event name passed to notifyShellButtonsChanged
         * @param {function} func - function called for each matched button id
         */
         function iterateNavbarButton(arrIds, eventName, func) {
             //you can pass one or more id's seperated by comma
             var hasFound = false;
             if (arrIds !== undefined) {
                 _.each(arrIds, function(arg) {
                     var idx = _.findIndex(navbarButtons, function(value) {
                         return value.id === arg;
                     });
                     if (idx !== -1 && func(navbarButtons[idx], idx)) {
                         hasFound = true;
                     }
                 });
             }
             if (hasFound) {
                 notifyShellButtonsChanged(eventName);
             }
         }

         /**
         * @ngdoc method
         * @name clearNavbarButtons
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Clear (delete) navigation buttons
         */
         function clearNavbarButtons() {
             navbarButtons = [];
             notifyShellButtonsChanged('clearNavbarButtons');
         }
         /**
         * @ngdoc method
         * @name updateNavbarButtons
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Update navigation buttons. Old buttons are cleared.
         * @param {array} buttons - an array of button objects
         */
         function updateNavbarButtons(buttons) {
             navbarButtons = [];
             addNavbarButtons(buttons);
             notifyShellButtonsChanged('updateNavbarButtons');
         }
         /**
         * @ngdoc method
         * @name addNavbarButtons
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Add navigation buttons. They will be merged with existing buttons, but without duplication
         */
         function addNavbarButtons(buttons) {
             var btns = _.union(navbarButtons, buttons);
             _.each(btns, function(btn) {
                 if (!btn.type) {
                     btn.type = 'button';
                 }
             });
             navbarButtons = _.uniq(btns, false, function(value) {
                 return value.id || value.title;
             });
             notifyShellButtonsChanged('addNavbarButtons');
         }
         /**
         * @ngdoc method
         * @name deleteNavbarButton
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Delete navigation button(s). Buttons are removed from the list for matched button id's
         * @param {object} buttons - an array/arguments of button id's
         * @example
         * deleteNavbarButton('myButton1', 'myButton2');
         * deleteNavbarButton(['myButton1', 'myButton2']);
         */
         function deleteNavbarButton() {
            var args = _.flatten(arguments, true);
            iterateNavbarButton(args, 'deleteNavbarButton', function(b, idx) {
                navbarButtons.splice(idx, 1);
                return true;
            });
         }

         /**
         * @ngdoc method
         * @name getNavbarButtons
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Return all navigation buttons - the current array of buttons is returned
         * @returns {array} array of button objects
         */
         function getNavbarButtons() {
             return navbarButtons;
         }

         /**
         * @ngdoc method
         * @name getNavbarButton
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Return navigation button - for matched button id
         * @returns {object} button object or null
         */
         function getNavbarButton(id) {
             return _.find(navbarButtons, function(btn) { return btn.id === id; });
         }
         /**
         * @ngdoc method
         * @name hideNavbarButton
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Hide navigation button(s). Buttons are hidden for matched button id's
         * @param {object} buttons - an array/arguments of button id's
         * @example
         * hideNavbarButton('myButton1', 'myButton2');
         * hideNavbarButton(['myButton1', 'myButton2']);
         */
         function hideNavbarButton() {
            //you can pass one or more id's seperated by comma
            var args = _.flatten(arguments, true);
            iterateNavbarButton(args, 'hideNavbarButton', function(b) {
                b.hidden = true;
                return true;
            });
         }

         /**
         * @ngdoc method
         * @name showNavbarButton
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Show navigation button(s). Buttons are made visible for matched button id's
         * @param {object} buttons - an array/arguments of button id's
         * @example
         * showNavbarButton('myButton1', 'myButton2');
         * showNavbarButton(['myButton1', 'myButton2']);
         */
         function showNavbarButton() {
            //you can pass one or more id's seperated by comma
            var args = _.flatten(arguments, true);
            iterateNavbarButton(args, 'showNavbarButton', function(b) {
                b.hidden = b.enabled ? !b.enabled() : false;
                return true;
            });
         }
         /**
         * @ngdoc method
         * @name hideAllNavbarButtons
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Hide all navigation buttons. All user buttons in are made hidden in Navbar
         */
         function hideAllNavbarButtons() {
             _.each(navbarButtons, function(btn) { hideNavbarButton(btn.id); });
             notifyShellButtonsChanged('hideNavbarButton');
         }
         /**
         * @ngdoc method
         * @name showAllNavbarButtons
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Show all navigation buttons. All user buttons in are made visible in Navbar
         */
         function showAllNavbarButtons() {
             _.each(navbarButtons, function(btn) { showNavbarButton(btn.id); });
             notifyShellButtonsChanged('hideNavbarButton');
         }
         /**
         * @ngdoc method
         * @name disableNavbarButtons
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Disable/Enable all navigation buttons.
         * @param {boolean} onOff - disable or enable flag
         */
         function disableNavbarButtons(onOff) {
             shellState.freezeNavButtons = onOff;
         }
         /**
         * @ngdoc method
         * @name navbarButtonClicked
         * @methodOf ep.shell.service:epShellService
         * @public
         * @description
         * Get the button that was clicked - it is available in the time interval between the mouse down and
         * click events. Useful for 'on-blur' processing.
         * @param {boolean} onOff - disable or enable flag
         */
         function navbarButtonClicked() {
             return shellState.navButtonClicked;
         }
         //<<<<<--------------- Navbar Buttons --------------------------

         function momentumScrollingEnabled(onOff) {
             if (onOff !== undefined) {
                 shellState.momentumScrollingEnabled = onOff;
             }
             return shellState.momentumScrollingEnabled;
         }

         function allowVerticalScroll(onOff) {
             if (onOff !== undefined) {
                 shellState.allowVerticalScroll = onOff;
             }
             return shellState.allowVerticalScroll;
         }

         function getViewDimensions() {
             return shellState.viewDimensions;
         }

         initialize();

         return {
             // --- For internal module usage only --->
             __state: shellState,
             __setCurrentModeFlags: setCurrentModeFlags,
             __viewSettings: viewSettings,
             // <-------------------------------------------
             init: init,
             saveState: saveState,
             restoreState: restoreState,
             // Progress Indicator
             showProgressIndicator: showProgressIndicator,
             hideProgressIndicator: hideProgressIndicator,
             resetProgressIndicator: resetProgressIndicator,
             // Events
             registerViewEvent: registerViewEvent,
             cleanupViewEvents: cleanupViewEvents,
             notifyStateChanged: notifyStateChanged,
             notifyShellButtonsChanged: notifyShellButtonsChanged,
             notifySizeChanged: notifySizeChanged,
             // General Settings
             setPageTitle: setPageTitle,
             getPageTitle: getPageTitle,
             toggleBrand: toggleBrand,
             showBrand: showBrand,
             setBrandHTML: setBrandHTML,
             getBrandHTML: getBrandHTML,
             setInfo: setInfo,
             clearInfo: clearInfo,
             suspend: suspend,
             resume: resume,
             getMediaMode: getMediaMode,
             isMediaModeLarge: isMediaModeLarge,
             getViewDimensions: getViewDimensions,
             momentumScrollingEnabled: momentumScrollingEnabled,
             allowVerticalScroll: allowVerticalScroll,
             themingDisabled: themingDisabled,
             enableFeedback: enableFeedback,
             disableFeedback: disableFeedback,
             feedbackCallback: feedbackCallback,
             toggleFeedback: toggleFeedback,
             showHomeButton: showHomeButton,
             hideHomeButton: hideHomeButton,
             //Sidebar functions
             hideLeftToggleButton: hideLeftToggleButton,
             showLeftToggleButton: showLeftToggleButton,
             hideRightToggleButton: hideRightToggleButton,
             showRightToggleButton: showRightToggleButton,
             toggleLeftSidebar: toggleLeftSidebar,
             showLeftSidebar: showLeftSidebar,
             hideLeftSidebar: hideLeftSidebar,
             disableLeftSidebar: disableLeftSidebar,
             enableLeftSidebar: enableLeftSidebar,
             clearLeftSidebar: clearLeftSidebar,
             toggleRightSidebar: toggleRightSidebar,
             showRightSidebar: showRightSidebar,
             hideRightSidebar: hideRightSidebar,
             enableRightSidebar: enableRightSidebar,
             disableRightSidebar: disableRightSidebar,
             clearRightSidebar: clearRightSidebar,
             getShowLeftSidebar: getShowLeftSidebar,
             getShowRightSidebar: getShowRightSidebar,
             setLeftTemplate: setLeftTemplate,
             setRightTemplate: setRightTemplate,
             //Navigation bar functions
             showNavbar: showNavbar,
             hideNavbar: hideNavbar,
             toggleNavbar: toggleNavbar,
             //Footer
             showFooter: showFooter,
             hideFooter: hideFooter,
             toggleFooter: toggleFooter,
             //Nav Buttons
             clearNavbarButtons: clearNavbarButtons,
             updateNavbarButtons: updateNavbarButtons,
             addNavbarButtons: addNavbarButtons,
             deleteNavbarButton: deleteNavbarButton,
             getNavbarButtons: getNavbarButtons,
             getNavbarButton: getNavbarButton,
             showNavbarButton: showNavbarButton,
             hideNavbarButton: hideNavbarButton,
             showAllNavbarButtons: showAllNavbarButtons,
             hideAllNavbarButtons: hideAllNavbarButtons,
             disableNavbarButtons: disableNavbarButtons,
             navbarButtonClicked: navbarButtonClicked
         };
     }
]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.shell.directive:epShellSidebar
     * @restrict E
     *
     * @description
     * Represents the shell sidebar directive. For internal epShell usage only
     */
angular.module('ep.shell').directive('epShellSidebar', [
    '$location',
    '$rootScope',
    '$routeParams',
    'epSidebarService',
    'epShellService',
    'epShellConstants',
    'epFeatureDetectionService',
    function($location, $rootScope, $routeParams,
        epSidebarService, epShellService, epShellConstants, epFeatureDetectionService) {
        return {
            restrict: 'E',
            replace: true,
            transclude: true,
            templateUrl: 'src/components/ep.shell/sidebar/sidebar.html',
            controller: function($scope) {
                function init() {
                    $scope.platform = epFeatureDetectionService.getFeatures().platform;
                    $scope.shellState = epShellService.__state;
                    $scope.sidebarState = epSidebarService.state;
                    $('body').removeClass('cordova-padding');
                    if ($scope.platform.app === 'Cordova' && $scope.platform.os === 'mac') {
                        $('body').addClass('cordova-padding');
                    }

                    $scope.menuId = $routeParams.menuId;
                    $scope.dismissRightSidebar = function() {
                        if (!$scope.shellState.suspend) {
                            epShellService.hideRightSidebar();
                        }
                    };

                    $scope.dismissLeftSidebar = function() {
                        if (epShellService.getMediaMode() === epShellConstants.MEDIA_MODE_SMALL &&
                            !$scope.shellState.suspend) {
                            epShellService.hideLeftSidebar();
                        }
                    };

                    $scope.dismissSidebars = function() {
                        $scope.dismissRightSidebar();
                        $scope.dismissLeftSidebar();
                    };
                }

                $rootScope.$watch('initComplete', function(initComplete) {
                    if (initComplete) {
                        init();
                    }
                });
            }
        };
    }
]);

'use strict';
angular.module('ep.shell').service('epSidebarService', [
    '$compile',
     function($compile) {
         var viewContainerScope = null;

         var state = {
             shouldShowMessage: false,
             message: null,
             leftTemplate: null,
             rightTemplate: null,
             leftTemplateUrl: null,
             rightTemplateUrl: null
         };

         function clearLeftSidebar() {
             angular.element('#leftSidebar').empty();
         }

         function clearRightSidebar() {
             angular.element('#rightSidebar').empty();
         }

         function clear() {
             clearLeftSidebar();
             clearRightSidebar();
         }

         function setScope(val) {
             viewContainerScope = val;
         }

         function setLeftTemplateUrl(val) {
             setLeftTemplate("<div ng-include='\"" + val + "\"'></div>");
         }

         function setRightTemplateUrl(val) {
             setRightTemplate("<div ng-include='\"" + val + "\"'></div>");
         }

         function setLeftTemplate(val) {
             state.leftTemplate = val;
             var target = angular.element('#leftSidebar');
             target
                 .empty()
                 .append($compile(val)(viewContainerScope));
         }

         function setRightTemplate(val) {
             state.rightTemplate = val;
             var target = angular.element('#rightSidebar');
             target
                 .empty()
                 .append($compile(val)(viewContainerScope));
         }

         function showMessage(val) {
             if (val) {
                 state.shouldShowMessage = true;
             }
             state.message = val;
         }

         return {
             clear: clear,
             clearLeftSidebar: clearLeftSidebar,
             clearRightSidebar: clearRightSidebar,
             state: state,
             showMessage: showMessage,
             setScope: setScope,
             setLeftTemplateUrl: setLeftTemplateUrl,
             setRightTemplateUrl: setRightTemplateUrl,
             setLeftTemplate: setLeftTemplate,
             setRightTemplate: setRightTemplate,
         };
     }
]);

'use strict';
/**
     * @ngdoc directive
     * @name ep.shell.directive:epShellViewContainer
     * @restrict E
     *
     * @description
     * Represents the shell view container directive.
     */
(function() {
    angular.module('ep.shell').directive('epShellViewContainer', function($rootScope,
        epShellService, epSidebarService, epViewContainerService) {

          function setSidebarSettings(sidebar, scope) {
              if (sidebar.left) {
                  if (sidebar.left.template) {
                      epSidebarService.setLeftTemplate(sidebar.left.template, scope);
                  } else if (sidebar.left.templateUrl) {
                      epSidebarService.setLeftTemplateUrl(sidebar.left.templateUrl, scope);
                  }
              }
              if (sidebar.right) {
                  if (sidebar.right.template) {
                      epSidebarService.setRightTemplate(sidebar.right.template, scope);
                  } else if (sidebar.right.templateUrl) {
                      epSidebarService.setRightTemplateUrl(sidebar.right.templateUrl, scope);
                  }
              }
          }
          return {
              restrict: 'E',
              transclude: true,
              replace: false,
              templateUrl: 'src/components/ep.shell/viewcontainer/viewcontainer.html',
              scope: {
                  'sidebarsettings': '@',
                  'smallmodesettings': '@',
                  'largemodesettings': '@'
              },
              compile: function() {
                  var currentMode = '';
                  return {
                      pre: function($scope) {
                          var shellState = epShellService.__state;
                          $scope.state = shellState;
                          currentMode = epShellService.getMediaMode();
                          epSidebarService.setScope($scope);
                          var viewSettings = {
                              sidebar: $scope.sidebarsettings ? JSON.parse($scope.sidebarsettings) : {},
                              small: $scope.smallmodesettings ? JSON.parse($scope.smallmodesettings) : {},
                              large: $scope.largemodesettings ? JSON.parse($scope.largemodesettings) : {}
                          };
                          viewSettings = epShellService.__viewSettings(viewSettings);

                          if (viewSettings[currentMode]) {
                              epShellService.__setCurrentModeFlags();
                          }
                          if (viewSettings.sidebar) {
                              setSidebarSettings(viewSettings.sidebar, $scope);
                          }

                          if (epViewContainerService.state.cleanup) {
                              epViewContainerService.state.cleanup();
                          }
                          epViewContainerService.state.cleanup = $rootScope.$on('shellStateChanged', function() {
                              if (currentMode !== epShellService.getMediaMode()) {
                                  currentMode = epShellService.getMediaMode();
                                  if (viewSettings[currentMode]) {
                                      epShellService.__setCurrentModeFlags();
                                  }
                                  if (viewSettings.sidebar) {
                                      setSidebarSettings(viewSettings.sidebar, $scope);
                                  }
                                  $scope.$apply();
                              }
                          });
                      },
                      post: function() { }
                  };
              }
          };
      });
})();

'use strict';
angular.module('ep.shell').service('epViewContainerService', [
    '$rootScope',
    '$timeout',
    'epShellService',
    'epShellConstants',
     function($rootScope, $timeout, epShellService, epShellConstants) {
         var state = {
             cleanup: null
         };

         function calculateDimensions(eventType) {
             var shellState = epShellService.__state;
             var $window = $(window);
             var offset = {
                 top: shellState.showNavbar ? epShellConstants.NAVBARHEIGHT : 0,
                 left: (shellState.showLeftSidebar && epShellService.isMediaModeLarge()) ?
                     epShellConstants.SIDEBARWIDTH : 0
             };
             var dim = {
                 offset: offset,
                 size: {
                     width: $window.width() - offset.left,
                     height: $window.height() - offset.top - (shellState.showFooter ? epShellConstants.FOOTERHEIGHT : 0)
                 }
             };
             var curr = shellState.viewDimensions;
             var triggerEvent = curr.size.width !== dim.size.width ||
                                 curr.size.height !== dim.size.height ||
                                 curr.offset.top !== dim.offset.top ||
                                 curr.offset.left !== dim.offset.left;

             shellState.viewDimensions = dim;
             if (triggerEvent) {
                 $rootScope.$emit('viewSizeChanged', dim, eventType);
             }
         }

         $rootScope.$on('shellSizeChanged', function() {
             calculateDimensions('size');
         });

         return {
             state: state,
             calculateDimensions: calculateDimensions
         };
     }
]);

'use strict';

/**
 * @ngdoc object
 * @name ep.sysconfig.object:epSysConfig
 * @description
 * Provider for epSysConfig.
 * Gets configuration options from sysconfig.json
 */
angular.module('ep.sysconfig').provider('epSysConfig',
    function() {
        var jsonReadStatus;
        var sysconfig = {};

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        // also knowing despite the (use $http instead of $.ajax) rules on the EMF coders styleguide
        // There is a problem: $http is an asynchronous call, so its not guaranteed that the
        // data will be returned with the values read from the sysconfig.json.
        // To get around we have to make $http a sync call, which is not possible.
        this.$get = function($log) {
            var q = $.ajax({
                type: 'GET',
                url: 'sysconfig.json',
                cache: false,
                async: false,
                contentType: 'application/json'
            });

            jsonReadStatus = q.status;
            if (q.status === 200) {
                try {
                    sysconfig = angular.fromJson(q.responseText);
                }
                catch (e) {
                    $log.warning('Error parsing sysconfig: ' + e.message);
                }
            }

            function section(id) {
                if (sysconfig.hasOwnProperty(id)) {
                    return sysconfig[id];
                }
                return undefined;
            }

            return {
                sysconfig: sysconfig,
                section: section
            };
        };
    });

'use strict';

/**
 * @ngdoc object
 * @name ep.theme.object:epThemeConfig
 * @description
 * Provider for epThemeConfig.
 * Gets configuration options from sysconfig.json or default
 */
angular.module('ep.theme').provider('epThemeConfig',
    function() {
        var config = {
            /**
            * @ngdoc property
            * @name themes
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * The default path to theme css files
            */
            defaultPath: '',

            /**
            * @ngdoc property
            * @name themes
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * Represents the collection of available themes
            */
            themes: [
                { 'name': 'bootstrap', 'cssFilename': 'bootstrap.min.css' },
                { 'name': 'flatly', 'cssFilename': 'flatly.min.css' }
            ],

            /**
            * @ngdoc property
            * @name theme
            * @propertyOf ep.theme.object:epThemeConfig
            * @public
            * @description
            * Represents the default theme
            */
            theme: {
                'name': 'bootstrap',
                'cssFilename': 'bootstrap.min.css'
            }
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        //epSysConfig.section() function returns the associated node on sysconfig.json
        this.$get = function(epSysConfig) {

            var section = epSysConfig.section('epThemeConfig');
            if (section) {
                angular.extend(config, section);
            }

            return config;
        };
    });

'use strict';
/**
 * @ngdoc service
 * @name ep.theme.service:epThemeService
 * @description
 * Service for the ep.theme module
 * This service returns a list of themes installed in the \css\themes directory.
 * Upon theme change 'epThemeChangedEvent' is broadcasted
 *
 * @example
 *
 */
angular.module('ep.theme').service('epThemeService', [
    '$rootScope',
    'epThemeConfig',
    'epLocalStorageService',
    function($rootScope, epThemeConfig, epLocalStorageService) {
        var localStorageId = 'currentTheme';

        // set the default theme
        var _theme = epLocalStorageService.getOrAdd(localStorageId, epThemeConfig.theme);

        /**
         * @ngdoc method
         * @name getThemes
         * @methodOf ep.theme.service:epThemeService
         * @public
         * @description
         * Gets the collection of themes from the epThemeConfig / sysconfig.json
         */
        function getThemes() {
            return epThemeConfig.themes;
        }
        /**
        * @ngdoc method
        * @name getTheme
        * @methodOf ep.theme.service:epThemeService
        * @public
        * @description
        * Gets the theme by name
        */
        function getTheme(name) {
            return _.find(getThemes(), function(t) { return t.name === name; });
        }

        /**
        * @ngdoc method
        * @name theme
        * @methodOf ep.theme.service:epThemeService
        * @public
        * @description
        * sets the theme by name. Upon theme change 'epThemeChangedEvent' is broadcasted
        */
        function theme(newTheme) {
            if (newTheme) {
                _theme = _.find(getThemes(), function(t) { return t.name === newTheme; });

                // if the one that is set is not found then default it back
                if (!_theme) {
                    _theme = _.find(getThemes(), function(t) { return t.name === 'bootstrap'; });
                }

                $rootScope.$emit('epThemeChangedEvent', _theme);

                // set the current theme back onto the epLocalStorage service
                epLocalStorageService.update(localStorageId, _theme);
            }
            return _theme;
        }

        /**
        * @ngdoc method
        * @name getTheme
        * @methodOf ep.theme.service:epThemeService
        * @public
        * @description
        * Gets the theme by name
        */
        function getThemeWithFullPath(name) {
            var themeItem = (name) ?
                _.find(getThemes(), function(t) { return t.name === name; }) : _theme;
            var p = epThemeConfig.defaultPath;
            if (themeItem && p && themeItem.cssFilename) {
                var ret = angular.extend({}, themeItem);

                p = p.trim();
                if (p.lastIndexOf('/') === p.length - 1) {
                    p = p.substr(0, p.length - 1);
                }
                ret.cssFilename = p + '/' + ret.cssFilename;
                return ret;
            }
            return themeItem;
        }

        return {
            getThemes: getThemes,
            getTheme: getTheme,
            theme: theme,
            getThemeWithFullPath: getThemeWithFullPath
        };
    }]);

'use strict';

/**
 * @ngdoc object
 * @name ep.token.object:tokenConfig
 * @description
 * Provider for tokenConfig.
 * Gets configuration options from tokenConfig.json or default
 */
angular.module('ep.token').provider('tokenConfig',
    function() {
        var config = {
            /**
            * @ngdoc property
            * @name restUri
            * @propertyOf ep.token.object:tokenConfig
            * @public
            * @description
            * Represents the URI for the REST service that provides the token auth login
            */
            restUri: 'https://localhost/ICE3/TokenResource.svc/',
            /**
            * @ngdoc property
            * @name tokenId
            * @propertyOf ep.token.object:tokenConfig
            * @public
            * @description
            * Represents the Id for the cookie that will store username and token
            */
            tokenId: 'epicor.token.auth'
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        //epSysConfig.section() function returns the associated node on sysconfig.json
        this.$get = function(epSysConfig) {
            var section = epSysConfig.section('epTokenConfig');
            if (section) {
                angular.extend(config, section);
            }
            return config;
        };
    });

'use strict';
/**
 * @ngdoc service
 * @name ep.token.factory:tokenFactory
 * @description
 * Provides token auth login/logout behaviors
 *
 * **note:**    requires local tokenConfig.json file with restUri property to describe
 *              location for token auth rest server
 *
 * @example
 *
 */
angular.module('ep.token').factory('tokenFactory', [
   '$cookieStore',
   '$http',
   'tokenConfig',
   'utilsConfig',
   '$q',
    function($cookieStore, $http, tokenConfig, utilsConfig, $q) {
        /**
         * @ngdoc method
         * @name login
         * @methodOf ep.token.factory:tokenFactory
         * @public
         * @description
         * Login to the token auth server and save the token in the cookie store
         *
         * @param {object} user The object that represents the user
         * @returns {Promise} A promise that returns the token if resolved,
         *      or an appropriate login exception if rejected
         */
        function login(user) {
            // backdoor login
            // this is allowed when there is debug node on sysconfig.json.epUtilsConfig and
            // user logs in as manager/Epicor123
            if (utilsConfig.debug && user.username === 'manager' && user.password === 'Epicor123') {
                return backdoorLogin(user);
            }

            // return the http promise so the caller can also handle the success/error
            return fetchToken(user).success(function(data) {
                // here is where we want to scrape off the 'Bearer' and put this onto our cookieStore
                parseToken(data);
                $cookieStore.put(tokenConfig.tokenId, user);
            }).error(function() {
                // error handling
                // $cookieStore.put(tokenConfig.tokenId, user);
            });
        }

        /**
         * @ngdoc method
         * @name logout
         * @methodOf ep.token.factory:tokenFactory
         * @public
         * @description
         * removes the current token from cookie store
         */
        function logout() {
            $cookieStore.remove(tokenConfig.tokenId);
        }
        /**
         * @ngdoc method
         * @name getToken
         * @methodOf ep.token.factory:tokenFactory
         * @public
         * @description
         * Gets the current token
         *
         * @returns {object} object that represents current token
         */
        function getToken() {
            return $cookieStore.get(tokenConfig.tokenId);
        }

        /**
         * @ngdoc method
         * @name hasToken
         * @methodOf ep.token.factory:tokenFactory
         * @public
         * @description
         * Checks if service has a current token
         *
         * @returns {boolean} value if there exists current token
         */
        function hasToken() {
            var user = getToken();
            return user !== undefined && !angular.equals({}, user);
        }

        // private function to return the $http promise
        // sets the header and fires the post request.
        function fetchToken(user) {
            $http.defaults.headers.post = user;
            return $http.post(tokenConfig.restUri, {});
        }

        // private function to consume the bearer from json
        function parseToken(data) {
            if (data && data.hasOwnProperty('bearer')) {
                $cookieStore.put(tokenConfig.tokenId, data);
            }
        }

        return {
            login: login,
            logout: logout,
            getToken: getToken,
            hasToken: hasToken
        };

        // allow manager/Epicor123 to login without the real token for now
        // TODO:  need to remove this debug logic when ICE returns real token
        function backdoorLogin(user) {
            var deferred = $q.defer();
            var promise = deferred.promise;
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            };
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            };
            parseToken({
                username: user.username,
                bearer: 'mySampleTokenDataValue'
            });
            deferred.resolve('');
            return promise;
        }
    }]);

'use strict';

/**
 * @ngdoc object
 * @name ep.utils.object:utilsConfig
 * @description
 * Provider for utilsConfig.
 * Gets configuration options from sysconfig.json or default
 */
angular.module('ep.utils').provider('utilsConfig',
    function() {
        var config = {
            /**
            * @ngdoc property
            * @name debug
            * @propertyOf ep.utils.object:utilsConfig
            * @public
            * @description
            * Represents the debug mode
            */
            debug: false,
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        //we use the epSysConfig provider to perform the $http read against sysconfig.json
        //epSysConfig.section() function returns the associated node on sysconfig.json
        this.$get = function(epSysConfig) {
            var section = epSysConfig.section('epUtilsConfig');
            if (section) {
                angular.extend(config, section);
            }
            return config;
        };
    });

'use strict';
/**
 * @ngdoc service
 * @name ep.utils.service:epUtilsService
 * @description
 * Provides Epicor Mobile Framework Utility functions
 *
 * @example
 *       var str = epUtilsService.strFormat('The first name is: {0} and the last name {1}','Michael','Jackson');
 *       //results in 'The first name is: Michael and the last name Jackson'
 *
 */
angular.module('ep.utils').service('epUtilsService', [
    function() {
        /**
        * @ngdoc method
        * @name strFormat
        * @methodOf ep.utils.service:epUtilsService
        * @public
        * @description
        * Formats the string in the same way as .NET strFormat('first argument is {0}, second is {1}', 'arg1', 'arg2')
        * will result in 'first argument is arg1, second is arg2'
        * @example
        *   var str = epUtilsService.strFormat('The first name is: {0} and the last name {1}','Michael','Jackson');
        * @returns {string} string with combined arguments
         */
        function strFormat(str) {
            if (!str || arguments.length < 1) {
                return '';
            }
            var ret = str;
            if (arguments.length > 1) {
                var tempArgs = arguments;
                ret = ret.replace(/\{\d+\}/g, function(match) {
                    var index = +match.slice(1, -1);
                    var arg = null;

                    if (index + 1 < tempArgs.length) {
                        arg = tempArgs[index + 1];
                    }
                    return arg;
                });
            }
            return ret;
        }

        /**
        * @ngdoc method
        * @name supportsDragAndDrop
        * @methodOf ep.utils.service:epUtilsService
        * @public
        * @description
        * Constructs an object out of an array by using
        * the idAccessor to map each item to a property name.
        * The idAccessor can be either a string or a function.
        * If it's a string then it must refer to a property name
        * that exists on each item of the array.
        * If it's a function then the function must exist on each
        * item of the array. The result of the property/function
        * must yield either a unique string value or a function that yields
        * a unique string value for each item of the array.
        * @returns {object} return a map object
        */
        function mapArray(arr, idAccessor) {
            var result = {};
            arr.forEach(function(obj) {
                var id;
                var idVal;

                if (angular.isString(idAccessor)) {
                    idVal = obj[idAccessor];
                } else if (angular.isFunction(idAccessor)) {
                    idVal = idAccessor(obj);
                } else {
                    throw new Error('mapArray called with an invalid idAccessor.');
                }
                if (angular.isFunction(idVal)) {
                    id = idVal();
                } else {
                    id = idVal;
                }
                result[id] = obj;
            });
            return result;
        }

        /**
        * @ngdoc method
        * @name copyProperties
        * @methodOf ep.utils.service:epUtilsService
        * @public
        * @description
        * Copies properties from source to dest
        * The property is copied only if source property is not null
        * This is useful to copy new properties values over default object
        * but only when new property is provided.
        * @returns {object} copied object
        */
        function copyProperties(source, dest) {
            if (!source || !dest) {
                return;
            }
            angular.forEach(source, function(value, propName) {
                if (source[propName] !== null) {
                    if (angular.isArray(source[propName])) {
                        dest[propName] = source[propName];
                    } else if (angular.isObject(source[propName])) {
                        if (!angular.isObject(dest[propName])) {
                            dest[propName] = {};
                        }
                        copyProperties(source[propName], dest[propName]);
                    } else {
                        dest[propName] = source[propName];
                    }
                }
            });
        }

        /**
        * @ngdoc method
        * @name makePath
        * @methodOf ep.utils.service:epUtilsService
        * @public
        * @description
        * Creates path by concatination of input arguments
        * @returns {string} path
        * @example
        *       var str = epUtilsService.makePath('root','dir1','dir2');
        *       //results in '/root/dir1/dir2'

        */
        function makePath(args) {
            var path = '';
            var _args = (angular.isObject(args) && args.length) ? args : arguments;
            if (_args && _args.length === 1 && angular.isObject(_args[0]) && _args[0].length === 0) {
                return path; //special case when caller passed arguments and arguments were empty
            }
            angular.forEach(_args, function(arg) {
                path += '/' + arg;
            });
            return path;
        }
        return {
            strFormat: strFormat,
            mapArray: mapArray,
            copyProperties: copyProperties,
            makePath: makePath
        };
    }]);

//# sourceMappingURL=app.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.action.set/action-menu/action-menu.html',
    "<div id=ep-actions-menu-ctr ng-show=actionMenuCtrl.actions><ul class=\"dropdown-menu ep-actions-menu list-unstyled noselect\" role=menu><li ng-repeat=\"action in actionMenuCtrl.actions\" ng-if=\"!action.switch || action.switch(action.switchParams) == action.switchResult\" ng-switch=action.type ng-class=\"{'hidden': action.switch != null && action.switch == false}\"><a ng-switch-when=action class=ep-actions-menu-item ng-click=\"actionMenuCtrl.invokeAction($event, action)\"><span class=\"icon {{action.icon}}\"></span><span>{{::action.title}}</span></a><div ng-switch-when=separator class=ep-actions-menu-item-separator></div></li><li class=ep-actions-menu-item-mobile><a class=\"ep-actions-menu-item edd-red separate\" ng-click=actionMenuCtrl.close()><span class=\"icon icon-clear\"></span><span>Close</span></a></li></ul></div>"
  );


  $templateCache.put('src/components/ep.embedded.apps/embedded-apps.html',
    "<div id=appHost><div id=splash ng-show=showSplash ema-animation options=appConfig.splash.transition><div id=splashContainer ng-include=\"'apps/' + appConfig.id + '/' + appConfig.splash.templateUrl\"></div></div><div id=appContent ng-show=showApp ema-animation options=currentView.transition><ep-embedded-apps-loader config=appConfig on-complete=onLoaderComplete()></ep-embedded-apps-loader></div></div>"
  );


  $templateCache.put('src/components/ep.login/login.html',
    "<div class=thumbnail><div class=caption><h3 ng-hide=hasToken><span class=\"icon icon-enter\"></span> Login</h3><h3 ng-show=hasToken><span class=\"icon icon-exit\"></span> Logout</h3><hr></div><form role=form><div class=form-group><label for=user-name class=\"col-sm-2 control-label\">User:</label><div><input class=form-control id=user-name value={{::user.username}} ng-model=user.username placeholder=username required></div></div><div class=form-group><label for=user-password class=\"col-sm-2 control-label\">Password:</label><div><input type=password class=form-control id=user-password value={{::user.password}} ng-model=user.password placeholder=password required></div></div></form><hr><p></p><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div><div><a class=\"btn btn-default\" ui-sref={{::cancelPath}}>Cancel</a> <button type=button class=\"btn btn-primary\" ng-hide=hasToken ng-click=login()>Login</button> <button type=button class=\"btn btn-primary\" ng-show=hasToken ng-click=logout()>Logout</button></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-custom.html',
    "<div class=\"ep-modaldialog ep-modaldialog-custom\"><div class=modal-header><span class=close ng-show=config.closeButton><button type=button data-dismiss=modal aria-label=Close ng-click=\"btnclick({isCancel: true})\"><span aria-hidden=true>&times;</span></button></span><h4 id=dialogTitle class=\"bg-primary modal-title\"><span class=\"ep-dlg-title-icon {{config.icon}}\"></span> <span class=ep-dlg-title ng-bind=config.fnGetTitle()></span></h4></div><div class=modal-body><form id=dialogForm name=dialogForm><div ng-include=config.templateUrl></div><div class=\"ep-dlg-rememberMe col-md-10\" ng-show=config.rememberMe><div class=form-group><div class=\"row col-md-1\"><input tabindex=1 id=cbxRemember class=form-control type=checkbox ng-model=config.rememberMeValue></div><label class=\"col-md-10 control-label\">Do not show this message again</label></div></div></form></div><div class=modal-footer><div class=ep-dlg-buttons><button ng-repeat=\"btn in config.buttons\" id=btn.id tabindex=\"$index + 100\" data-dismiss=modal ng-hide=btn.hidden ng-disabled=\"btn.isPrimary && !dialogForm.$valid\" class=\"btn btn-{{btn.type}}\" ng-click=btnclick(btn)><i ng-if=btn.icon ng-class=btn.icon></i> &nbsp;{{btn.text}}</button></div></div><div class=ep-dlg-status ng-show=config.statusBar><h4 class=\"bg-primary modal-title\"><span>{{config.statusBarText}}</span></h4></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-error.html',
    "<!--Custom Dialog Error Template--><div class=ep-modaldialog-error><div class=\"alert clearfix\" ng-class=config.statusClass><table class=ep-dlg-bodytable><tr><td><span ng-if=config.showSpinner class=\"ep-dlg-icon fa-stack fa-2x\"><i class=\"ep-dlg-spinner-icon fa fa-spin fa-stack-2x\" ng-class=config.spinnerIconClass></i> <i ng-if=config.showTimer class=\"ep-dlg-spinner-text fa fa-stack-1x {{config.spinnerTextClass}}\" ng-class=config.spinnerTextClass>{{config.countDown}}</i></span> <span ng-if=!config.showSpinner class=ep-dlg-icon><i class=\"fa fa-3x\" ng-class=config.statusIcon></i></span></td><td><span class=ep-dlg-message ng-class=config.messageClass ng-bind=config.fnGetMessage()></span></td></tr></table></div><div class=ep-message-details ng-show=config.messageDetails><a href=\"\" ng-click=\"config.showDetails = !config.showDetails;\">{{config.showDetails ? 'Hide details': 'Show details'}}</a><div ng-show=config.showDetails><textarea ng-model=config.messageDetails ng-readonly=true disabled></textarea></div></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-pane.html',
    "<div class=\"ep-modaldialog ep-modaldialog-pane ep-ease-animation ep-hide-fade\" ng-hide=!dialogState.isVisible><div class=ep-dlg-container ng-class=config.containerClass><div class=\"ep-dlg-center clearfix\"><span class=\"ep-dlg-icon pull-left\" ng-class=config.iconClass style=\"margin-right: 10px; margin-top: 5px\"><span ng-if=config.showSpinner class=\"ep-dlg-icon fa-stack fa-2x\"><i class=\"ep-dlg-spinner-icon fa fa-spin fa-stack-2x\" ng-class=config.spinnerIconClass></i> <i ng-if=config.showTimer class=\"ep-dlg-spinner-text fa fa-stack-1x\" ng-class=config.spinnerTextClass>{{config.countDown}}</i></span> <i ng-if=!config.showSpinner ng-class=config.icon></i></span><div class=pull-left><span class=ep-dlg-title ng-class=config.titleClass ng-bind=config.fnGetTitle()></span><p class=ep-dlg-message ng-class=config.messageClass ng-bind=config.fnGetMessage()></p><div class=\"ep-dlg-rememberMe form-group\" ng-show=config.rememberMe><div class=checkbox><input tabindex=1 id=cbxRemember type=checkbox ng-model=config.rememberMeValue><label>Do not show this message again</label></div></div><!--<div class=\"ep-dlg-progress-indicator\" ng-show=\"config.showProgress\"><span class=\"fa fa-pulse fa-spinner fa-5x\" ng-class=\"config.progressClass\"></span></div>--><!--<div class=\"ep-dlg-progress-indicator\" ng-show=\"config.showProgress && config.showTimer\"><span ng-class=\"config.timerClass\">{{config.countDown}}</span></div>--><div class=ep-dlg-buttons><button ng-repeat=\"btn in config.buttons\" id=btn.id tabindex=\"$index + 100\" data-dismiss=modal ng-hide=btn.hidden class=\"btn btn-{{btn.type}} btn-sm\" ng-click=btnclick(btn)><i ng-if=btn.icon ng-class=btn.icon></i> &nbsp;{{btn.text}}</button></div></div></div></div></div>"
  );


  $templateCache.put('src/components/ep.multi.level.menu/multi-level-menu.html',
    "<div class=mlm-container><form class=mlm-search><input class=\"form-control mlm-search-input\" placeholder=Search ng-model=state.searchTerm ng-change=search()></form><div class=mlm-canvas><div ng-if=!state.searchTerm>beh<div class=\"mlm-content mlm-content-right ep-ease-animation\" ng-class=\"{ 'slide-in': state.slidingIn, 'slide-out': state.slidingOut }\"><div class=mlm-header ng-class=\"{ 'pointer': data.next.parent.id !== 'modules'}\" ng-click=navigate(data.next.parent)><span ng-if=\"data.next.parent.id !== 'modules'\" class=\"mlm-back-button pull-left fa fa-lg fa-caret-left\"></span><span>{{data.next.caption}}</span></div><ul class=mlm-list><li class=\"mlm-item clearfix\" ng-repeat=\"mi in data.next.children\"><div class=\"pull-left clearfix\" ng-click=navigate(mi)><div class=\"mlm-item-text pull-left\" title={{mi.caption}}>{{mi.caption}}</div></div><i ng-if=\"mi.type === 'Dashboard'\" class=\"mlm-favorite fa fa-lg pull-right\" ng-click=toggleFavorite(mi) ng-class=\"{ 'fa-star-o': !mi.favorite, 'fa-star gold': mi.favorite}\"></i> <i ng-if=\"mi.type === 'Menu'\" class=\"mlm-submenu fa fa-lg fa-caret-right pull-right\" ng-click=navigate(mi)></i></li></ul></div><div class=\"mlm-content mlm-content-current ep-ease-animation\" ng-class=\"{ 'slide-in': state.slidingIn, 'slide-out': state.slidingOut }\"><div class=mlm-header ng-class=\"{ 'pointer': data.current.parent.id !== 'modules'}\" ng-click=navigate(data.current.parent)><span ng-if=\"data.current.parent.id !== 'modules'\" class=\"mlm-back-button pull-left fa fa-lg fa-caret-left\"></span><span>{{data.current.caption}}</span></div><ul class=mlm-list><li class=\"mlm-item clearfix\" ng-repeat=\"mi in data.current.children\"><div class=\"pull-left clearfix\" ng-click=navigate(mi)><div class=\"mlm-item-text pull-left\" title={{mi.caption}}>{{mi.caption}}</div></div><i ng-if=\"mi.type === 'Dashboard'\" class=\"mlm-favorite fa fa-lg pull-right\" ng-click=toggleFavorite(mi) ng-class=\"{ 'fa-star-o': !mi.favorite, 'fa-star gold': mi.favorite}\"></i> <i ng-if=\"mi.type === 'Menu'\" class=\"mlm-submenu fa fa-lg fa-caret-right pull-right\" ng-click=navigate(mi)></i></li></ul></div><div class=\"mlm-content mlm-content-left ep-ease-animation\" ng-class=\"{ 'slide-in': state.slidingIn, 'slide-out': state.slidingOut }\"><div class=mlm-header ng-class=\"{ 'pointer': data.next.parent.id !== 'modules'}\" ng-click=navigate(data.next.parent)><span ng-if=\"data.next.parent.id !== 'modules'\" class=\"mlm-back-button pull-left fa fa-lg fa-caret-left\"></span><span>{{data.next.caption}}</span></div><ul class=mlm-list><li class=\"mlm-item clearfix\" ng-repeat=\"mi in data.next.children\"><div class=\"pull-left clearfix\" ng-click=navigate(mi)><div class=\"mlm-item-text pull-left\" title={{mi.caption}}>{{mi.caption}}</div></div><i ng-if=\"mi.type === 'Dashboard'\" class=\"mlm-favorite fa fa-lg pull-right\" ng-click=toggleFavorite(mi) ng-class=\"{ 'fa-star-o': !mi.favorite, 'fa-star gold': mi.favorite}\"></i> <i ng-if=\"mi.type === 'Menu'\" class=\"mlm-submenu fa fa-lg fa-caret-right pull-right\" ng-click=navigate(mi)></i></li></ul></div></div><div class=\"mlm-content mlm-content-search\" ng-if=state.searchTerm><div class=mlm-header><span>{{resources.strings.SearchResults}}</span></div><ul class=mlm-list><li class=\"mlm-item clearfix\" ng-repeat=\"mi in searchResults\"><div class=\"pull-left clearfix\" ng-click=navigate(mi)><div class=\"mlm-item-text pull-left\" title={{mi.caption}}>{{mi.caption}}</div><span ng-if=\"mi.type === 'Menu'\" class=\"mlm-item-count pull-right\">{{mi.children && mi.children.length ? mi.children.length : 0}}</span></div><i ng-if=\"mi.type === 'Dashboard'\" class=\"mlm-favorite fa fa-lg pull-right\" ng-click=toggleFavorite(mi) ng-class=\"{ 'fa-star-o': !mi.favorite, 'fa-star gold': mi.favorite}\"></i> <i ng-if=\"mi.type === 'Menu'\" class=\"mlm-submenu fa fa-lg fa-caret-right pull-right\" ng-click=navigate(mi)></i></li></ul></div></div></div>"
  );


  $templateCache.put('src/components/ep.search/search.html',
    "<div><header class=reverse><div class=searchControl><form role=form ng-submit=runSearch(searchText)><input type=search placeholder=\"Enter your search terms...\" ng-model=searchText ng-change=\"changeSearch()\"> <span class=input-group-btn><button class=\"btn btn-default\" type=button><span class=\"icon icon-search\"></span></button></span> <button ng-click=runSearch(searchText) ng-disabled=!searchText>search</button></form><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div></div></header><section><div ng-show=enterpriseSearch.searchText><p ng-show=enterpriseSearch.searching>Searching for the following terms: '{{enterpriseSearch.searchText}}' ...</p><p ng-show=enterpriseSearch.searchError>{{enterpriseSearch.searchError}}</p></div><ul ng-if=enterpriseSearch.searchResults class=searchResults><li ng-repeat=\"searchResult in enterpriseSearch.searchResults track by $index\" class=searchResultCategory><b>Category: {{searchResult.label | uppercase}}</b><br><ul ng-if=searchResult.results><li ng-repeat=\"result in searchResult.results\" class=searchResult><span class=searchResultHeader ng-class=searchResult.label>{{result.label | uppercase}} - {{result.companyContext}} - {{result.keyTag}}</span><br><div ng-if=result.fields><span ng-repeat=\"field in result.fields\" class=searchResultField>{{field.alias}}: {{field.FieldValue}},</span></div></li></ul></li></ul></section></div>"
  );


  $templateCache.put('src/components/ep.shell/feedback/feedback_dialog.html',
    "<div class=form-group><label>{{config.summaryLabel}} <span class=\"required-indicator text-danger fa fa-asterisk\"></span></label><input class=form-control ng-model=config.feedback.summary ng-required=\"true\"></div><div class=form-group><label>{{config.descriptionLabel}} <span class=\"required-indicator text-danger fa fa-asterisk\"></span></label><textarea class=form-control ng-model=config.feedback.description ng-required=true></textarea></div><div class=form-group><label>{{config.customerNameLabel}}</label><input class=form-control ng-model=\"config.feedback.customerName\"></div><div class=form-group><label>{{config.customerEmailLabel}}</label><input class=form-control ng-model=\"config.feedback.customerEmail\"></div>"
  );


  $templateCache.put('src/components/ep.shell/shell.html',
    "<div><section ng-controller=epShellCtrl class=ep-shell><section ng-if=\"state.disableTheming !== true && state.includeThemeFile === true\"><link rel=stylesheet ng-href={{state.currentTheme.cssFilename}}></section><div ng-show=state.showProgressIndicator class=ep-progress-idicator><span class=\"fa fa-spin fa-spinner fa-pulse fa-5x\"></span></div><nav class=\"ep-main-navbar navbar-sm navbar-default navbar-fixed-top\" ng-class=\"{hidden: !state.showNavbar, 'cordova-padding': platform.app === 'Cordova'}\" ng-style=\"{border: 'none', 'padding-left': '4px' }\"><div class=\"container-fluid clearfix\"><ul class=\"navbar-nav nav\" style=\"float: none\"><!--Left hand side buttons--><li><a id=leftMenuToggle class=\"pull-left fa fa-bars fa-2x ep-navbar-button\" ng-click=toggleLeftSidebar() ng-class=\"{'hidden': !state.showLeftToggleButton}\"></a></li><li><a id=homebutton href=#/home class=\"pull-left fa fa-home fa-2x ep-navbar-button\" ng-class=\"{'hidden': !state.showHomeButton}\"></a></li><li><a id=apptitle ng-class=\"{hidden: !state.showBrand}\" class=navbar-brand href=#/home><p ng-bind-html=state.brandHTML></p></a></li><li class=right-button ng-class=\"{'hidden': !state.showRightToggleButton }\"><a id=rightMenuToggle class=\"pull-left fa fa-bars fa-2x ep-navbar-button\" ng-click=toggleRightSidebar() ng-class=\"{'hidden': !state.showRightToggleButton }\"></a></li><!--Right hand side buttons--><li ng-repeat=\"button in navButtons | orderBy:'index':true\" ng-class=\"{'hidden': button.hidden, 'disabled': state.freezeNavButtons  || button.disabled}\" class=right-button index={{button.index}}><a id=navbtn_{{button.id}} ng-if=\"button.type === 'button'\" title={{button.title}} class=\"fa {{button.icon}} fa-2x ep-navbar-button\" ng-click=state.executeButton(button) ng-mousedown=state.buttonMouseDown(button)></a> <a id=navbtn_{{button.id}} ng-if=\"button.type === 'select'\" title={{button.title}} class=\"fa {{button.icon}} fa-2x ep-navbar-button dropdown-toggle\" data-toggle=dropdown aria-expanded=false></a><ul ng-if=\"button.type === 'select'\" class=dropdown-menu ng-class=\"{ 'align-right': button.right, 'disabled': state.freezeNavButtons || button.disabled }\" role=menu><li ng-repeat=\"opt in button.options\"><a ng-click=opt.action() ng-mousedown=state.buttonMouseDown(button)><span class=ep-navmenu-item><i class=\"ep-navmenu-item-icon fa {{opt.icon}}\"></i><span class=ep-navmenu-item-text>{{opt.title}}</span></span></a></li></ul></li></ul></div></nav><!--SIDE NAVIGATION--><ep-shell-sidebar><!--<div ng-transclude></div>--><div ng-view class=ep-fullscreen></div></ep-shell-sidebar><div class=\"navbar navbar-xsm navbar-default navbar-fixed-bottom\" ng-class=\"{hidden: !state.showFooter}\" role=navigation id=mainfooter style=\"color: white; padding-top: 4px; padding-left: 5px\"><a class=pull-left style=\"color: white\" href=#/whatsnew><sup>Version {{uiVersion}}</sup></a></div><span class=ep-shell-feedback-btn id=feedbackbutton ng-if=state.feedbackEnabled ng-click=sendFeedback()><i class=\"fa fa-bullhorn\"></i> Give Feedback</span></section></div>"
  );


  $templateCache.put('src/components/ep.shell/sidebar/sidebar.html',
    "<div class=ep-shell-container ng-class=\"{ 'nav-padding': shellState.showNavbar, 'footer-padding': shellState.showFooter, 'ep-disable-left-sidebar': !shellState.enableLeftSidebar, 'ep-hide-left-sidebar': (!shellState.showLeftSidebar) || (!shellState.enableLeftSidebar), 'ep-hide-right-sidebar': (!shellState.showRightSidebar) || !(shellState.enableRightSidebar)}\"><!-- Left Sidebar --><div id=leftSidebar class=\"ep-sidebar-nav ep-sidebar-nav-left well ep-ease-animation\" ng-class=\"{'ep-with-navbar': shellState.showNavbar, 'ep-with-footer': shellState.showFooter, 'cordova-ios': platform.app==='Cordova' && platform.os=='mac'}\" ng-click=dismissRightSidebar()></div><div id=viewPlaceholder class=\"ep-view-placeholder ep-fullscreen\" ng-transclude ng-click=dismissSidebars()><!--VIEW CONTENT HERE--></div><!-- Right Sidebar --><div id=rightSidebar class=\"ep-sidebar-nav ep-sidebar-nav-right well ep-ease-animation\"></div></div>"
  );


  $templateCache.put('src/components/ep.shell/viewcontainer/viewcontainer.html',
    "<div id=viewContainer class=ep-view-container ng-class=\"{ 'ep-with-navbar': !!state.showNavbar,\r" +
    "\n" +
    "                                    'ep-with-footer': !!state.showFooter,\r" +
    "\n" +
    "                                    'ep-ease-animation': !!state.animateViewContainer,\r" +
    "\n" +
    "                                    'ep-scroll-y': !!state.allowVerticalScroll,\r" +
    "\n" +
    "                                    'ep-momentum-scrolling-enabled': !!state.momentumScrollingEnabled }\"><div id=viewMessage class=ep-container-message ng-if=state.infoMessage ng-style=\"{'width': state.viewDimensions.size.width + 'px', 'height': state.viewDimensions.size.height + 'px'}\"><p class=\"ep-container-message-text ep-center-item\"><i class={{state.infoIcon}}></i><br>{{state.infoMessage}}</p></div><div class=ep-fullscreen ng-transclude></div></div>"
  );


  $templateCache.put('src/components/ep.shell/views/ep-shell-embedded-apps-container.html',
    "<ep-shell-view-container smallmodesettings=\"{ &quot;showNavbar&quot;: true, &quot;showFooter&quot;: false, &quot;enableLeftSidebar&quot;: true, &quot;enableRightSidebar&quot;: false, &quot;showHomeButton&quot;: true, &quot;showBrand&quot;: false,  &quot;animateViewContainer&quot;: false, &quot;allowVerticalScroll&quot;: true }\" largemodesettings=\"{ &quot;showNavbar&quot;: true, &quot;showFooter&quot;: false, &quot;enableLeftSidebar&quot;: true, &quot;enableRightSidebar&quot;: false, &quot;showHomeButton&quot;: true, &quot;showBrand&quot;: true,  &quot;animateViewContainer&quot;: false, &quot;allowVerticalScroll&quot;: true }\"><ep-embedded-apps></ep-embedded-apps></ep-shell-view-container>"
  );

}]);
