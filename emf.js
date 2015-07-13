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
    'ep.utils',
    'ep.templates'
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
angular.module('ep.utils', []);

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
    'utilsFactory',
    function($compile, utilsFactory) {
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
                if (utilsFactory.browser.isMobile() === false && attrs.position) {
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
angular.module('ep.action.set').service('dynamicActionSetFactory', [
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
                        $scope.config = $scope.dialogState.config; //To be same as modals
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
angular.module('ep.modaldialog').factory('epModalDialogService', [
    '$modal',
    '$compile',
    '$rootScope',
    '$timeout',
    function($modal, $compile, $rootScope, $timeout) {

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
            config: {}
        };
        angular.copy(defaultConfig, dialogState.config);

        // @private
        var currentModalInstance = null;

        /**
         * @ngdoc method
         * @name showMessage
         * @methodOf ep.modaldialog.factory:epModalDialogService
         * @public
         * @description
         * display standard message dialog
         * @param {object} options - optional settings as follows:
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in milliseconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         */
        function showMessage(options) {
            var cfg = {
                showProgress: false,
                icon: 'fa fa-info-circle fa-4x',
            };

            if (options && options.status) {
                var status = options.status.toLowerCase();
                cfg.titleClass = (status === 'warning') ? 'text-warning' : 'text-success';
                cfg.icon = (status === 'warning') ? 'fa fa-4x fa-warning' : 'fa fa-4x fa-check';
            }

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
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in milliseconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
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

            if (options && options.status) {
                var status = options.status.toLowerCase();
                cfg.titleClass = (status === 'warning') ? 'text-warning' : 'text-success';
                cfg.icon = (status === 'warning') ? 'fa fa-4x fa-warning' : 'fa fa-4x fa-check';
            }
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
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      status - warning\error\information
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      autoClose - time in milliseconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
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
         *      all options from showCustomDialog() and additional:
         *      message - the message to display
         *      title - the title (header)
         *      icon - font awesome icon class
         *      messageDetails - message details to display (hidden if blank)
         *      status - warning\error\information
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         * @param {object} ex - Error object thrown by javascript. Optional - not used for server exceptions
         */
        function showException(options, ex) {
            var cfg = {
                templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-error.html',
                title: 'Exception',
                icon: '',
                status: 'error',
                statusClass : 'alert-danger',
                statusIcon : 'fa fa-3x fa-warning',
                message: '',
                messageDetails: '',
                buttons: [{
                    text: 'Ok', isDefault: true,
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
         *      all options from showCustomDialog() and additional:
         *      message - the message to display
         *      title - the title (header)
         *      messageDetails - message details to display (hidden if blank)
         *      status - warning\error\information
         *      statusIcon - font awesome icon class (set by default from status)
         *      statusClass - class for status area (set by default from status)
         *      fnDefaultAction - function applied to default button if buttons are not supplied or isDefault: true set
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
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
                    text: 'Ok', isDefault: true,
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
         *      templateUrl - the template html for custom dialog's container
         *      size - 'small'/'large'/'' (default)
         *      icon - font awesome icon class (icon in the header)
         *      backdrop - set true if dialog can closed on background click (default false)
         *      buttons - list of buttons (refer to buttons description at service documentation)
         *      fnDefaultAction - function applied to default button if buttons are not supplied or button has iDefault = true
         *      fnCancelAction - function to be fired on Cancel button if button has isCancel = true
         *      statusBar - set true to display status bar (default false)
         *      statusBarText - the text to display in status bar (default empty)
         *      closeButton - set true to display close button (default false)
         */
        function showCustomDialog(options) {

            hide(); // hide dialog pane if it was open

            if (options.buttons && options.buttons.length) {
                // reverse the button array because of the way the template is rendered
                options.buttons = options.buttons.reverse();

                angular.forEach(options.buttons, function(btn) {
                    if (!btn.type) { btn.type = 'default'; } //set default button style
                });
            }

            return $modal.open({
                size: (options.size === 'small' ? 'sm' : (options.size === 'large' ? 'lg' : '')),
                backdrop: options.backdrop === false ? false : options.backdrop || false,
                templateUrl: 'src/components/ep.modaldialog/modals/modaldialog-custom.html',
                controller: ['$scope', '$modalInstance', function($scope, $modalInstance) {
                    currentModalInstance = $modalInstance;
                    $scope.config = options;
                    $scope.btnclick = function(btn) {
                        var result = 0;
                        if (btn.action) {
                            result = btn.action($scope.config, btn);
                        } else if (btn.isDefault === true && options.fnDefaultAction) {
                            result = options.fnDefaultAction($scope.config, btn);
                        } else if (btn.isCancel === true && options.fnCancelAction) {
                            result = options.fnCancelAction($scope.config, btn);
                        } else if (options.fnButtonAction) {
                            result = options.fnButtonAction($scope.config, btn);
                        }
                        if (result !== -1) {
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
            dialogState.isVisible = false;
            if (currentModalInstance) {
                currentModalInstance.close(0);
                currentModalInstance = null;
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
         * @param {object} config - optional settings as follows:
         *      message - the message to display
         *      title - title (header)
         *      icon - font awesome icon class
         *      buttons - list of buttons
         *      fnDefaultAction - function applied to default button if buttons are not supplied
         *      autoClose - time in milliseconds to autoclose
         *      titleClass, iconClass, contentClass - optional classes applied to respective areas
         */
        function show(config) {

            if (config.buttons && config.buttons.length) {
                // reverse the button array because of the way the template is rendered
                config.buttons = config.buttons.reverse();
            }

            // reset the config object to default values.
            dialogState.config.fnDefaultAction = null;
            dialogState.config.fnCancelAction = null;
            dialogState.config.fnButtonAction = null;
            copyProperties(defaultConfig, dialogState.config);

            // override default values with values provided.
            copyProperties(config, dialogState.config);

            if (dialogState.config.buttons && dialogState.config.buttons.length) {
                angular.forEach(dialogState.config.buttons, function(btn) {
                    if (!btn.type) { btn.type = 'default'; } //set default button style
                });
            }

            dialogState.isVisible = true;

            if (!angular.element('body .ep-modaldialog.ep-modaldialog-pane').length) {
                var scope = $rootScope.$new();
                scope.dialogState = dialogState;
                scope.btnclick = function(btn) {
                    var config = dialogState.config;

                    hide();
                    if (btn.action) {
                        btn.action(config, btn);
                    } else if (btn.isDefault === true && config.fnDefaultAction) {
                        config.fnDefaultAction(config, btn);
                    } else if (btn.isCancel === true && config.fnCancelAction) {
                        config.fnCancelAction(config, btn);
                    } else if (config.fnButtonAction) {
                        config.fnButtonAction(config, btn);
                    }
                };

                angular.element(document.body).append($compile('<epmodaldialog></epmodaldialog>')(scope));
            }

            if (dialogState.config.autoClose) {
                $timeout(function() {
                    hide();
                    if (config.fnDefaultAction) {
                        config.fnDefaultAction();
                    }
                }, dialogState.config.autoClose);
            }
        }
        return {
            showMessage: showMessage,
            showConfirm: showConfirm,
            showProgress: showProgress,
            showException: showException,
            showMessageBox: showMessageBox,
            showCustomDialog: showCustomDialog,
            hide: hide
        };
    }]);

/* TO DO:
1. Move copyProprties to utilitiesService

*/

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
        var jsonReadStatus;
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
        // also knowing despite the (use $http instead of $.ajax) rules on the EMF coders styleguide
        // There is a problem: $http is an asynchronous call, so its not guaranteed that the
        // data will be returned with the values read from the sysconfig.json.
        // To get around we have to make $http a sync call, which is not possible.
        this.$get = function() {
            var q = $.ajax({
                type: 'GET',
                url: 'sysconfig.json',
                cache: false,
                async: false,
                contentType: 'application/json'
            });

            jsonReadStatus = q.status;
            if (q.status === 200) {
                var sysconfig = angular.fromJson(q.responseText);
                if (sysconfig.hasOwnProperty('EP_SEARCH_CONFIG')) {
                    angular.extend(config, sysconfig.EP_SEARCH_CONFIG);
                }
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
 * @ngdoc object
 * @name ep.token.object:tokenConfig
 * @description
 * Provider for tokenConfig.
 * Gets configuration options from tokenConfig.json or default
 */
angular.module('ep.token').provider('tokenConfig',
    function() {
        var jsonReadStatus;
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
        // also knowing despite the (use $http instead of $.ajax) rules on the EMF coders styleguide
        // There is a problem: $http is an asynchronous call, so its not guaranteed that the
        // data will be returned with the values read from the sysconfig.json.
        // To get around we have to make $http a sync call, which is not possible.
        this.$get = function() {
            var q = $.ajax({
                type: 'GET',
                url: 'sysconfig.json',
                cache: false,
                async: false,
                contentType: 'application/json'
            });

            jsonReadStatus = q.status;
            if (q.status === 200) {
                var sysconfig = angular.fromJson(q.responseText);
                if (sysconfig.hasOwnProperty('epTokenConfig')) {
                    angular.extend(config, sysconfig.epTokenConfig);
                }
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
        var jsonReadStatus;
        var config = {
            /**
            * @ngdoc property
            * @name debug
            * @propertyOf ep.utils.object:utilsConfig
            * @public
            * @description
            * Represents the debug mode
            */
            debug: false
        };

        //This $get, is kinda confusing - it does not return the provider, but it returns the "service".
        //In our case, the "service" is the environment configuration object
        //The $get is called automatically when AngularJS encounters a DI.
        //
        // also knowing despite the (use $http instead of $.ajax) rules on the EMF coders styleguide
        // There is a problem: $http is an asynchronous call, so its not guaranteed that the
        // data will be returned with the values read from the sysconfig.json.
        // To get around we have to make $http a sync call, which is not possible.
        this.$get = function() {
            var q = $.ajax({
                type: 'GET',
                url: 'sysconfig.json',
                cache: false,
                async: false,
                contentType: 'application/json'
            });

            jsonReadStatus = q.status;
            if (q.status === 200) {
                var sysconfig = angular.fromJson(q.responseText);
                if (sysconfig.hasOwnProperty('epUtilsConfig')) {
                    angular.extend(config, sysconfig.epUtilsConfig);
                }
            }

            return config;
        };
    });

'use strict';
/**
 * @ngdoc service
 * @name ep.utils.factory:utilsFactory
 * @description
 * Provides Epicor Mobile Framework Utilities
 *       the browser property on utilsFactory returns isMobile and supportsDragDrop
 *
 *
 * @example
 *           if (utilsFactory.browser.isMobile() === true) {
 *               ...
 *               };
 *
 */
angular.module('ep.utils').factory('utilsFactory', [
    function() {
        /**
        * @ngdoc method
        * @name login
        * @methodOf ep.utils.factory:utilsFactory
        * @public
        * @description
        * Detects if function is being executed on common mobile device
        *
        * @returns {boolean} true when function detects common mobile devices
         */
        function browserIsMobile() {
            return (function(a) {
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

        /**
        * @ngdoc method
        * @name supportsDragAndDrop
        * @methodOf ep.utils.factory:utilsFactory
        * @public
        * @description
        * Detects if current document node contains 'draggable'
        *
        * @returns {boolean} true when current document node contains 'draggable'
        */
        function supportsDragAndDrop() {
            return 'draggable' in document.createElement('span');
        }

        return {
            browser: {
                isMobile: browserIsMobile,
                supportsDragAndDrop: supportsDragAndDrop
            }
        };
    }]);

//# sourceMappingURL=app.min.js.map
angular.module('ep.templates').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('src/components/ep.action.set/action-menu/action-menu.html',
    "<div id=ep-actions-menu-ctr ng-show=actionMenuCtrl.actions><ul class=\"dropdown-menu ep-actions-menu list-unstyled noselect\" role=menu><li ng-repeat=\"action in actionMenuCtrl.actions\" ng-if=\"!action.switch || action.switch(action.switchParams) == action.switchResult\" ng-switch=action.type ng-class=\"{'hidden': action.switch != null && action.switch == false}\"><a ng-switch-when=action class=ep-actions-menu-item ng-click=\"actionMenuCtrl.invokeAction($event, action)\"><span class=\"icon {{action.icon}}\"></span><span>{{::action.title}}</span></a><div ng-switch-when=separator class=ep-actions-menu-item-separator></div></li><li class=ep-actions-menu-item-mobile><a class=\"ep-actions-menu-item edd-red separate\" ng-click=actionMenuCtrl.close()><span class=\"icon icon-clear\"></span><span>Close</span></a></li></ul></div>"
  );


  $templateCache.put('src/components/ep.login/login.html',
    "<div class=thumbnail><div class=caption><h3 ng-hide=hasToken><span class=\"icon icon-enter\"></span> Login</h3><h3 ng-show=hasToken><span class=\"icon icon-exit\"></span> Logout</h3><hr></div><form role=form><div class=form-group><label for=user-name class=\"col-sm-2 control-label\">User:</label><div><input class=form-control id=user-name value={{::user.username}} ng-model=user.username placeholder=username required></div></div><div class=form-group><label for=user-password class=\"col-sm-2 control-label\">Password:</label><div><input type=password class=form-control id=user-password value={{::user.password}} ng-model=user.password placeholder=password required></div></div></form><hr><p></p><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div><div><a class=\"btn btn-default\" ui-sref={{::cancelPath}}>Cancel</a> <button type=button class=\"btn btn-primary\" ng-hide=hasToken ng-click=login()>Login</button> <button type=button class=\"btn btn-primary\" ng-show=hasToken ng-click=logout()>Logout</button></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-custom.html',
    "<div class=\"ep-modaldialog ep-modaldialog-custom\"><div class=modal-header><span class=close ng-show=config.closeButton><button type=button data-dismiss=modal aria-label=Close ng-click=\"btnclick({isCancel: true})\"><span aria-hidden=true>&times;</span></button></span><h4 id=dialogTitle class=\"bg-primary modal-title\"><span class=\"ep-dlg-title-icon {{config.icon}}\"></span><span class=ep-dlg-title>{{config.title}}</span></h4></div><div class=modal-body><form id=dialogForm name=dialogForm><div ng-include=config.templateUrl></div></form></div><div class=modal-footer><div class=ep-dlg-buttons><button ng-repeat=\"btn in config.buttons\" id=btn.id tabindex=\"$index + 100\" data-dismiss=modal ng-hide=btn.hidden ng-disabled=\"btn.isPrimary && !dialogForm.$valid\" class=\"btn btn-{{btn.type}}\" ng-click=btnclick(btn)><i ng-if=btn.icon ng-class=btn.icon></i> &nbsp;{{btn.text}}</button></div></div><div class=ep-dlg-status ng-show=config.statusBar><h4 class=\"bg-primary modal-title\"><span>{{config.statusBarText}}</span></h4></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-error.html',
    "<!--Custom Dialog Error Template--><div class=ep-modaldialog-error><div class=\"alert clearfix\" ng-class=config.statusClass><table><tr><td><span><i class=\"fa fa-3x\" ng-class=config.statusIcon></i></span></td><td><span class=ep-dlg-message ng-class=config.messageClass>{{config.message}}</span></td></tr></table></div><div class=ep-message-details ng-show=config.messageDetails><a href=\"\" ng-click=\"config.showDetails = !config.showDetails;\">{{config.showDetails ? 'Hide details': 'Show details'}}</a><div ng-show=config.showDetails><textarea ng-model=config.messageDetails ng-readonly=true disabled></textarea></div></div></div>"
  );


  $templateCache.put('src/components/ep.modaldialog/modals/modaldialog-pane.html',
    "<div class=\"ep-modaldialog ep-modaldialog-pane ep-ease-animation ep-hide-fade\" ng-hide=!dialogState.isVisible><div class=ep-dlg-container ng-class=config.containerClass><div class=\"ep-dlg-center clearfix\"><span class=\"ep-dlg-icon pull-left\" ng-class=config.iconClass style=\"margin-right: 10px; margin-top: 5px\"><i ng-class=config.icon></i></span><div class=pull-left><span class=ep-dlg-title ng-class=config.titleClass>{{config.title}}</span><p class=ep-dlg-message ng-class=config.messageClass>{{config.message}}</p><div class=ep-dlg-progress-indicator ng-show=config.showProgress><span class=\"fa fa-spinner fa-pulse fa-5x\"></span></div><div class=ep-dlg-buttons><button ng-repeat=\"btn in config.buttons\" id=btn.id class=\"btn btn-{{btn.type}} btn-sm\" ng-click=btnclick(btn)><i ng-if=btn.icon ng-class=btn.icon></i> &nbsp;{{btn.text}}</button></div></div></div></div></div>"
  );


  $templateCache.put('src/components/ep.search/search.html',
    "<div><header class=reverse><div class=searchControl><form role=form ng-submit=runSearch(searchText)><input type=search placeholder=\"Enter your search terms...\" ng-model=searchText ng-change=\"changeSearch()\"> <span class=input-group-btn><button class=\"btn btn-default\" type=button><span class=\"icon icon-search\"></span></button></span> <button ng-click=runSearch(searchText) ng-disabled=!searchText>search</button></form><div class=\"alert alert-danger\" id=validationSummary role=alert ng-show=hasError>{{status}}</div></div></header><section><div ng-show=enterpriseSearch.searchText><p ng-show=enterpriseSearch.searching>Searching for the following terms: '{{enterpriseSearch.searchText}}' ...</p><p ng-show=enterpriseSearch.searchError>{{enterpriseSearch.searchError}}</p></div><ul ng-if=enterpriseSearch.searchResults class=searchResults><li ng-repeat=\"searchResult in enterpriseSearch.searchResults track by $index\" class=searchResultCategory><b>Category: {{searchResult.label | uppercase}}</b><br><ul ng-if=searchResult.results><li ng-repeat=\"result in searchResult.results\" class=searchResult><span class=searchResultHeader ng-class=searchResult.label>{{result.label | uppercase}} - {{result.companyContext}} - {{result.keyTag}}</span><br><div ng-if=result.fields><span ng-repeat=\"field in result.fields\" class=searchResultField>{{field.alias}}: {{field.FieldValue}},</span></div></li></ul></li></ul></section></div>"
  );

}]);
